'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';

export default function ProductScraperTestPage() {
  const [productUrl, setProductUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!productUrl) {
      setError('Məhsul URL-ini daxil edin');
      return;
    }
    
    if (!productUrl.startsWith('http://') && !productUrl.startsWith('https://')) {
      setError('URL http:// və ya https:// ilə başlamalıdır');
      return;
    }

    setIsProcessing(true);

    try {
      // Get auth token from localStorage (same key as api.ts uses)
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error('Auth token tapılmadı. Zəhmət olmasa login olun.');
      }
      
      const response = await fetch('http://localhost:8000/api/ai/product-post-from-url/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_url: productUrl,
          num_images: 1
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Məhsul məlumatları çəkilə bilmədi');
      }
      
      console.log('Product data:', data);
      setResult(data);
      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'Xəta baş verdi');
      console.error('Error:', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">🧪 E-commerce Scraper Test</h1>
          <p className="text-muted-foreground">
            Məhsul məlumatlarını test et (Apify E-commerce Scraper)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Məhsul URL</CardTitle>
              <CardDescription>
                E-commerce saytından məhsul linkini yapışdır
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product_url">Məhsul URL-i *</Label>
                <Input
                  id="product_url"
                  type="url"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://kontakt.az/ru/televizor-..."
                  disabled={isProcessing}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isProcessing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p className="font-medium">Məhsul məlumatları çəkilir...</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            disabled={!productUrl || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <LinkIcon className="mr-2 h-4 w-4" />
                Məhsul Məlumatlarını Çək
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-6">
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>Məhsul məlumatları uğurla çəkildi!</strong>
              </AlertDescription>
            </Alert>

            {/* Raw JSON Response */}
            <Card>
              <CardHeader>
                <CardTitle>Backend Response</CardTitle>
                <CardDescription>Full JSON response</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>

            {/* Parsed Product Data (if available) */}
            {result.product_data && (
              <Card>
                <CardHeader>
                  <CardTitle>Məhsul Məlumatları</CardTitle>
                  <CardDescription>Extracted product information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.product_data.name && (
                    <div>
                      <Label className="text-sm font-semibold">Ad</Label>
                      <p className="text-sm mt-1">{result.product_data.name}</p>
                    </div>
                  )}

                  {result.product_data.price && (
                    <div>
                      <Label className="text-sm font-semibold">Qiymət</Label>
                      <p className="text-sm mt-1">
                        {result.product_data.price} {result.product_data.currency || ''}
                      </p>
                    </div>
                  )}

                  {result.product_data.brand && (
                    <div>
                      <Label className="text-sm font-semibold">Brend</Label>
                      <p className="text-sm mt-1">
                        {typeof result.product_data.brand === 'object' 
                          ? result.product_data.brand.slogan || result.product_data.brand.name || JSON.stringify(result.product_data.brand)
                          : result.product_data.brand}
                      </p>
                    </div>
                  )}

                  {result.product_data.image && (
                    <div>
                      <Label className="text-sm font-semibold">Şəkil</Label>
                      <div className="mt-2">
                        <img 
                          src={result.product_data.image} 
                          alt="Product" 
                          className="max-w-xs rounded-lg border"
                        />
                      </div>
                    </div>
                  )}

                  {result.product_data.description && (
                    <div>
                      <Label className="text-sm font-semibold">Təsvir</Label>
                      <p className="text-sm mt-1 line-clamp-5">{result.product_data.description}</p>
                    </div>
                  )}

                  {result.product_data.url && (
                    <div>
                      <Label className="text-sm font-semibold">URL</Label>
                      <a 
                        href={result.product_data.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm mt-1 text-blue-600 hover:underline block truncate"
                      >
                        {result.product_data.url}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => {
                setResult(null);
                setProductUrl('');
              }}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Yeni Test
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

