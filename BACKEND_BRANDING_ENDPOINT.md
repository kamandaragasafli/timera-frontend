# Backend: Apply Branding Endpoint

## Endpoint Specification

**URL:** `POST /api/posts/{id}/apply-branding/`

**Description:** Post şəklinə şirkət loqosu və sloqanı əlavə edir (brending tətbiq edir).

## Request

**Method:** `POST`

**URL Parameters:**
- `id` (UUID): Post ID-si

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body:** Boş (empty body)

## Response

**Success (200 OK):**
```json
{
  "post": {
    "id": "uuid",
    "title": "Post başlığı",
    "content": "Post məzmunu",
    "custom_image_url": "https://api.timera.az/media/posts/branded_xxx.jpg",
    "design_url_absolute": "https://api.timera.az/media/posts/branded_xxx.jpg",
    "branding_applied": true,
    ...
  },
  "message": "Brending uğurla tətbiq edildi"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Şirkət loqosu tapılmadı. Əvvəlcə logo yükləyin."
}
```

```json
{
  "error": "Brending deaktivdir. Parametrlərdə aktivləşdirin."
}
```

```json
{
  "error": "Bu postda şəkil yoxdur."
}
```

**404 Not Found:**
```json
{
  "error": "Post tapılmadı"
}
```

**401 Unauthorized:**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

## Implementation Details

1. **Authentication:** JWT token ilə autentifikasiya tələb olunur
2. **Company Profile:** İstifadəçinin şirkət profilini yükləyin
3. **Validation:**
   - Post mövcuddurmu?
   - Şirkət profili var və brending aktivdir?
   - Şirkət loqosu var?
   - Post-da şəkil var? (custom_image_url və ya design_url_absolute)
4. **Branding Application:**
   - Post şəklini yükləyin
   - Şirkət loqosunu və sloqanı şəkilə əlavə edin
   - Brending parametrlərinə görə (position, size, mode) loqonu yerləşdirin
   - Yeni brendlənmiş şəkli saxlayın (məsələn: `branded_{post_id}.jpg`)
   - Post-un `custom_image_url` və ya `design_url_absolute` sahəsini yeniləyin
   - `branding_applied` flag-ini `true` edin
5. **Response:** Yenilənmiş post obyektini qaytarın

## Branding Parameters (from Company Profile)

- `branding_mode`: "standard" | "custom"
- `logo_position`: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "middle-top" | "middle"
- `logo_size_percent`: 2-25 (custom mode) və ya 5 (standard mode)
- `slogan`: String (optional)
- `logo_url`: Şirkət loqosunun URL-i

## Standard Mode

- Position: `bottom-right` (sabit)
- Size: `5%` (sabit)
- Padding: 24-32px yan boşluq

## Custom Mode

- Position: İstifadəçi seçimi
- Size: 2-25% arası
- Padding: Default padding

## Example Django View

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from ..auth.models import CompanyProfile

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_branding(request, id):
    try:
        post = Post.objects.get(id=id, user=request.user)
    except Post.DoesNotExist:
        return Response(
            {"error": "Post tapılmadı"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    try:
        company_profile = CompanyProfile.objects.get(user=request.user)
    except CompanyProfile.DoesNotExist:
        return Response(
            {"error": "Şirkət profili tapılmadı"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validation
    if not company_profile.branding_enabled:
        return Response(
            {"error": "Brending deaktivdir. Parametrlərdə aktivləşdirin."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not company_profile.logo_url:
        return Response(
            {"error": "Şirkət loqosu tapılmadı. Əvvəlcə logo yükləyin."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not post.custom_image_url and not post.design_url_absolute:
        return Response(
            {"error": "Bu postda şəkil yoxdur."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Apply branding logic here
    # ... (image processing with logo + slogan)
    
    # Update post
    post.custom_image_url = branded_image_url
    post.branding_applied = True
    post.save()
    
    return Response({
        "post": PostSerializer(post).data,
        "message": "Brending uğurla tətbiq edildi"
    }, status=status.HTTP_200_OK)
```

## URL Routing

`urls.py` faylında əlavə edin:

```python
from django.urls import path
from . import views

urlpatterns = [
    # ... existing patterns
    path('api/posts/<uuid:post_id>/apply-branding/', views.apply_branding, name='apply_branding'),
]
```

## Notes

- Frontend hazırdır və bu endpoint-i gözləyir
- Endpoint Django URL routing-də qeydiyyata alınmalıdır
- Image processing üçün Pillow (PIL) və ya başqa library istifadə edilə bilər

