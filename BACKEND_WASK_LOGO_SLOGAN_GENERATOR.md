# Backend: Wask.co AI Logo & Slogan Generator Endpoint

## Endpoint Specification

**URL:** `POST /api/ai/wask/generate-logo-slogan/`

**Description:** Wask.co AI istifadə edərək məhsul üçün logo və slogan yaradır. İki mod dəstəklənir: manuel giriş və link ilə avtomatik məlumat çıxarma.

## Request

**Method:** `POST`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Body (FormData):**

**Manuel Mod üçün:**
- `product_name` (string, required): Məhsul/Şirkət adı
- `product_description` (string, required): Məhsul təsviri
- `image` (file, optional): Məhsul şəkli (PNG, JPG, JPEG)

**Link Mod üçün:**
- `product_link` (string, required): Məhsul/Şirkət veb-saytı URL-i

**Qeyd:** Ya `product_name` + `product_description` (manuel mod) ya da `product_link` (link mod) göndərilməlidir.

## Response

**Success (200 OK):**
```json
{
  "logo_url": "https://api.timera.az/media/logos/generated_logo_abc123.png",
  "slogan": "Innovate. Inspire. Impact. - Your brand, reimagined.",
  "logo_base64": "data:image/png;base64,iVBORw0KGgoAAAANS...", // Optional: base64 format
  "metadata": {
    "product_name": "TechStart Solutions",
    "generated_at": "2024-01-15T10:30:00Z",
    "wask_request_id": "wask_req_xyz789"
  }
}
```

**Error Responses:**

**400 Bad Request - Validation Error:**
```json
{
  "error": "product_name və product_description və ya product_link tələb olunur"
}
```

```json
{
  "error": "Şəkil formatı dəstəklənmir. Yalnız PNG, JPG, JPEG formatları qəbul olunur."
}
```

```json
{
  "error": "URL formatı düzgün deyil"
}
```

**400 Bad Request - Wask.co API Error:**
```json
{
  "error": "Wask.co AI xidməti müvəqqəti olaraq əlçatan deyil",
  "wask_error": "API rate limit exceeded"
}
```

**401 Unauthorized:**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**500 Internal Server Error:**
```json
{
  "error": "Logo və slogan yaratma zamanı xəta baş verdi",
  "details": "Internal server error details"
}
```

## Implementation Details

### 1. Authentication
- JWT token ilə autentifikasiya tələb olunur
- İstifadəçi autentifikasiya olunmalıdır

### 2. Request Validation

**Manuel Mod:**
- `product_name` və `product_description` mütləq olmalıdır
- `image` varsa, format yoxlanılmalıdır (PNG, JPG, JPEG)
- Şəkil ölçüsü məhdudiyyəti: maksimum 10MB

**Link Mod:**
- `product_link` mütləq olmalıdır
- URL formatı yoxlanılmalıdır
- Link-ə müraciət edilə bilməlidir

### 3. Link Mod - Web Scraping

Link modunda, verilən URL-dən məlumat çıxarılmalıdır:

**İstifadə oluna biləcək library-lər:**
- `requests` + `BeautifulSoup4` (Python)
- `scrapy` (daha mürəkkəb ehtiyaclar üçün)

**Çıxarılmalı məlumatlar:**
- Sayt başlığı (title)
- Meta description
- Meta keywords
- Open Graph məlumatları (og:title, og:description, og:image)
- Əsas məzmun (h1, h2, p tag-ləri)
- Şirkət/məhsul adı

**Nümunə scraping kodu:**
```python
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def scrape_website_info(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract information
        title = soup.find('title')
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        
        # Extract main content
        h1 = soup.find('h1')
        paragraphs = soup.find_all('p')[:3]  # First 3 paragraphs
        
        return {
            'product_name': og_title.get('content') if og_title else (title.text if title else ''),
            'product_description': og_desc.get('content') if og_desc else (
                meta_desc.get('content') if meta_desc else ' '.join([p.text for p in paragraphs])
            ),
            'url': url
        }
    except Exception as e:
        raise ValueError(f"Saytdan məlumat çıxarıla bilmədi: {str(e)}")
```

### 4. Wask.co API Integration

**Wask.co API Endpoint:**
```
POST https://api.wask.co/v1/generate-logo-slogan
```

**Wask.co API Request Format:**
```json
{
  "product_name": "TechStart Solutions",
  "product_description": "AI-powered business solutions...",
  "image_url": "https://example.com/product-image.jpg", // Optional
  "api_key": "YOUR_WASK_API_KEY"
}
```

**Wask.co API Response Format:**
```json
{
  "logo_url": "https://wask.co/generated/logos/abc123.png",
  "slogan": "Innovate. Inspire. Impact.",
  "request_id": "wask_req_xyz789"
}
```

**Nümunə Wask.co API çağırışı:**
```python
import requests
import os

WASK_API_URL = "https://api.wask.co/v1/generate-logo-slogan"
WASK_API_KEY = os.getenv('WASK_API_KEY')

def call_wask_api(product_name, product_description, image_url=None):
    headers = {
        'Authorization': f'Bearer {WASK_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'product_name': product_name,
        'product_description': product_description
    }
    
    if image_url:
        payload['image_url'] = image_url
    
    try:
        response = requests.post(
            WASK_API_URL,
            json=payload,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Wask.co API xətası: {str(e)}")
```

### 5. Image Upload & Storage

**Şəkil yükləmə (manuel mod):**
- Şəkil Django media folder-ə yüklənməlidir
- Şəkil adı: `logos/user_{user_id}_{timestamp}.{ext}`
- Şəkil Wask.co API-yə göndərilməzdən əvvəl public URL-ə çevrilməlidir

**Nümunə şəkil yükləmə:**
```python
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import uuid
from datetime import datetime

def upload_product_image(image_file, user_id):
    # Generate unique filename
    ext = image_file.name.split('.')[-1]
    filename = f"logos/user_{user_id}_{uuid.uuid4()}.{ext}"
    
    # Save file
    path = default_storage.save(filename, ContentFile(image_file.read()))
    
    # Return public URL
    return default_storage.url(path)
```

### 6. Generated Logo Storage

Wask.co-dan alınan logo:
- Django media folder-ə yüklənməlidir
- Ad formatı: `generated_logos/user_{user_id}_{timestamp}.png`
- Public URL qaytarılmalıdır

**Nümunə logo yükləmə:**
```python
import requests
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

def download_and_save_logo(logo_url, user_id):
    # Download logo from Wask.co
    response = requests.get(logo_url, timeout=30)
    response.raise_for_status()
    
    # Generate filename
    filename = f"generated_logos/user_{user_id}_{uuid.uuid4()}.png"
    
    # Save to storage
    path = default_storage.save(filename, ContentFile(response.content))
    
    # Return public URL
    return default_storage.url(path)
```

## Django View Implementation

```python
# ai/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import requests
from bs4 import BeautifulSoup
import uuid
import os
import logging

logger = logging.getLogger(__name__)

WASK_API_URL = os.getenv('WASK_API_URL', 'https://api.wask.co/v1/generate-logo-slogan')
WASK_API_KEY = os.getenv('WASK_API_KEY')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_logo_slogan(request):
    """
    Wask.co AI istifadə edərək logo və slogan yaradır
    """
    user = request.user
    
    # Validate request
    product_name = request.data.get('product_name')
    product_description = request.data.get('product_description')
    product_link = request.data.get('product_link')
    image_file = request.FILES.get('image')
    
    # Validation: Either manual input or link
    if not product_link and (not product_name or not product_description):
        return Response(
            {"error": "product_name və product_description və ya product_link tələb olunur"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate image if provided
    if image_file:
        allowed_extensions = ['png', 'jpg', 'jpeg']
        ext = image_file.name.split('.')[-1].lower()
        if ext not in allowed_extensions:
            return Response(
                {"error": "Şəkil formatı dəstəklənmir. Yalnız PNG, JPG, JPEG formatları qəbul olunur."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check file size (max 10MB)
        if image_file.size > 10 * 1024 * 1024:
            return Response(
                {"error": "Şəkil ölçüsü çox böyükdür. Maksimum 10MB"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    try:
        # Link mod: Scrape website
        if product_link:
            scraped_data = scrape_website_info(product_link)
            product_name = scraped_data['product_name']
            product_description = scraped_data['product_description']
        
        # Upload image if provided
        image_url = None
        if image_file:
            image_url = upload_product_image(image_file, user.id)
            # Convert relative URL to absolute URL
            if not image_url.startswith('http'):
                image_url = request.build_absolute_uri(image_url)
        
        # Call Wask.co API
        wask_response = call_wask_api(
            product_name=product_name,
            product_description=product_description,
            image_url=image_url
        )
        
        # Download and save generated logo
        wask_logo_url = wask_response.get('logo_url')
        if not wask_logo_url:
            raise ValueError("Wask.co API-dən logo URL alına bilmədi")
        
        saved_logo_url = download_and_save_logo(wask_logo_url, user.id)
        # Convert to absolute URL
        if not saved_logo_url.startswith('http'):
            saved_logo_url = request.build_absolute_uri(saved_logo_url)
        
        # Return response
        return Response({
            "logo_url": saved_logo_url,
            "slogan": wask_response.get('slogan', ''),
            "metadata": {
                "product_name": product_name,
                "generated_at": datetime.now().isoformat(),
                "wask_request_id": wask_response.get('request_id')
            }
        }, status=status.HTTP_200_OK)
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except requests.exceptions.RequestException as e:
        logger.error(f"Wask.co API error: {str(e)}")
        return Response(
            {
                "error": "Wask.co AI xidməti müvəqqəti olaraq əlçatan deyil",
                "wask_error": str(e)
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return Response(
            {
                "error": "Logo və slogan yaratma zamanı xəta baş verdi",
                "details": str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def scrape_website_info(url):
    """Web saytdan məlumat çıxarır"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract information
        title = soup.find('title')
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        
        # Extract main content
        h1 = soup.find('h1')
        paragraphs = soup.find_all('p')[:3]
        
        product_name = ''
        if og_title:
            product_name = og_title.get('content', '')
        elif title:
            product_name = title.text.strip()
        elif h1:
            product_name = h1.text.strip()
        
        product_description = ''
        if og_desc:
            product_description = og_desc.get('content', '')
        elif meta_desc:
            product_description = meta_desc.get('content', '')
        else:
            product_description = ' '.join([p.text.strip() for p in paragraphs if p.text.strip()])
        
        if not product_name or not product_description:
            raise ValueError("Saytdan kifayət qədər məlumat çıxarıla bilmədi")
        
        return {
            'product_name': product_name,
            'product_description': product_description,
            'url': url
        }
    except requests.exceptions.RequestException as e:
        raise ValueError(f"Sayta müraciət edilə bilmədi: {str(e)}")
    except Exception as e:
        raise ValueError(f"Saytdan məlumat çıxarıla bilmədi: {str(e)}")


def upload_product_image(image_file, user_id):
    """Məhsul şəklini yükləyir"""
    ext = image_file.name.split('.')[-1]
    filename = f"logos/user_{user_id}_{uuid.uuid4()}.{ext}"
    path = default_storage.save(filename, ContentFile(image_file.read()))
    return default_storage.url(path)


def call_wask_api(product_name, product_description, image_url=None):
    """Wask.co API-yə müraciət edir"""
    headers = {
        'Authorization': f'Bearer {WASK_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'product_name': product_name,
        'product_description': product_description
    }
    
    if image_url:
        payload['image_url'] = image_url
    
    response = requests.post(
        WASK_API_URL,
        json=payload,
        headers=headers,
        timeout=30
    )
    response.raise_for_status()
    return response.json()


def download_and_save_logo(logo_url, user_id):
    """Wask.co-dan logo yükləyib saxlayır"""
    response = requests.get(logo_url, timeout=30)
    response.raise_for_status()
    
    filename = f"generated_logos/user_{user_id}_{uuid.uuid4()}.png"
    path = default_storage.save(filename, ContentFile(response.content))
    return default_storage.url(path)
```

## URL Routing

`urls.py` faylında əlavə edin:

```python
# ai/urls.py
from django.urls import path
from . import views

app_name = 'ai'

urlpatterns = [
    # ... existing patterns
    path('api/ai/wask/generate-logo-slogan/', views.generate_logo_slogan, name='generate_logo_slogan'),
]
```

**Main urls.py:**
```python
# project/urls.py
from django.urls import path, include

urlpatterns = [
    # ... existing patterns
    path('', include('ai.urls')),
]
```

## Environment Variables

`.env` faylına əlavə edin:

```env
WASK_API_URL=https://api.wask.co/v1/generate-logo-slogan
WASK_API_KEY=your_wask_api_key_here
```

## Required Python Packages

`requirements.txt` faylına əlavə edin:

```
requests>=2.31.0
beautifulsoup4>=4.12.0
lxml>=4.9.0  # BeautifulSoup parser üçün
Pillow>=10.0.0  # Şəkil emalı üçün (əgər lazımdırsa)
```

## Database Models (Optional)

Əgər yaradılan logo və sloganları saxlamaq istəyirsinizsə:

```python
# ai/models.py
from django.db import models
from django.contrib.auth.models import User

class GeneratedLogo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='generated_logos')
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    logo_url = models.URLField()
    slogan = models.CharField(max_length=500)
    wask_request_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

## Error Handling Best Practices

1. **Timeout Handling:** Wask.co API və web scraping üçün timeout təyin edin (10-30 saniyə)
2. **Rate Limiting:** Wask.co API rate limit-lərini nəzərə alın
3. **Retry Logic:** Müvəqqəti xətalar üçün retry mexanizmi əlavə edin
4. **Logging:** Bütün xətaları loglayın
5. **Fallback:** Wask.co API işləmədikdə alternativ həllər düşünün

## Testing

**Test Cases:**
1. ✅ Manuel mod - yalnız ad və təsvir
2. ✅ Manuel mod - ad, təsvir və şəkil
3. ✅ Link mod - düzgün URL
4. ✅ Link mod - yanlış URL
5. ✅ Validation - boş məlumat
6. ✅ Validation - yanlış şəkil formatı
7. ✅ Wask.co API xətası
8. ✅ Authentication - token yoxdur

## Notes

- Frontend hazırdır və bu endpoint-i gözləyir
- Wask.co API key-i environment variable-dan alınmalıdır
- Şəkillər Django media folder-ə yüklənməlidir
- Web scraping zamanı User-Agent header istifadə edin
- Rate limiting və caching düşünülməlidir
- Production-da SSL sertifikatı olan saytlara müraciət edin

