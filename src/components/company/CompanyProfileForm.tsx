'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { authAPI, aiAPI, api } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

const companyProfileSchema = z.object({
  company_name: z.string().min(1, 'Şirkət adı tələb olunur'),
  industry: z.string().min(1, 'Sənaye tələb olunur'),
  company_size: z.string().min(1, 'Şirkət ölçüsü tələb olunur'),
  website: z.union([z.string().url('Zəhmət olmasa düzgün URL daxil edin'), z.literal('')]).optional(),
  location: z.string().optional(),
  business_description: z.string().min(10, 'Zəhmət olmasa ətraflı biznes təsviri verin (ən azı 10 simvol)'),
  target_audience: z.string().min(10, 'Zəhmət olmasa hədəf auditoriyanızı təsvir edin (ən azı 10 simvol)'),
  unique_selling_points: z.string().min(10, 'Zəhmət olmasa şirkətinizi unikal edən xüsusiyyətləri təsvir edin (ən azı 10 simvol)'),
  social_media_goals: z.string().min(10, 'Zəhmət olmasa sosial media məqsədlərinizi təsvir edin (ən azı 10 simvol)'),
  preferred_tone: z.string().min(1, 'Zəhmət olmasa üstünlük verilən üslubu seçin'),
  content_topics: z.string().optional(),
  keywords: z.string().optional(),
  avoid_topics: z.string().optional(),
  posts_to_generate: z.number().min(1, 'Minimum 1 paylaşım').max(30, 'Maksimum 30 paylaşım').optional(),
  // Branding fields
  slogan: z.union([z.string().max(200, 'Slogan maksimum 200 simvol ola bilər'), z.literal('')]).optional(),
  slogan_enabled: z.boolean().default(true),
  slogan_size_percent: z.number().min(2).max(8).optional(),
  branding_enabled: z.boolean().default(true),
  logo_position: z.enum(['top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right']).optional(),
  slogan_position: z.enum(['top-center', 'bottom-center']).optional(),
  logo_size_percent: z.number().min(2).max(25).optional(),
  branding_mode: z.enum(['standard', 'custom']).optional(),
  gradient_enabled: z.boolean().optional(),
  gradient_color: z.string().optional(),
  gradient_height_percent: z.number().min(10).max(50).optional(),
  gradient_position: z.enum(['top', 'bottom', 'both']).optional(),
});

type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;

interface CompanyProfileFormProps {
  onComplete: () => void;
  existingProfile?: any;
}

export default function CompanyProfileForm({ onComplete, existingProfile }: CompanyProfileFormProps) {
  const t = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [aiLoading, setAiLoading] = useState<{[key: string]: boolean}>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [brandAnalysis, setBrandAnalysis] = useState<any>(null);
  const [analyzingLogo, setAnalyzingLogo] = useState(false);
  const [showBrandAnalysis, setShowBrandAnalysis] = useState(false);
  const [editingColors, setEditingColors] = useState(false);
  // Branding state
  const [brandingEnabled, setBrandingEnabled] = useState(true);
  const [brandingMode, setBrandingMode] = useState<'standard' | 'custom'>('standard');
  const [logoPosition, setLogoPosition] = useState<'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'>('top-center');
  const [sloganPosition, setSloganPosition] = useState<'top-center' | 'bottom-center'>('bottom-center');
  const [logoSizePercent, setLogoSizePercent] = useState(13);
  const [sloganSizePercent, setSloganSizePercent] = useState(4);
  const [gradientEnabled, setGradientEnabled] = useState(true);
  const [gradientColor, setGradientColor] = useState('#3B82F6');
  const [gradientHeight, setGradientHeight] = useState(25);
  const [gradientPosition, setGradientPosition] = useState<'top' | 'bottom' | 'both'>('both');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues
  } = useForm<CompanyProfileFormData>({
    // @ts-expect-error - Zod resolver type mismatch with react-hook-form
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      branding_enabled: true, // Default value
      slogan_enabled: true, // Default value
    },
  });
  
  // Debug validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('❌ Form validation errors:', errors);
      console.log('📋 Error fields:', Object.keys(errors));
      Object.entries(errors).forEach(([field, error]) => {
        console.log(`  - ${field}:`, error?.message);
      });
    }
  }, [errors]);

  // Load existing profile data
  useEffect(() => {
    if (existingProfile) {
      Object.keys(existingProfile).forEach(key => {
        if (key === 'content_topics' || key === 'keywords' || key === 'avoid_topics') {
          setValue(key as any, Array.isArray(existingProfile[key]) ? existingProfile[key].join(', ') : '');
        } else {
          setValue(key as any, existingProfile[key] || '');
        }
      });
      
      // Load existing logo if available
      if (existingProfile.logo_url) {
        setLogoPreview(existingProfile.logo_url);
      }
      
      // Load existing brand analysis
      if (existingProfile.brand_analysis && Object.keys(existingProfile.brand_analysis).length > 0) {
        setBrandAnalysis(existingProfile.brand_analysis);
        setShowBrandAnalysis(true);
      }
      
      // Load branding settings
      if (existingProfile.branding_enabled !== undefined) {
        setBrandingEnabled(existingProfile.branding_enabled);
        setValue('branding_enabled', existingProfile.branding_enabled);
      } else {
        setValue('branding_enabled', true); // Default value
      }
      if (existingProfile.branding_mode) {
        setBrandingMode(existingProfile.branding_mode);
      }
      if (existingProfile.logo_position) {
        setLogoPosition(existingProfile.logo_position);
      }
      if (existingProfile.slogan_position) {
        setSloganPosition(existingProfile.slogan_position);
      }
      if (existingProfile.logo_size_percent) {
        setLogoSizePercent(existingProfile.logo_size_percent);
      } else if (existingProfile.branding_mode === 'standard') {
        // Set standard defaults if mode is standard
        setLogoSizePercent(13);
        setLogoPosition('top-center');
        setSloganPosition('bottom-center');
      }
      
      // Load slogan size
      if (existingProfile.slogan_size_percent) {
        setSloganSizePercent(existingProfile.slogan_size_percent);
      }
      
      // Load gradient settings
      if (existingProfile.gradient_enabled !== undefined) {
        setGradientEnabled(existingProfile.gradient_enabled);
      }
      if (existingProfile.gradient_color) {
        setGradientColor(existingProfile.gradient_color);
      }
      if (existingProfile.gradient_height_percent) {
        setGradientHeight(existingProfile.gradient_height_percent);
      }
      if (existingProfile.gradient_position) {
        setGradientPosition(existingProfile.gradient_position);
      }
    }
  }, [existingProfile, setValue]);

  // Handle logo file selection
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Zəhmət olmasa şəkil faylı seçin');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Şəkil faylı 5MB-dan kiçik olmalıdır');
      return;
    }

    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Automatically analyze logo (optional - don't block upload if it fails)
    try {
      await analyzeLogo(file);
    } catch (error) {
      // Logo analysis is optional, so we don't show error to user
      // Logo upload will still work
      console.log('Logo analysis skipped:', error);
    }
  };

  // Analyze logo with AI (optional feature)
  const analyzeLogo = async (file: File) => {
    setAnalyzingLogo(true);
    
    try {
      // Get current company context for better analysis
      const formData = new FormData();
      formData.append('logo', file);
      
      const companyName = getValues('company_name');
      const industry = getValues('industry');
      const businessDesc = getValues('business_description');
      
      if (companyName) formData.append('company_name', companyName);
      if (industry) formData.append('industry', industry);
      if (businessDesc) formData.append('business_description', businessDesc);
      
      const response = await api.post('/ai/analyze-logo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data?.brand_analysis) {
        const analysis = response.data.brand_analysis;
        setBrandAnalysis(analysis);
        setShowBrandAnalysis(true);
      }
      
    } catch (err: any) {
      // Logo analysis is optional - don't show error to user
      // The logo upload itself will still work
      console.log('Logo analysis not available or failed:', err.response?.status, err.response?.data);
      // Don't set error state - logo upload should still proceed
    } finally {
      setAnalyzingLogo(false);
    }
  };

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Zəhmət olmasa şəkil faylı seçin');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Şəkil faylı 10MB-dan kiçik olmalıdır');
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Automatically analyze logo (optional - don't block upload if it fails)
    try {
      await analyzeLogo(file);
    } catch (error) {
      // Logo analysis is optional, so we don't show error to user
      // Logo upload will still work
      console.log('Logo analysis skipped:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Update brand analysis colors
  const updateBrandColor = (field: string, value: string, index?: number) => {
    if (!brandAnalysis) return;
    
    const updated = { ...brandAnalysis };
    
    if (index !== undefined) {
      // Update array item (for color_palette or complementary_colors)
      if (Array.isArray(updated[field])) {
        updated[field][index] = value;
      }
    } else {
      // Update single value
      updated[field] = value;
    }
    
    setBrandAnalysis(updated);
  };

  // Generate complementary colors with AI
  const generateComplementaryColors = async () => {
    if (!brandAnalysis) {
      setError('Brend təhlili məlumatı yoxdur');
      return;
    }

    setAiLoading(prev => ({ ...prev, 'complementary_colors': true }));
    
    try {
      const response = await aiAPI.generateComplementaryColors({
        primary_color: brandAnalysis.primary_color || '#3B82F6',
        color_palette: brandAnalysis.color_palette || [],
        brand_personality: brandAnalysis.brand_personality || [],
        design_style: brandAnalysis.design_style || ''
      });

      if (response.data?.complementary_colors) {
        const updated = { ...brandAnalysis };
        updated.complementary_colors = response.data.complementary_colors;
        setBrandAnalysis(updated);
        setSuccess('Tamamlayıcı rənglər uğurla yaradıldı!');
      }
    } catch (err: any) {
      console.error('Error generating complementary colors:', err);
      setError('Tamamlayıcı rəngləri yaratmaq mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setAiLoading(prev => ({ ...prev, 'complementary_colors': false }));
    }
  };

  // Generate slogan with AI
  const generateSlogan = async () => {
    setAiLoading(prev => ({ ...prev, 'slogan': true }));
    
    try {
      const companyName = getValues('company_name');
      if (!companyName) {
        setError('Slogan yaratmaq üçün şirkət adı tələb olunur');
        return;
      }

      const response = await aiAPI.generateSlogan({
        company_name: companyName,
        industry: getValues('industry'),
        business_description: getValues('business_description'),
        target_audience: getValues('target_audience'),
        unique_selling_points: getValues('unique_selling_points'),
        brand_personality: brandAnalysis?.brand_personality || [],
        brand_keywords: brandAnalysis?.brand_keywords || []
      });

      if (response.data?.slogan) {
        setValue('slogan', response.data.slogan);
        setSuccess('Slogan uğurla yaradıldı!');
      }
    } catch (err: any) {
      console.error('Error generating slogan:', err);
      setError('Slogan yaratmaq mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setAiLoading(prev => ({ ...prev, 'slogan': false }));
    }
  };

  // AI suggestion function
  const generateAISuggestion = async (fieldName: string) => {
    setAiLoading(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      const currentValue = getValues(fieldName as any);
      
      // Gather context from ALL fields to understand the company better
      const companyName = getValues('company_name') || 'şirkət';
      const industry = getValues('industry');
      const companySize = getValues('company_size');
      const website = getValues('website');
      const location = getValues('location');
      const businessDesc = getValues('business_description');
      const targetAud = getValues('target_audience');
      const usp = getValues('unique_selling_points');
      const socialGoals = getValues('social_media_goals');
      const topics = getValues('content_topics');
      const keywords = getValues('keywords');
      
      // Build context from available information
      let contextInfo = `Şirkət: "${companyName}"`;
      if (industry) contextInfo += `, Sənaye: ${industry}`;
      if (companySize) contextInfo += `, Ölçü: ${companySize}`;
      if (location) contextInfo += `, Yer: ${location}`;
      if (businessDesc) contextInfo += `, Biznes: ${businessDesc}`;
      if (targetAud) contextInfo += `, Auditoriya: ${targetAud}`;
      if (usp) contextInfo += `, Unikal: ${usp}`;
      
      let prompt = '';
      
      switch (fieldName) {
        case 'business_description':
          prompt = currentValue 
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı biznes təsvirini təkmilləşdirin və daha peşəkar, cəlbedici hala gətirin. Cavab yalnız təkmilləşdirilmiş təsvir olmalıdır, əlavə izahat olmadan.\n\nTəsvir: "${currentValue}"`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında peşəkar biznes təsviri yazın. Cavab yalnız təsvir olmalıdır, əlavə izahat olmadan.`;
          break;
          
        case 'target_audience':
          prompt = currentValue
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı hədəf auditoriya təsvirini təkmilləşdirin və daha ətraflı, dəqiq hala gətirin. Demoqrafiya, maraqlar və ehtiyacları əhatə edin.\n\nTəsvir: "${currentValue}"`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında hədəf auditoriya təsviri yazın. Demoqrafiya, maraqlar və ehtiyacları əhatə edin. Cavab yalnız təsvir olmalıdır.`;
          break;
          
        case 'unique_selling_points':
          prompt = currentValue
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı unikal satış təkliflərini təkmilləşdirin və daha güclü, inandırıcı hala gətirin.\n\nTəsvir: "${currentValue}"`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında unikal satış təklifləri və rəqabət üstünlükləri yazın. Cavab yalnız təsvir olmalıdır.`;
          break;
          
        case 'social_media_goals':
          prompt = currentValue
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı sosial media məqsədlərini təkmilləşdirin və daha konkret, ölçülə bilən (SMART) hala gətirin.\n\nMəqsədlər: "${currentValue}"`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında sosial media məqsədləri yazın. SMART prinsiplərinə uyğun olsun. Cavab yalnız məqsədlər olmalıdır.`;
          break;
          
        case 'content_topics':
          prompt = currentValue
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı məzmun mövzularını təkmilləşdirin və genişləndirin. 8-10 mövzu olsun.\n\nMövzular: "${currentValue}"\n\nCavab yalnız vergüllə ayrılmış mövzular olmalıdır.`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında sosial mediada paylaşıla biləcək 8-10 məzmun mövzusu təklif edin. Cavab yalnız vergüllə ayrılmış mövzular olmalıdır.`;
          break;
          
        case 'keywords':
          prompt = currentValue
            ? `Kontekst: ${contextInfo}\n\nAşağıdakı açar sözləri təkmilləşdirin və SEO üçün optimallaşdırın.\n\nAçar sözlər: "${currentValue}"\n\nCavab yalnız vergüllə ayrılmış açar sözlər olmalıdır.`
            : `${contextInfo}\n\nYuxarıdakı məlumatlar əsasında vacib SEO açar sözləri təklif edin. Cavab yalnız vergüllə ayrılmış açar sözlər olmalıdır.`;
          break;
      }
      
      const response = await aiAPI.generateContent({ 
        prompt,
        content_type: 'company_field_suggestion'
      });
      
      const suggestion = response.data.content || response.data.generated_content || response.data;
      setValue(fieldName as any, typeof suggestion === 'string' ? suggestion : suggestion.content || '');
      
    } catch (err: any) {
      console.error('AI generation error:', err);
      setError('AI təklifi yaradarkən xəta baş verdi. Zəhmət olmasa backend-də AI endpoint yaradın.');
    } finally {
      setAiLoading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const onSubmit = async (data: CompanyProfileFormData) => {
    console.log('🚀 Form submit started');
    console.log('📝 Form data:', data);
    console.log('⏳ isLoading before:', isLoading);
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    console.log('⏳ isLoading set to true');

    try {
      // Convert comma-separated strings to arrays
      console.log('✅ Form submit - branding_enabled:', brandingEnabled);
      const processedData: any = {
        ...data,
        content_topics: data.content_topics ? data.content_topics.split(',').map(s => s.trim()).filter(s => s) : [],
        keywords: data.keywords ? data.keywords.split(',').map(s => s.trim()).filter(s => s) : [],
        avoid_topics: data.avoid_topics ? data.avoid_topics.split(',').map(s => s.trim()).filter(s => s) : [],
        // Add branding fields
        branding_enabled: brandingEnabled,
        branding_mode: brandingMode,
        logo_position: brandingMode === 'standard' ? 'top-center' : logoPosition,
        slogan_position: brandingMode === 'standard' ? 'bottom-center' : sloganPosition,
        logo_size_percent: brandingMode === 'standard' ? 13 : logoSizePercent,
        slogan_size_percent: sloganSizePercent,
        gradient_enabled: gradientEnabled,
        gradient_color: gradientColor,
        gradient_height_percent: gradientHeight,
        gradient_position: gradientPosition,
      };

      // Add brand analysis if available
      if (brandAnalysis) {
        processedData.brand_analysis = brandAnalysis;
      }

      // Prepare data for submission
      if (logoFile) {
        console.log('[DEBUG] 🎯 Logo upload process started');
        console.log('[DEBUG] Logo file details:', {
          name: logoFile.name,
          size: logoFile.size,
          type: logoFile.type,
          lastModified: new Date(logoFile.lastModified).toISOString()
        });
        
        // Use FormData when logo is present
        const formData = new FormData();
        
        console.log('[DEBUG] Creating FormData...');
        console.log('[DEBUG] processedData keys:', Object.keys(processedData));
        
        // Append all fields
        Object.keys(processedData).forEach(key => {
          const value = processedData[key];
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              const jsonValue = JSON.stringify(value);
              formData.append(key, jsonValue);
              console.log(`[DEBUG] Appended ${key} (array): ${jsonValue.substring(0, 100)}...`);
            } else if (typeof value === 'object') {
              const jsonValue = JSON.stringify(value);
              formData.append(key, jsonValue);
              console.log(`[DEBUG] Appended ${key} (object): ${jsonValue.substring(0, 100)}...`);
            } else {
              formData.append(key, String(value));
              console.log(`[DEBUG] Appended ${key} (string): ${String(value).substring(0, 100)}`);
            }
          }
        });
        
        // Append logo file
        console.log('[DEBUG] Appending logo file to FormData...');
        formData.append('logo', logoFile, logoFile.name);
        console.log('[DEBUG] ✅ Logo file appended');
        
        // Verify FormData contents
        console.log('[DEBUG] FormData entries:');
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`[DEBUG]   - ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
          } else {
            console.log(`[DEBUG]   - ${key}: ${String(value).substring(0, 100)}`);
          }
        }
        
        const method = existingProfile ? 'PATCH' : 'POST';
        const url = '/auth/company-profile/';
        console.log(`[DEBUG] Sending ${method} request to ${url}`);
        console.log('[DEBUG] Request headers: Content-Type=multipart/form-data');
        
        try {
        if (existingProfile) {
            console.log('[DEBUG] Updating existing profile...');
            const response = await api.patch(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
            console.log('[DEBUG] ✅ Response received:', {
              status: response.status,
              data: response.data
            });
          setSuccess('Şirkət profili və loqo uğurla yeniləndi!');
        } else {
            console.log('[DEBUG] Creating new profile...');
            const response = await api.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
            console.log('[DEBUG] ✅ Response received:', {
              status: response.status,
              data: response.data
            });
          setSuccess('Şirkət profili və loqo uğurla yaradıldı!');
          }
        } catch (uploadError: any) {
          console.error('[DEBUG] ❌ Upload error:', uploadError);
          console.error('[DEBUG] Error response:', uploadError.response);
          console.error('[DEBUG] Error data:', uploadError.response?.data);
          console.error('[DEBUG] Error status:', uploadError.response?.status);
          throw uploadError;
        }
      } else {
        // No logo, use regular JSON
        if (existingProfile) {
          await authAPI.updateCompanyProfile(processedData);
          setSuccess('Şirkət profili uğurla yeniləndi!');
        } else {
          await authAPI.createCompanyProfile(processedData);
          setSuccess('Şirkət profili uğurla yaradıldı!');
        }
      }

      setTimeout(() => {
        onComplete();
      }, 1500);

    } catch (err: any) {
      console.error('❌ Company profile submit error:', err);
      console.error('❌ Error response:', err.response);
      console.error('❌ Error data:', err.response?.data);
      console.error('❌ Error status:', err.response?.status);
      
      let errorMessage = 'Şirkət profilini yadda saxlamaq alınmadı. Zəhmət olmasa yenidən cəhd edin.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else {
          // Try to extract field-specific errors
          const fieldErrors = Object.entries(err.response.data)
            .filter(([key, value]) => Array.isArray(value) || typeof value === 'string')
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('; ');
          
          if (fieldErrors) {
            errorMessage = fieldErrors;
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const industryOptions = [
    { value: 'technology', label: 'Texnologiya' },
    { value: 'healthcare', label: 'Səhiyyə' },
    { value: 'finance', label: 'Maliyyə' },
    { value: 'education', label: 'Təhsil' },
    { value: 'retail', label: 'Pərakəndə Satış' },
    { value: 'manufacturing', label: 'İstehsalat' },
    { value: 'consulting', label: 'Konsaltinq' },
    { value: 'real_estate', label: 'Daşınmaz Əmlak' },
    { value: 'food_beverage', label: 'Qida və İçki' },
    { value: 'travel_tourism', label: 'Turizm və Səyahət' },
    { value: 'automotive', label: 'Avtomobil' },
    { value: 'fashion', label: 'Moda' },
    { value: 'sports_fitness', label: 'İdman və Fitnes' },
    { value: 'entertainment', label: 'Əyləncə' },
    { value: 'non_profit', label: 'Qeyri-Kommersiya' },
    { value: 'other', label: 'Digər' },
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 işçi' },
    { value: '11-50', label: '11-50 işçi' },
    { value: '51-200', label: '51-200 işçi' },
    { value: '201-500', label: '201-500 işçi' },
    { value: '501-1000', label: '501-1000 işçi' },
    { value: '1000+', label: '1000+ işçi' },
  ];

  const toneOptions = [
    { value: 'professional', label: 'Peşəkar' },
    { value: 'casual', label: 'Sadə' },
    { value: 'friendly', label: 'Dostcasına' },
    { value: 'authoritative', label: 'Avtoritar' },
    { value: 'humorous', label: 'Yumoristik' },
    { value: 'inspirational', label: 'İlhamverici' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t.settings.companyProfile.setupTitle}</h1>
        <p className="text-muted-foreground">
          {t.settings.companyProfile.setupDescription}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-700">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(
        (data) => {
          onSubmit(data as unknown as CompanyProfileFormData);
        },
        (errors) => {
          // Only show errors if there are actual validation errors
          const errorKeys = Object.keys(errors);
          if (errorKeys.length > 0) {
            const errorMessages: string[] = [];
            Object.entries(errors).forEach(([field, error]: [string, any]) => {
              const message = error?.message || `Field ${field} is invalid`;
              errorMessages.push(message);
            });
            setError(errorMessages.join(', '));
          }
        }
      )} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🏢</span>
              {t.settings.companyProfile.basicInfo}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.basicInfoDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo Upload Section */}
            <div className="space-y-4 border-b pb-6 mb-6">
              <Label>{t.settings.companyProfile.companyLogo}</Label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  logoPreview 
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-950/30 dark:border-green-600' 
                    : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                }`}
              >
                {logoPreview ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        {t.settings.companyProfile.changeLogo}
                      </Button>
                      {analyzingLogo && (
                        <p className="text-sm text-blue-600 flex items-center">
                          <span className="mr-2 animate-spin">⏳</span>
                          {t.settings.companyProfile.logoAnalyzing}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-3xl">📷</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t.settings.companyProfile.dragDropLogo}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t.settings.companyProfile.logoFileTypes}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      {t.settings.companyProfile.selectFile}
                    </Button>
                  </div>
                )}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t.settings.companyProfile.logoAnalysisHint}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">{t.settings.companyProfile.companyName} *</Label>
                <Input
                  id="company_name"
                  placeholder={t.settings.companyProfile.companyNamePlaceholder}
                  {...register('company_name')}
                  className={errors.company_name ? 'border-red-500' : ''}
                />
                {errors.company_name && (
                  <p className="text-sm text-red-500">{errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">{t.settings.companyProfile.industry} *</Label>
                <select
                  id="industry"
                  {...register('industry')}
                  className={`w-full p-2 border rounded-md bg-background ${errors.industry ? 'border-red-500' : ''}`}
                >
                  <option value="">{t.settings.companyProfile.selectIndustry}</option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-sm text-red-500">{errors.industry.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_size">{t.settings.companyProfile.companySize} *</Label>
                <select
                  id="company_size"
                  {...register('company_size')}
                  className={`w-full p-2 border rounded-md bg-background ${errors.company_size ? 'border-red-500' : ''}`}
                >
                  <option value="">{t.settings.companyProfile.selectCompanySize}</option>
                  {companySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.company_size && (
                  <p className="text-sm text-red-500">{errors.company_size.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{t.settings.companyProfile.website}</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder={t.settings.companyProfile.websitePlaceholder}
                  {...register('website')}
                  className={errors.website ? 'border-red-500' : ''}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t.settings.companyProfile.location}</Label>
              <Input
                id="location"
                placeholder={t.settings.companyProfile.locationPlaceholder}
                {...register('location')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">📝</span>
              {t.settings.companyProfile.businessDescriptionTitle}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.businessDescriptionDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="business_description">{t.settings.companyProfile.businessDescriptionLabel}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateAISuggestion('business_description')}
                  disabled={aiLoading.business_description}
                  className="h-7 text-xs"
                >
                  {aiLoading.business_description ? (
                    <>
                      <span className="mr-1 animate-spin">⏳</span>
                      {t.settings.companyProfile.aiGenerating}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      {t.settings.companyProfile.aiSuggestion}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="business_description"
                placeholder={t.settings.companyProfile.businessDescriptionPlaceholder}
                className={`min-h-[100px] ${errors.business_description ? 'border-red-500' : ''}`}
                {...register('business_description')}
              />
              {errors.business_description && (
                <p className="text-sm text-red-500">{errors.business_description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="target_audience">{t.settings.companyProfile.targetAudienceLabel}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateAISuggestion('target_audience')}
                  disabled={aiLoading.target_audience}
                  className="h-7 text-xs"
                >
                  {aiLoading.target_audience ? (
                    <>
                      <span className="mr-1 animate-spin">⏳</span>
                      {t.settings.companyProfile.aiGenerating}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      {t.settings.companyProfile.aiSuggestion}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="target_audience"
                placeholder={t.settings.companyProfile.targetAudiencePlaceholder}
                className={`min-h-[80px] ${errors.target_audience ? 'border-red-500' : ''}`}
                {...register('target_audience')}
              />
              {errors.target_audience && (
                <p className="text-sm text-red-500">{errors.target_audience.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="unique_selling_points">{t.settings.companyProfile.uniqueSellingPointsLabel}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateAISuggestion('unique_selling_points')}
                  disabled={aiLoading.unique_selling_points}
                  className="h-7 text-xs"
                >
                  {aiLoading.unique_selling_points ? (
                    <>
                      <span className="mr-1 animate-spin">⏳</span>
                      {t.settings.companyProfile.aiGenerating}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      {t.settings.companyProfile.aiSuggestion}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="unique_selling_points"
                placeholder={t.settings.companyProfile.uniqueSellingPointsPlaceholder}
                className={`min-h-[80px] ${errors.unique_selling_points ? 'border-red-500' : ''}`}
                {...register('unique_selling_points')}
              />
              {errors.unique_selling_points && (
                <p className="text-sm text-red-500">{errors.unique_selling_points.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🎯</span>
              {t.settings.companyProfile.socialMediaStrategyTitle}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.socialMediaStrategyDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="social_media_goals">{t.settings.companyProfile.socialMediaGoalsLabel}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateAISuggestion('social_media_goals')}
                  disabled={aiLoading.social_media_goals}
                  className="h-7 text-xs"
                >
                  {aiLoading.social_media_goals ? (
                    <>
                      <span className="mr-1 animate-spin">⏳</span>
                      {t.settings.companyProfile.aiGenerating}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      {t.settings.companyProfile.aiSuggestion}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="social_media_goals"
                placeholder={t.settings.companyProfile.socialMediaGoalsPlaceholder}
                className={`min-h-[80px] ${errors.social_media_goals ? 'border-red-500' : ''}`}
                {...register('social_media_goals')}
              />
              {errors.social_media_goals && (
                <p className="text-sm text-red-500">{errors.social_media_goals.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred_tone">{t.settings.companyProfile.preferredToneLabel}</Label>
              <select
                id="preferred_tone"
                {...register('preferred_tone')}
                className={`w-full p-2 border rounded-md bg-background ${errors.preferred_tone ? 'border-red-500' : ''}`}
              >
                <option value="">{t.settings.companyProfile.selectTone}</option>
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.preferred_tone && (
                <p className="text-sm text-red-500">{errors.preferred_tone.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content_topics">{t.settings.companyProfile.contentTopicsLabel}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => generateAISuggestion('content_topics')}
                    disabled={aiLoading.content_topics}
                    className="h-6 text-xs"
                  >
                    {aiLoading.content_topics ? (
                      <span className="mr-1 animate-spin">⏳</span>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    )}
                  </Button>
                </div>
                <Input
                  id="content_topics"
                  placeholder={t.settings.companyProfile.contentTopicsPlaceholder}
                  {...register('content_topics')}
                />
                <p className="text-xs text-muted-foreground">
                  {t.settings.companyProfile.contentTopicsHint}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keywords">{t.settings.companyProfile.keywordsLabel}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => generateAISuggestion('keywords')}
                    disabled={aiLoading.keywords}
                    className="h-6 text-xs"
                  >
                    {aiLoading.keywords ? (
                      <span className="mr-1 animate-spin">⏳</span>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    )}
                  </Button>
                </div>
                <Input
                  id="keywords"
                  placeholder={t.settings.companyProfile.keywordsPlaceholder}
                  {...register('keywords')}
                />
                <p className="text-xs text-muted-foreground">
                  {t.settings.companyProfile.keywordsHint}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avoid_topics">{t.settings.companyProfile.avoidTopicsLabel}</Label>
              <Input
                id="avoid_topics"
                placeholder={t.settings.companyProfile.avoidTopicsPlaceholder}
                {...register('avoid_topics')}
              />
              <p className="text-xs text-muted-foreground">
                {t.settings.companyProfile.avoidTopicsHint}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Generation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">⚙️</span>
              {t.settings.companyProfile.aiGenerationSettingsTitle}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.aiGenerationSettingsDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="posts_to_generate">
                {t.settings.companyProfile.postsToGenerateLabel} 
                <span className="text-muted-foreground text-xs ml-2">(1-30 arası)</span>
              </Label>
              <Input
                id="posts_to_generate"
                type="number"
                min={1}
                max={30}
                defaultValue={10}
                {...register('posts_to_generate', { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">
                {t.settings.companyProfile.postsToGenerateHint}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">👁️</span>
              {t.settings.companyProfile.previewTitle}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.previewDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{t.settings.companyProfile.previewCompany}</Badge>
                <span>{watch('company_name') || t.settings.companyProfile.previewNotShown}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{t.settings.companyProfile.previewIndustry}</Badge>
                <span>{industryOptions.find(opt => opt.value === watch('industry'))?.label || t.settings.companyProfile.previewNotSelected}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{t.settings.companyProfile.previewTone}</Badge>
                <span>{toneOptions.find(opt => opt.value === watch('preferred_tone'))?.label || t.settings.companyProfile.previewNotSelected}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{t.settings.companyProfile.previewTopics}</Badge>
                <span>{watch('content_topics') || t.settings.companyProfile.previewNotShown}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        {/* Brand Analysis Display */}
        {showBrandAnalysis && brandAnalysis && (
          <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">✨</span>
                {t.settings.companyProfile.brandAnalysisTitle}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={editingColors ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditingColors(!editingColors)}
                >
                  {editingColors ? '✓ Bitir' : '🎨 Rəngləri Redaktə Et'}
                </Button>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
                  AI Yaradıldı
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Loqonuzdan əldə edilən brend məlumatları {editingColors && '(rəngləri dəyişdirin)'}
            </CardDescription>
          </CardHeader>
            <CardContent className="space-y-6">
              {/* Colors */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">🎨 Rənglər</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Primary Color */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Əsas Rəng</p>
                    <div className="flex items-center space-x-2">
                      {editingColors ? (
                        <>
                          <input
                            type="color"
                            value={brandAnalysis.primary_color}
                            onChange={(e) => updateBrandColor('primary_color', e.target.value)}
                            className="w-10 h-10 rounded border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={brandAnalysis.primary_color}
                            onChange={(e) => updateBrandColor('primary_color', e.target.value)}
                            className="flex-1 font-mono text-sm"
                            placeholder="#HEXCODE"
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="w-10 h-10 rounded border-2 border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: brandAnalysis.primary_color }}
                          />
                          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {brandAnalysis.primary_color}
                          </code>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Rəng Palitrası</p>
                    <div className="flex items-center space-x-1 flex-wrap gap-2">
                      {brandAnalysis.color_palette?.map((color: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-1">
                          {editingColors ? (
                            <div className="flex items-center space-x-1">
                              <input
                                type="color"
                                value={color}
                                onChange={(e) => updateBrandColor('color_palette', e.target.value, idx)}
                                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                              />
                              <Input
                                type="text"
                                value={color}
                                onChange={(e) => updateBrandColor('color_palette', e.target.value, idx)}
                                className="w-24 font-mono text-xs h-8"
                                placeholder="#HEX"
                              />
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>🎭 Dizayn Stili</Label>
                  <p className="text-sm">{brandAnalysis.design_style}</p>
                </div>
                <div className="space-y-2">
                  <Label>📋 Loqo Tipi</Label>
                  <p className="text-sm">{brandAnalysis.logo_type}</p>
                </div>
              </div>

              {/* Brand Personality */}
              <div className="space-y-2">
                <Label>💼 Brend Şəxsiyyəti</Label>
                <div className="flex flex-wrap gap-2">
                  {brandAnalysis.brand_personality?.map((trait: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-white dark:bg-gray-800">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Emotional Tone & Industry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>🎵 Emosional Ton</Label>
                  <p className="text-sm">{brandAnalysis.emotional_tone}</p>
                </div>
                <div className="space-y-2">
                  <Label>🏭 Sənaye İzlənimi</Label>
                  <p className="text-sm">{brandAnalysis.industry_vibe}</p>
                </div>
              </div>

              {/* Typography */}
              {brandAnalysis.font_style && (
                <div className="space-y-2">
                  <Label>🔤 Font Stili</Label>
                  <p className="text-sm">{brandAnalysis.font_style}</p>
                  {brandAnalysis.typography_suggestions && (
                    <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <p className="text-xs text-muted-foreground mb-2">Tipografiya Təklifləri:</p>
                      <p className="text-sm">
                        <strong>Başlıqlar:</strong> {brandAnalysis.typography_suggestions.headings}
                      </p>
                      <p className="text-sm">
                        <strong>Mətn:</strong> {brandAnalysis.typography_suggestions.body}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Brand Keywords */}
              <div className="space-y-2">
                <Label>🔑 Brend Açar Sözləri</Label>
                <div className="flex flex-wrap gap-2">
                  {brandAnalysis.brand_keywords?.map((keyword: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Complementary Colors */}
              {brandAnalysis.complementary_colors && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>🌈 Tamamlayıcı Rənglər</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateComplementaryColors}
                      disabled={aiLoading['complementary_colors'] || !brandAnalysis}
                      className="text-xs"
                    >
                      {aiLoading['complementary_colors'] ? (
                        <>⏳ AI yaradır...</>
                      ) : (
                        <>✨ AI ilə Yenidən Yarat</>
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    {brandAnalysis.complementary_colors.map((color: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-1">
                        {editingColors ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => updateBrandColor('complementary_colors', e.target.value, idx)}
                              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={color}
                              onChange={(e) => updateBrandColor('complementary_colors', e.target.value, idx)}
                              className="w-24 font-mono text-xs h-8"
                              placeholder="#HEX"
                            />
                          </div>
                        ) : (
                          <>
                            <div
                              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                            <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{color}</code>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Edit Note */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {editingColors 
                    ? '🎨 Rəngləri dəyişdirin və "Bitir" düyməsini basın. Dəyişikliklər avtomatik yadda saxlanacaq.'
                    : '💡 Bu məlumatlar avtomatik yaradılmışdır. Rəngləri dəyişmək üçün "Rəngləri Redaktə Et" düyməsini basın.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Branding Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🎨</span>
              {t.settings.companyProfile.brandingParamsTitle}
            </CardTitle>
            <CardDescription>
              {t.settings.companyProfile.brandingParamsDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Master Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="branding-enabled" className="text-base font-semibold">
                  {t.settings.companyProfile.automaticBrandingActive}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t.settings.companyProfile.automaticBrandingDesc}
                </p>
              </div>
              <Switch
                id="branding-enabled"
                checked={brandingEnabled}
                onCheckedChange={(checked) => {
                  console.log('🔘 Branding toggle clicked:', checked);
                  setBrandingEnabled(checked);
                  setValue('branding_enabled', checked, { shouldValidate: true });
                }}
                disabled={isLoading}
              />
            </div>

            {brandingEnabled && (
              <>
                {/* Logo Upload Reminder */}
                {!logoPreview && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {t.settings.companyProfile.brandingRequiresLogo}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Slogan Input (Branding - with on/off toggle) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="slogan">{t.settings.companyProfile.sloganLabel}</Label>
                      <Switch
                        checked={watch('slogan_enabled') ?? true}
                        onCheckedChange={(checked) => setValue('slogan_enabled', checked)}
                      />
                      <span className="text-xs text-muted-foreground">
                        {watch('slogan_enabled') ? t.settings.companyProfile.sloganEnabledOn : t.settings.companyProfile.sloganEnabledOff}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateSlogan}
                      disabled={!watch('slogan_enabled') || aiLoading['slogan'] || !getValues('company_name')}
                      className="text-xs"
                    >
                      {aiLoading['slogan'] ? (
                        <>{t.settings.companyProfile.aiGenerating}</>
                      ) : (
                        <>{t.settings.companyProfile.aiSuggestion}</>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="slogan"
                    placeholder={t.settings.companyProfile.sloganPlaceholder}
                    maxLength={200}
                    {...register('slogan')}
                    disabled={!watch('slogan_enabled')}
                    className={errors.slogan ? 'border-red-500' : ''}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {watch('slogan_enabled') ? t.settings.companyProfile.sloganEnabledDesc : t.settings.companyProfile.sloganEnabledDesc.replace('görünəcək', 'görünməyəcək')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {watch('slogan')?.length || 0}/200 {t.settings.companyProfile.sloganChars}
                    </p>
                  </div>
                  {errors.slogan && (
                    <p className="text-sm text-red-500">{errors.slogan.message}</p>
                  )}
                </div>

                {/* Branding Mode Selector */}
                <div className="space-y-3 border-t pt-4">
                  <Label>{t.settings.companyProfile.brandingMode}</Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setBrandingMode('standard');
                        setLogoPosition('top-center');
                        setSloganPosition('bottom-center');
                        setLogoSizePercent(13);
                      }}
                      className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                        brandingMode === 'standard'
                          ? 'border-primary bg-primary/10 dark:bg-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">⭐</span>
                        <span className="text-sm font-medium">{t.settings.companyProfile.standard}</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBrandingMode('custom')}
                      className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                        brandingMode === 'custom'
                          ? 'border-primary bg-primary/10 dark:bg-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl">🎨</span>
                        <span className="text-sm font-medium">{t.settings.companyProfile.custom}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {brandingMode === 'standard' ? (
                  /* Standard Branding Settings */
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg">⭐</span>
                      <Label className="text-base font-semibold">{t.settings.companyProfile.standardBrandingParams}</Label>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t.settings.companyProfile.logoPosition}</span>
                        <span className="font-medium">{t.settings.companyProfile.logoPositionStandard}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t.settings.companyProfile.sloganPosition}</span>
                        <span className="font-medium">{t.settings.companyProfile.sloganPositionStandard}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t.settings.companyProfile.logoSize}</span>
                        <span className="font-medium">{t.settings.companyProfile.logoSizeStandard}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t.settings.companyProfile.gradient}</span>
                        <span className="font-medium">{t.settings.companyProfile.gradientStandard}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {t.settings.companyProfile.standardModeNote}
                    </p>
                  </div>
                ) : (
                  /* Custom Branding Settings */
                  <div className="space-y-6">
                    {/* Logo Position Selector */}
                    <div className="space-y-3">
                      <Label>{t.settings.companyProfile.logoPositionLabel}</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'top-left', label: t.settings.companyProfile.logoPositionTopLeft, icon: '↖️' },
                          { value: 'top-center', label: t.settings.companyProfile.logoPositionTopCenter, icon: '⬆️' },
                          { value: 'top-right', label: t.settings.companyProfile.logoPositionTopRight, icon: '↗️' },
                          { value: 'bottom-left', label: t.settings.companyProfile.logoPositionBottomLeft, icon: '↙️' },
                          { value: 'bottom-center', label: t.settings.companyProfile.logoPositionBottomCenter, icon: '⬇️' },
                          { value: 'bottom-right', label: t.settings.companyProfile.logoPositionBottomRight, icon: '↘️' },
                        ].map((pos) => (
                          <button
                            key={pos.value}
                            type="button"
                            onClick={() => setLogoPosition(pos.value as any)}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              logoPosition === pos.value
                                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-xl">{pos.icon}</span>
                              <span className="text-xs font-medium">{pos.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.settings.companyProfile.logoPositionHint}
                      </p>
                    </div>

                    {/* Slogan Position Selector */}
                    <div className="space-y-3">
                      <Label>{t.settings.companyProfile.sloganPositionLabel}</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'top-center', label: t.settings.companyProfile.sloganPositionTopCenter, icon: '⬆️' },
                          { value: 'bottom-center', label: t.settings.companyProfile.sloganPositionBottomCenter, icon: '⬇️' },
                        ].map((pos) => (
                          <button
                            key={pos.value}
                            type="button"
                            onClick={() => setSloganPosition(pos.value as any)}
                            className={`p-4 border-2 rounded-lg transition-all ${
                              sloganPosition === pos.value
                                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <span className="text-2xl">{pos.icon}</span>
                              <span className="text-sm font-medium">{pos.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.settings.companyProfile.sloganPositionHint}
                      </p>
                    </div>

                    {/* Logo Size Slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{t.settings.companyProfile.logoSizeLabel}</Label>
                        <span className="text-sm font-semibold text-primary">
                          {logoSizePercent}%
                        </span>
                      </div>
                      <div className="px-2">
                        <Slider
                          value={[logoSizePercent]}
                          onValueChange={(value) => setLogoSizePercent(value[0])}
                          min={2}
                          max={25}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{t.settings.companyProfile.logoSizeSmall}</span>
                        <span className="font-medium">{t.settings.companyProfile.logoSizeMedium}</span>
                        <span>{t.settings.companyProfile.logoSizeLarge}</span>
                      </div>
                    </div>

                    {/* Slogan Size Slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>{t.settings.companyProfile.sloganSizeLabel}</Label>
                        <span className="text-sm font-semibold text-primary">
                          {sloganSizePercent}%
                        </span>
                      </div>
                      <div className="px-2">
                        <Slider
                          value={[sloganSizePercent]}
                          onValueChange={(value) => setSloganSizePercent(value[0])}
                          min={2}
                          max={8}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{t.settings.companyProfile.sloganSizeSmall}</span>
                        <span className="font-medium">{t.settings.companyProfile.sloganSizeMedium}</span>
                        <span>{t.settings.companyProfile.sloganSizeLarge}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Note */}
                {logoPreview && (
                  <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                      💡 Brending parametrləri yadda saxlanıldıqdan sonra yeni yaradılan AI şəkillərinə avtomatik tətbiq ediləcək.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-center pb-8 pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="px-8"
            onClick={(e) => {
              console.log('🖱️ Button clicked');
              console.log('🔒 Button disabled:', isLoading);
              console.log('📊 Form errors:', errors);
              console.log('📋 Form errors count:', Object.keys(errors).length);
              
              // Don't prevent default - let form submit handle validation
              if (Object.keys(errors).length > 0) {
                console.log('⚠️ Validation errors exist, form will not submit');
              }
            }}
          >
            {isLoading ? (
              <>
                <span className="mr-2">⏳</span>
                Yadda saxlanılır...
              </>
            ) : (
              <>
                <span className="mr-2">💾</span>
                {existingProfile ? 'Profili Yenilə' : 'Yadda Saxla və Davam Et'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}




