# Meta Ads və Meta Analytics Backend İnteqrasiyası

## Məqsəd
Facebook və Instagram reklam kampaniyalarını idarə etmək və analitika məlumatlarını göstərmək üçün Meta Marketing API ilə inteqrasiya.

## Tələb Olunan Paketlər
```python
# requirements.txt-ə əlavə edin
facebook-business>=19.0.0
# və ya
facebook-sdk>=3.1.0
```

## 1. Model Dəyişiklikləri

### Meta Ad Account Model
```python
# models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MetaAdAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='meta_ad_accounts')
    account_id = models.CharField(max_length=100, unique=True)  # Meta account ID
    name = models.CharField(max_length=255)
    currency = models.CharField(max_length=10, default='USD')
    timezone = models.CharField(max_length=50, default='UTC')
    access_token = models.TextField()  # Encrypted token
    status = models.CharField(max_length=20, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'meta_ad_accounts'
        verbose_name = 'Meta Ad Account'
        verbose_name_plural = 'Meta Ad Accounts'
    
    def __str__(self):
        return f"{self.name} ({self.account_id})"
```

### Campaign Model
```python
class MetaCampaign(models.Model):
    account = models.ForeignKey(MetaAdAccount, on_delete=models.CASCADE, related_name='campaigns')
    campaign_id = models.CharField(max_length=100, unique=True)  # Meta campaign ID
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='PAUSED')  # ACTIVE, PAUSED, ARCHIVED, DELETED
    objective = models.CharField(max_length=50)  # OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, etc.
    daily_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lifetime_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    created_time = models.DateTimeField(null=True, blank=True)
    updated_time = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'meta_campaigns'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
```

### Ad Set Model
```python
class MetaAdSet(models.Model):
    campaign = models.ForeignKey(MetaCampaign, on_delete=models.CASCADE, related_name='ad_sets')
    ad_set_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='PAUSED')
    daily_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lifetime_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    billing_event = models.CharField(max_length=50)  # IMPRESSIONS, LINK_CLICKS, etc.
    optimization_goal = models.CharField(max_length=50)  # LINK_CLICKS, REACH, etc.
    targeting = models.JSONField(default=dict)  # Targeting criteria
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'meta_ad_sets'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
```

### Ad Model
```python
class MetaAd(models.Model):
    ad_set = models.ForeignKey(MetaAdSet, on_delete=models.CASCADE, related_name='ads')
    ad_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='PAUSED')
    creative = models.JSONField(default=dict)  # Ad creative data
    created_time = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'meta_ads'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
```

### Insights Model (Cache üçün)
```python
class MetaInsight(models.Model):
    account = models.ForeignKey(MetaAdAccount, on_delete=models.CASCADE, related_name='insights', null=True, blank=True)
    campaign = models.ForeignKey(MetaCampaign, on_delete=models.CASCADE, related_name='insights', null=True, blank=True)
    ad_set = models.ForeignKey(MetaAdSet, on_delete=models.CASCADE, related_name='insights', null=True, blank=True)
    ad = models.ForeignKey(MetaAd, on_delete=models.CASCADE, related_name='insights', null=True, blank=True)
    
    date_start = models.DateField()
    date_stop = models.DateField()
    impressions = models.IntegerField(default=0)
    reach = models.IntegerField(default=0)
    clicks = models.IntegerField(default=0)
    spend = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cpm = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Cost per 1000 impressions
    cpc = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Cost per click
    ctr = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # Click-through rate
    conversions = models.IntegerField(default=0)
    metrics_data = models.JSONField(default=dict)  # Additional metrics
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'meta_insights'
        unique_together = [['account', 'date_start', 'date_stop'], 
                          ['campaign', 'date_start', 'date_stop'],
                          ['ad_set', 'date_start', 'date_stop'],
                          ['ad', 'date_start', 'date_stop']]
        ordering = ['-date_start']
```

## 2. Meta API Service

### Meta API Helper Service
```python
# services/meta_api_service.py
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adaccountuser import AdAccountUser
from facebook_business.exceptions import FacebookRequestError
import logging

logger = logging.getLogger(__name__)

class MetaAPIService:
    def __init__(self, access_token, app_id=None, app_secret=None):
        """
        Initialize Meta API with access token
        """
        FacebookAdsApi.init(access_token=access_token, app_id=app_id, app_secret=app_secret)
        self.access_token = access_token
    
    def get_ad_accounts(self, user_id=None):
        """
        Get all ad accounts for a user
        """
        try:
            if user_id:
                user = AdAccountUser(f'act_{user_id}')
                accounts = user.get_ad_accounts(fields=['id', 'name', 'currency', 'timezone_name', 'account_status'])
            else:
                # Get accounts from current user
                me = AdAccountUser('me')
                accounts = me.get_ad_accounts(fields=['id', 'name', 'currency', 'timezone_name', 'account_status'])
            
            return [account for account in accounts]
        except FacebookRequestError as e:
            logger.error(f"Error getting ad accounts: {e}")
            raise
    
    def get_campaigns(self, account_id, fields=None):
        """
        Get campaigns for an ad account
        """
        if fields is None:
            fields = ['id', 'name', 'status', 'objective', 'daily_budget', 
                     'lifetime_budget', 'start_time', 'end_time', 'created_time', 'updated_time']
        
        try:
            account = AdAccount(f'act_{account_id}')
            campaigns = account.get_campaigns(fields=fields)
            return [campaign for campaign in campaigns]
        except FacebookRequestError as e:
            logger.error(f"Error getting campaigns: {e}")
            raise
    
    def get_ad_sets(self, campaign_id=None, account_id=None, fields=None):
        """
        Get ad sets for a campaign or account
        """
        if fields is None:
            fields = ['id', 'name', 'status', 'daily_budget', 'lifetime_budget', 
                     'billing_event', 'optimization_goal', 'targeting']
        
        try:
            if campaign_id:
                campaign = Campaign(campaign_id)
                ad_sets = campaign.get_ad_sets(fields=fields)
            elif account_id:
                account = AdAccount(f'act_{account_id}')
                ad_sets = account.get_ad_sets(fields=fields)
            else:
                raise ValueError("Either campaign_id or account_id must be provided")
            
            return [ad_set for ad_set in ad_sets]
        except FacebookRequestError as e:
            logger.error(f"Error getting ad sets: {e}")
            raise
    
    def get_ads(self, ad_set_id=None, account_id=None, fields=None):
        """
        Get ads for an ad set or account
        """
        if fields is None:
            fields = ['id', 'name', 'status', 'creative', 'created_time']
        
        try:
            if ad_set_id:
                ad_set = AdSet(ad_set_id)
                ads = ad_set.get_ads(fields=fields)
            elif account_id:
                account = AdAccount(f'act_{account_id}')
                ads = account.get_ads(fields=fields)
            else:
                raise ValueError("Either ad_set_id or account_id must be provided")
            
            return [ad for ad in ads]
        except FacebookRequestError as e:
            logger.error(f"Error getting ads: {e}")
            raise
    
    def create_campaign(self, account_id, name, objective, status='PAUSED', **kwargs):
        """
        Create a new campaign
        """
        try:
            account = AdAccount(f'act_{account_id}')
            params = {
                'name': name,
                'objective': objective,
                'status': status,
                **kwargs
            }
            campaign = account.create_campaign(params=params)
            return campaign
        except FacebookRequestError as e:
            logger.error(f"Error creating campaign: {e}")
            raise
    
    def update_campaign(self, campaign_id, **kwargs):
        """
        Update a campaign
        """
        try:
            campaign = Campaign(campaign_id)
            campaign.update(kwargs)
            return campaign
        except FacebookRequestError as e:
            logger.error(f"Error updating campaign: {e}")
            raise
    
    def pause_campaign(self, campaign_id):
        """
        Pause a campaign
        """
        return self.update_campaign(campaign_id, status='PAUSED')
    
    def resume_campaign(self, campaign_id):
        """
        Resume a campaign
        """
        return self.update_campaign(campaign_id, status='ACTIVE')
    
    def get_insights(self, account_id=None, campaign_id=None, ad_set_id=None, ad_id=None, 
                    date_preset='last_7d', start_date=None, end_date=None, metrics=None):
        """
        Get insights for account, campaign, ad set, or ad
        """
        if metrics is None:
            metrics = ['impressions', 'reach', 'clicks', 'spend', 'cpm', 'cpc', 'ctr', 'conversions']
        
        params = {
            'fields': metrics,
            'level': 'campaign' if campaign_id else 'account' if account_id else 'adset' if ad_set_id else 'ad'
        }
        
        if date_preset:
            params['date_preset'] = date_preset
        elif start_date and end_date:
            params['time_range'] = {'since': start_date, 'until': end_date}
        
        try:
            if ad_id:
                ad = Ad(ad_id)
                insights = ad.get_insights(params=params)
            elif ad_set_id:
                ad_set = AdSet(ad_set_id)
                insights = ad_set.get_insights(params=params)
            elif campaign_id:
                campaign = Campaign(campaign_id)
                insights = campaign.get_insights(params=params)
            elif account_id:
                account = AdAccount(f'act_{account_id}')
                insights = account.get_insights(params=params)
            else:
                raise ValueError("One of account_id, campaign_id, ad_set_id, or ad_id must be provided")
            
            return [insight for insight in insights]
        except FacebookRequestError as e:
            logger.error(f"Error getting insights: {e}")
            raise
```

## 3. API Views

### URLs
```python
# urls.py
from django.urls import path, include

urlpatterns = [
    # ... existing patterns
    path('api/meta-ads/', include('meta_ads.urls')),
    path('api/meta-analytics/', include('meta_analytics.urls')),
]
```

### Meta Ads URLs
```python
# meta_ads/urls.py
from django.urls import path
from . import views

app_name = 'meta_ads'

urlpatterns = [
    # Ad Accounts
    path('accounts/', views.AdAccountListCreateView.as_view(), name='ad_account_list'),
    path('accounts/<str:account_id>/', views.AdAccountDetailView.as_view(), name='ad_account_detail'),
    path('accounts/connect/', views.ConnectAdAccountView.as_view(), name='connect_ad_account'),
    
    # Campaigns
    path('campaigns/', views.CampaignListCreateView.as_view(), name='campaign_list'),
    path('campaigns/<str:campaign_id>/', views.CampaignDetailView.as_view(), name='campaign_detail'),
    path('campaigns/<str:campaign_id>/pause/', views.PauseCampaignView.as_view(), name='pause_campaign'),
    path('campaigns/<str:campaign_id>/resume/', views.ResumeCampaignView.as_view(), name='resume_campaign'),
    
    # Ad Sets
    path('ad-sets/', views.AdSetListCreateView.as_view(), name='ad_set_list'),
    path('ad-sets/<str:ad_set_id>/', views.AdSetDetailView.as_view(), name='ad_set_detail'),
    path('ad-sets/<str:ad_set_id>/pause/', views.PauseAdSetView.as_view(), name='pause_ad_set'),
    path('ad-sets/<str:ad_set_id>/resume/', views.ResumeAdSetView.as_view(), name='resume_ad_set'),
    
    # Ads
    path('ads/', views.AdListCreateView.as_view(), name='ad_list'),
    path('ads/<str:ad_id>/', views.AdDetailView.as_view(), name='ad_detail'),
    path('ads/<str:ad_id>/pause/', views.PauseAdView.as_view(), name='pause_ad'),
    path('ads/<str:ad_id>/resume/', views.ResumeAdView.as_view(), name='resume_ad'),
]
```

### Meta Analytics URLs
```python
# meta_analytics/urls.py
from django.urls import path
from . import views

app_name = 'meta_analytics'

urlpatterns = [
    path('insights/', views.InsightsView.as_view(), name='insights'),
    path('accounts/<str:account_id>/insights/', views.AccountInsightsView.as_view(), name='account_insights'),
    path('campaigns/<str:campaign_id>/insights/', views.CampaignInsightsView.as_view(), name='campaign_insights'),
    path('ad-sets/<str:ad_set_id>/insights/', views.AdSetInsightsView.as_view(), name='ad_set_insights'),
    path('ads/<str:ad_id>/insights/', views.AdInsightsView.as_view(), name='ad_insights'),
    path('reports/', views.GenerateReportView.as_view(), name='generate_report'),
    path('realtime/', views.RealtimeMetricsView.as_view(), name='realtime_metrics'),
]
```

### Views Example (Campaigns)
```python
# meta_ads/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import MetaAdAccount, MetaCampaign
from .serializers import CampaignSerializer
from .services.meta_api_service import MetaAPIService
import logging

logger = logging.getLogger(__name__)

class CampaignListCreateView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CampaignSerializer
    
    def get_queryset(self):
        account_id = self.request.query_params.get('account_id')
        if account_id:
            account = get_object_or_404(MetaAdAccount, account_id=account_id, user=self.request.user)
            return MetaCampaign.objects.filter(account=account)
        return MetaCampaign.objects.filter(account__user=self.request.user)
    
    def list(self, request):
        """
        GET /api/meta-ads/campaigns/
        List all campaigns for user's ad accounts
        """
        try:
            # Option 1: Get from database
            campaigns = self.get_queryset()
            serializer = self.get_serializer(campaigns, many=True)
            
            # Option 2: Sync from Meta API (uncomment if needed)
            # account_id = request.query_params.get('account_id')
            # if account_id:
            #     account = get_object_or_404(MetaAdAccount, account_id=account_id, user=request.user)
            #     api_service = MetaAPIService(account.access_token)
            #     meta_campaigns = api_service.get_campaigns(account.account_id)
            #     # Sync to database
            #     for meta_campaign in meta_campaigns:
            #         MetaCampaign.objects.update_or_create(
            #             campaign_id=meta_campaign['id'],
            #             defaults={
            #                 'account': account,
            #                 'name': meta_campaign.get('name'),
            #                 'status': meta_campaign.get('status'),
            #                 # ... other fields
            #             }
            #         )
            #     campaigns = self.get_queryset()
            #     serializer = self.get_serializer(campaigns, many=True)
            
            return Response({
                'results': serializer.data,
                'count': len(serializer.data)
            })
        except Exception as e:
            logger.error(f"Error listing campaigns: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def create(self, request):
        """
        POST /api/meta-ads/campaigns/
        Create a new campaign
        """
        try:
            account_id = request.data.get('account_id')
            account = get_object_or_404(MetaAdAccount, account_id=account_id, user=request.user)
            
            api_service = MetaAPIService(account.access_token)
            meta_campaign = api_service.create_campaign(
                account_id=account.account_id,
                name=request.data.get('name'),
                objective=request.data.get('objective'),
                status=request.data.get('status', 'PAUSED'),
                daily_budget=request.data.get('daily_budget'),
                lifetime_budget=request.data.get('lifetime_budget'),
            )
            
            # Save to database
            campaign = MetaCampaign.objects.create(
                account=account,
                campaign_id=meta_campaign['id'],
                name=meta_campaign.get('name'),
                status=meta_campaign.get('status'),
                objective=request.data.get('objective'),
                daily_budget=request.data.get('daily_budget'),
                lifetime_budget=request.data.get('lifetime_budget'),
            )
            
            serializer = self.get_serializer(campaign)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error creating campaign: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class PauseCampaignView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def pause(self, request, campaign_id=None):
        """
        POST /api/meta-ads/campaigns/{campaign_id}/pause/
        """
        try:
            campaign = get_object_or_404(MetaCampaign, campaign_id=campaign_id, account__user=request.user)
            api_service = MetaAPIService(campaign.account.access_token)
            api_service.pause_campaign(campaign.campaign_id)
            
            campaign.status = 'PAUSED'
            campaign.save()
            
            return Response({'message': 'Kampaniya dayandırıldı'})
        except Exception as e:
            logger.error(f"Error pausing campaign: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
```

### Analytics Views Example
```python
# meta_analytics/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from meta_ads.models import MetaAdAccount, MetaCampaign, MetaAdSet, MetaAd
from meta_ads.services.meta_api_service import MetaAPIService
import logging

logger = logging.getLogger(__name__)

class InsightsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        GET /api/meta-analytics/insights/
        Query params:
        - account_id, campaign_id, ad_set_id, ad_id (one required)
        - date_preset: last_7d, last_30d, etc.
        - start_date, end_date (YYYY-MM-DD)
        - metrics: comma-separated list
        """
        try:
            account_id = request.query_params.get('account_id')
            campaign_id = request.query_params.get('campaign_id')
            ad_set_id = request.query_params.get('ad_set_id')
            ad_id = request.query_params.get('ad_id')
            
            date_preset = request.query_params.get('date_preset', 'last_7d')
            start_date = request.query_params.get('start_date')
            end_date = request.query_params.get('end_date')
            metrics = request.query_params.get('metrics', '').split(',') if request.query_params.get('metrics') else None
            
            # Get access token
            if account_id:
                account = get_object_or_404(MetaAdAccount, account_id=account_id, user=request.user)
                access_token = account.access_token
            elif campaign_id:
                campaign = get_object_or_404(MetaCampaign, campaign_id=campaign_id, account__user=request.user)
                access_token = campaign.account.access_token
            elif ad_set_id:
                ad_set = get_object_or_404(MetaAdSet, ad_set_id=ad_set_id, campaign__account__user=request.user)
                access_token = ad_set.campaign.account.access_token
            elif ad_id:
                ad = get_object_or_404(MetaAd, ad_id=ad_id, ad_set__campaign__account__user=request.user)
                access_token = ad.ad_set.campaign.account.access_token
            else:
                return Response(
                    {'error': 'One of account_id, campaign_id, ad_set_id, or ad_id is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            api_service = MetaAPIService(access_token)
            insights = api_service.get_insights(
                account_id=account_id,
                campaign_id=campaign_id,
                ad_set_id=ad_set_id,
                ad_id=ad_id,
                date_preset=date_preset if not (start_date and end_date) else None,
                start_date=start_date,
                end_date=end_date,
                metrics=metrics
            )
            
            # Format response
            if insights:
                insight_data = insights[0]  # Usually one insight object
                return Response({
                    'data': [{
                        'impressions': int(insight_data.get('impressions', 0)),
                        'reach': int(insight_data.get('reach', 0)),
                        'clicks': int(insight_data.get('clicks', 0)),
                        'spend': float(insight_data.get('spend', 0)),
                        'cpm': float(insight_data.get('cpm', 0)) if insight_data.get('cpm') else None,
                        'cpc': float(insight_data.get('cpc', 0)) if insight_data.get('cpc') else None,
                        'ctr': float(insight_data.get('ctr', 0)) if insight_data.get('ctr') else None,
                        'conversions': int(insight_data.get('conversions', 0)),
                        'date_start': insight_data.get('date_start'),
                        'date_stop': insight_data.get('date_stop'),
                    }]
                })
            else:
                return Response({'data': []})
                
        except Exception as e:
            logger.error(f"Error getting insights: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
```

## 4. Serializers

```python
# meta_ads/serializers.py
from rest_framework import serializers
from .models import MetaAdAccount, MetaCampaign, MetaAdSet, MetaAd

class AdAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaAdAccount
        fields = ['id', 'account_id', 'name', 'currency', 'timezone', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaCampaign
        fields = ['id', 'campaign_id', 'name', 'status', 'objective', 
                 'daily_budget', 'lifetime_budget', 'start_time', 'end_time',
                 'created_time', 'updated_time', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class AdSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaAdSet
        fields = ['id', 'ad_set_id', 'name', 'status', 'daily_budget', 
                 'lifetime_budget', 'billing_event', 'optimization_goal', 
                 'targeting', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaAd
        fields = ['id', 'ad_id', 'name', 'status', 'creative', 
                 'created_time', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
```

## 5. OAuth İnteqrasiyası

### Facebook OAuth Flow
```python
# meta_ads/views.py - OAuth connection
from django.shortcuts import redirect
from django.conf import settings

class ConnectAdAccountView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        GET /api/meta-ads/accounts/connect/
        Redirect to Facebook OAuth
        """
        app_id = settings.FACEBOOK_APP_ID
        redirect_uri = f"{settings.FRONTEND_URL}/meta-ads/callback"
        scope = "ads_management,ads_read,business_management"
        
        auth_url = (
            f"https://www.facebook.com/v18.0/dialog/oauth?"
            f"client_id={app_id}&"
            f"redirect_uri={redirect_uri}&"
            f"scope={scope}&"
            f"response_type=code"
        )
        
        return Response({'auth_url': auth_url})
    
    def post(self, request):
        """
        POST /api/meta-ads/accounts/connect/
        Callback after OAuth - exchange code for token
        """
        code = request.data.get('code')
        # Exchange code for access token
        # Save account to database
        # Return account info
        pass
```

## 6. Environment Variables

```python
# settings.py
FACEBOOK_APP_ID = os.getenv('FACEBOOK_APP_ID')
FACEBOOK_APP_SECRET = os.getenv('FACEBOOK_APP_SECRET')
FACEBOOK_API_VERSION = os.getenv('FACEBOOK_API_VERSION', 'v18.0')
```

## 7. Migrations

```bash
python manage.py makemigrations meta_ads
python manage.py migrate
```

## 8. Test Endpoints

### Test Campaigns List
```bash
GET /api/meta-ads/campaigns/?account_id=123456789
Authorization: Bearer <token>
```

### Test Insights
```bash
GET /api/meta-analytics/insights/?account_id=123456789&date_preset=last_7d
Authorization: Bearer <token>
```

## 9. Qeydlər

1. **Access Token Management**: Access token-ləri şifrələnmiş şəkildə saxlayın
2. **Rate Limiting**: Meta API rate limit-ləri var, buna görə caching istifadə edin
3. **Error Handling**: Facebook API xətalarını düzgün handle edin
4. **Permissions**: İstifadəçilərin yalnız öz hesablarına baxa bilməsini təmin edin
5. **Sync**: Database ilə Meta API arasında sync mexanizmi qurun (periodic task)

## 10. Əlavə Funksionallıq

- **Webhooks**: Meta-dan real-time updates üçün
- **Scheduled Sync**: Periodic task ilə data sync
- **Caching**: Redis ilə insights caching
- **Batch Operations**: Çoxlu kampaniya/ads üçün batch operations

## 11. Meta API Permissions

Facebook App-də aşağıdakı permissions lazımdır:
- `ads_management` - Reklam idarəetməsi
- `ads_read` - Reklam oxuma
- `business_management` - Business hesab idarəetməsi

## 12. Testing

```python
# tests/test_meta_api.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from meta_ads.models import MetaAdAccount
from meta_ads.services.meta_api_service import MetaAPIService

User = get_user_model()

class MetaAPITestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@test.com', password='test123')
        self.account = MetaAdAccount.objects.create(
            user=self.user,
            account_id='123456789',
            name='Test Account',
            access_token='test_token'
        )
    
    def test_get_campaigns(self):
        # Test campaign retrieval
        pass
```

---

**Qeyd**: Bu prompt tam implementasiya üçün əsas strukturu verir. Hər bir endpoint-i və funksionallığı tələb olunan qədər genişləndirin.

