import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Debug: Log API base URL (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', API_BASE_URL);
  console.log('🔗 Environment Variable:', process.env.NEXT_PUBLIC_API_URL || 'NOT SET (using default)');
  console.log('🔗 Node Environment:', process.env.NODE_ENV);
}

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // If FormData, remove Content-Type header so browser sets it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Always try to get token from localStorage
    const token = localStorage.getItem('access_token');
    
    // List of public endpoints that don't require authentication
    const publicEndpoints = ['/auth/login/', '/auth/register/', '/auth/token/refresh/'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    if (token) {
      // Ensure Authorization header is set
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!isPublicEndpoint) {
      // Only show warning for non-public endpoints
      console.warn('⚠️ No auth token found in localStorage for request:', config.url);
    }
    
    // Log request for debugging (especially for branding endpoint)
    if (config.url?.includes('auth-url') || config.url?.includes('apply-branding')) {
      const authHeader = config.headers?.Authorization;
      const authHeaderStr = typeof authHeader === 'string' ? authHeader : String(authHeader || '');
      console.log('🔗 API Request:', {
        method: config.method?.toUpperCase(),
        url: `${config.baseURL}${config.url}`,
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
        hasAuthHeader: !!authHeader,
        authHeaderPreview: authHeaderStr ? `${authHeaderStr.substring(0, 30)}...` : 'none'
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Log error for debugging - yaxşılaşdırılmış error logging
    if (originalRequest.url?.includes('auth-url')) {
      const errorData = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: `${originalRequest.baseURL}${originalRequest.url}`,
        method: originalRequest.method?.toUpperCase(),
        data: error.response?.data,
        message: error.message,
        config: {
          headers: originalRequest.headers,
          hasAuth: !!originalRequest.headers?.Authorization,
        }
      };
      
      console.error('❌ API Error Response:', errorData);
      
      // Xüsusi error mesajları
      if (error.response?.status === 401) {
        console.error('❌ Authentication tələb olunur - Token yoxdur və ya etibarsızdır');
      } else if (error.response?.status === 503) {
        console.error('❌ Service Unavailable - Backend konfiqurasiya problemi ola bilər');
        if (error.response?.data?.details) {
          console.error('📋 Backend Details:', error.response.data.details);
        }
      } else if (error.response?.status === 404) {
        console.error('❌ Endpoint tapılmadı - Backend-də endpoint mövcud deyil');
      } else if (!error.response) {
        console.error('❌ Network Error - Backend server-ə qoşula bilmədi');
        console.error('⚠️ Ola bilər ki, backend server işləmir və ya DigitalOcean-da ödəniş problemi var');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        console.error('❌ Connection Refused - Backend server işləmir');
        console.error('⚠️ DigitalOcean server status-unu yoxlayın və ödənişi təsdiqləyin');
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login/', { email, password }),
  
  register: (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    company_name?: string;
  }) => api.post('/auth/register/', userData),
  
  refreshToken: (refresh: string) =>
    api.post('/auth/token/refresh/', { refresh }),
  
  logout: () => api.post('/auth/logout/'),
  
  getProfile: () => api.get('/auth/profile/'),
  
  updateProfile: (data: any) => api.patch('/auth/profile/', data),
  
  // Company Profile endpoints
  getCompanyProfile: () => api.get('/auth/company-profile/'),
  updateCompanyProfile: (data: any) => {
    // FormData will be handled by interceptor (Content-Type removed)
    return api.patch('/auth/company-profile/', data);
  },
  createCompanyProfile: (data: any) => api.post('/auth/company-profile/', data),
  
  // Statistics
  getStats: () => api.get('/auth/stats/'),
};

// Posts API endpoints
export const postsAPI = {
  getPosts: (params?: any) => api.get('/posts/', { params }),
  getPost: (id: string) => api.get(`/posts/${id}/`),
  createPost: (data: any) => api.post('/posts/', data),
  updatePost: (id: string, data: any) => api.patch(`/posts/${id}/`, data),
  deletePost: (id: string) => api.delete(`/posts/${id}/`),
  publishPost: (id: string) => api.post(`/posts/${id}/publish/`),
  publishToFacebook: (id: string) => api.post(`/posts/${id}/publish-facebook/`),
  publishToInstagram: (id: string) => api.post(`/posts/${id}/publish-instagram/`),
  publishToLinkedIn: (id: string) => api.post(`/posts/${id}/publish-linkedin/`),
  schedulePost: (id: string, scheduledTime: string, platforms?: string[], useOptimal?: boolean) =>
    api.post(`/posts/${id}/schedule/`, { 
      scheduled_time: scheduledTime,
      platforms: platforms || [],
      use_optimal: useOptimal || false
    }),
  getOptimalTiming: (platforms?: string[], daysAhead?: number) => {
    const params: any = {};
    if (platforms) params.platforms = platforms;
    if (daysAhead) params.days_ahead = daysAhead;
    return api.get('/posts/optimal-timing/', { params });
  },
  
  // AI Generation endpoints
  generatePosts: (data?: any) => api.post('/posts/generate/', data),
  getPendingPosts: () => api.get('/posts/pending/'),
  approvePosts: (postIds: string[]) => 
    api.post('/posts/approve/', { action: 'approve', post_ids: postIds }),
  rejectPosts: (postIds: string[]) => 
    api.post('/posts/approve/', { action: 'reject', post_ids: postIds }),
  
  // Image management
  uploadCustomImage: (postId: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post(`/posts/${postId}/upload-image/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  regenerateDesign: (postId: string) => api.post(`/posts/${postId}/regenerate-design/`),
  applyBranding: (postId: string) => api.post(`/posts/${postId}/apply-branding/`),
  
  // Statistics
  getStats: () => api.get('/posts/stats/'),
  
  // Post Performance
  getPostPerformance: (postId: string) => api.get(`/posts/${postId}/performance/`),
  updatePostPerformance: (postId: string, platformPostId?: string) => 
    api.post(`/posts/${postId}/performance/`, { platform_post_id: platformPostId }),
  getAllPostPerformance: () => api.get('/posts/performance/'),
};

// Social Accounts API endpoints
export const socialAccountsAPI = {
  getAccounts: () => api.get('/social-accounts/'),
  connectAccount: (platform: string, authData: any) =>
    api.post('/social-accounts/connect/', { platform, ...authData }),
  disconnectAccount: (id: string) => api.delete(`/social-accounts/${id}/`),
  getAuthUrl: (platform: string) => api.get(`/social-accounts/auth-url/${platform}/`),
};

// Brand Voice API endpoints
export const brandVoiceAPI = {
  getBrandVoices: () => api.get('/brand-voices/'),
  createBrandVoice: (data: any) => api.post('/brand-voices/', data),
  updateBrandVoice: (id: string, data: any) => api.patch(`/brand-voices/${id}/`, data),
  deleteBrandVoice: (id: string) => api.delete(`/brand-voices/${id}/`),
};

// AI API endpoints
export const aiAPI = {
  generateContent: (data: {
    prompt: string;
    brand_voice_id?: string;
    platform?: string;
    content_type?: string;
  }) => api.post('/ai/generate-content/', data),
  
  optimizeForPlatform: (content: string, platform: string) =>
    api.post('/ai/optimize-platform/', { content, platform }),
  
  analyzeLogo: (logoFile: File) => {
    const formData = new FormData();
    formData.append('logo', logoFile);
    return api.post('/ai/analyze-logo/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Wask.co AI API endpoints for Logo & Slogan Generation
export const waskAIAPI = {
  generateLogoAndSlogan: async (data: {
    productName?: string;
    productDescription?: string;
    productLink?: string;
    image?: File;
    style?: string;
    color?: string;
    tags?: string[];
  }) => {
    const formData = new FormData();
    
    if (data.productName) formData.append('product_name', data.productName);
    if (data.productDescription) formData.append('product_description', data.productDescription);
    if (data.productLink) formData.append('product_link', data.productLink);
    if (data.image) formData.append('image', data.image);
    if (data.style) formData.append('style', data.style);
    if (data.color) formData.append('color', data.color);
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach(tag => formData.append('tags', tag));
    }
    
    // TODO: Replace with actual Wask.co API endpoint
    // For now, this will call our backend which should proxy to Wask.co
    return api.post('/ai/wask/generate-logo-slogan/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Alternative: Direct Wask.co API call (if API key is available)
  generateLogoAndSloganDirect: async (data: {
    productName?: string;
    productDescription?: string;
    productLink?: string;
    image?: File;
  }, waskApiKey?: string) => {
    const WASK_API_URL = 'https://api.wask.co/v1'; // TODO: Update with actual Wask.co API URL
    
    const formData = new FormData();
    if (data.productName) formData.append('product_name', data.productName);
    if (data.productDescription) formData.append('product_description', data.productDescription);
    if (data.productLink) formData.append('product_link', data.productLink);
    if (data.image) formData.append('image', data.image);
    
    return axios.post(`${WASK_API_URL}/generate-logo-slogan`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': waskApiKey ? `Bearer ${waskApiKey}` : undefined,
      }
    });
  },
};

// AI Ad Creative Generator API endpoints
export const adCreativeAPI = {
  createAdCreative: (formData: FormData) => {
    return api.post('/ai/create-ad-creative/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Fal.ai API endpoints
export const falAIAPI = {
  // Image to Video (existing)
  imageToVideo: (data: {
    image_url: string;
    prompt?: string;
    duration?: number;
    fps?: number;
    save_to_storage?: boolean;
  }) => api.post('/ai/fal-ai/image-to-video/', data),
  
  // Edit Image (existing)
  editImage: (data: {
    image_url: string;
    prompt: string;
    strength?: number;
    save_to_storage?: boolean;
  }) => api.post('/ai/fal-ai/edit-image/', data),
  
  // Nano Banana - Text to Image
  nanoBananaTextToImage: (data: {
    prompt: string;
    product_name?: string;
    product_description?: string;
    width?: number;
    height?: number;
    enhance_prompt?: boolean;
    save_to_storage?: boolean;
  }) => api.post('/ai/fal-ai/nano-banana/text-to-image/', data),
  
  // Nano Banana - Image to Image
  nanoBananaImageToImage: (data: {
    image_url: string;
    prompt: string;
    product_name?: string;
    product_description?: string;
    strength?: number;
    enhance_prompt?: boolean;
    save_to_storage?: boolean;
  }) => api.post('/ai/fal-ai/nano-banana/image-to-image/', data),
  
  // Kling Video - Text to Video
  klingVideoTextToVideo: (data: {
    prompt: string;
    product_name?: string;
    product_description?: string;
    duration?: number;
    fps?: number;
    width?: number;
    height?: number;
    enhance_prompt?: boolean;
    save_to_storage?: boolean;
  }) => api.post('/ai/fal-ai/kling-video/text-to-video/', data),
};

// Meta Ads API endpoints
export const metaAdsAPI = {
  // Account Management
  getAdAccounts: () => api.get('/meta-ads/accounts/'),
  getConnectAdAccountUrl: () => api.get('/meta-ads/accounts/connect/'),
  syncAdAccounts: () => api.post('/meta-ads/accounts/sync/'),
  disconnectAdAccount: (accountId: string) => api.delete(`/meta-ads/accounts/${accountId}/`),
  
  // Campaigns
  getCampaigns: (accountId?: string, params?: any) => 
    api.get('/meta-ads/campaigns/', { params: { account_id: accountId, ...params } }),
  getCampaign: (campaignId: string) => api.get(`/meta-ads/campaigns/${campaignId}/`),
  createCampaign: (data: any) => api.post('/meta-ads/campaigns/create/', data),
  updateCampaign: (campaignId: string, data: any) => api.patch(`/meta-ads/campaigns/${campaignId}/`, data),
  deleteCampaign: (campaignId: string) => api.delete(`/meta-ads/campaigns/${campaignId}/`),
  
  // Ad Sets
  getAdSets: (campaignId?: string, params?: any) => 
    api.get('/meta-ads/ad-sets/', { params: { campaign_id: campaignId, ...params } }),
  getAdSet: (adSetId: string) => api.get(`/meta-ads/ad-sets/${adSetId}/`),
  createAdSet: (data: any) => api.post('/meta-ads/ad-sets/', data),
  updateAdSet: (adSetId: string, data: any) => api.patch(`/meta-ads/ad-sets/${adSetId}/`, data),
  deleteAdSet: (adSetId: string) => api.delete(`/meta-ads/ad-sets/${adSetId}/`),
  
  // Ads
  getAds: (adSetId?: string, params?: any) => 
    api.get('/meta-ads/ads/', { params: { ad_set_id: adSetId, ...params } }),
  getAd: (adId: string) => api.get(`/meta-ads/ads/${adId}/`),
  createAd: (data: any) => api.post('/meta-ads/ads/', data),
  updateAd: (adId: string, data: any) => api.patch(`/meta-ads/ads/${adId}/`, data),
  deleteAd: (adId: string) => api.delete(`/meta-ads/ads/${adId}/`),
  
  // Campaign Actions
  pauseCampaign: (campaignId: string) => api.post(`/meta-ads/campaigns/${campaignId}/pause/`),
  resumeCampaign: (campaignId: string) => api.post(`/meta-ads/campaigns/${campaignId}/resume/`),
  pauseAdSet: (adSetId: string) => api.post(`/meta-ads/ad-sets/${adSetId}/pause/`),
  resumeAdSet: (adSetId: string) => api.post(`/meta-ads/ad-sets/${adSetId}/resume/`),
  pauseAd: (adId: string) => api.post(`/meta-ads/ads/${adId}/pause/`),
  resumeAd: (adId: string) => api.post(`/meta-ads/ads/${adId}/resume/`),
  
  // Insights (Meta Analytics)
  getInsights: (params?: {
    account_id?: string;
    campaign_id?: string;
    ad_set_id?: string;
    ad_id?: string;
    date_preset?: string;
    start_date?: string;
    end_date?: string;
    metrics?: string[];
  }) => api.get('/meta-ads/insights/', { params }),
};

// Meta Analytics API endpoints
export const metaAnalyticsAPI = {
  // Insights (uses meta-ads/insights/ endpoint)
  getInsights: (params: {
    account_id?: string;
    campaign_id?: string;
    ad_set_id?: string;
    ad_id?: string;
    date_preset?: string;
    start_date?: string;
    end_date?: string;
    metrics?: string[];
  }) => api.get('/meta-ads/insights/', { params }),
  
  // Account Insights
  getAccountInsights: (accountId: string, params?: any) => 
    api.get(`/meta-analytics/accounts/${accountId}/insights/`, { params }),
  
  // Campaign Insights
  getCampaignInsights: (campaignId: string, params?: any) => 
    api.get(`/meta-analytics/campaigns/${campaignId}/insights/`, { params }),
  
  // Ad Set Insights
  getAdSetInsights: (adSetId: string, params?: any) => 
    api.get(`/meta-analytics/ad-sets/${adSetId}/insights/`, { params }),
  
  // Ad Insights
  getAdInsights: (adId: string, params?: any) => 
    api.get(`/meta-analytics/ads/${adId}/insights/`, { params }),
  
  // Reports
  generateReport: (data: {
    account_id?: string;
    report_type: 'account' | 'campaign' | 'ad_set' | 'ad';
    date_preset?: string;
    start_date?: string;
    end_date?: string;
    metrics: string[];
    format?: 'json' | 'csv';
  }) => api.post('/meta-analytics/reports/', data),
  
  // Real-time Metrics
  getRealtimeMetrics: (accountId?: string) => 
    api.get('/meta-analytics/realtime/', { params: { account_id: accountId } }),
};

export default api;

