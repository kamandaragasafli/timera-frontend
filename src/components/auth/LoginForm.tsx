'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin'),
  password: z.string().min(1, 'Şifrə tələb olunur'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      // Log error for debugging (remove in production)
      console.error('Login error:', err);
      console.error('Error message:', err.message);
      
      // Handle different error types with specific messages in Azerbaijan
      const errorMessage = (err.message || '').toLowerCase();
      
      // Most authentication errors (wrong password, user not found) return similar messages
      // Check for authentication/credentials errors (401 status or specific keywords)
      if (errorMessage.includes('credentials') || 
          errorMessage.includes('invalid') || 
          errorMessage.includes('incorrect') ||
          errorMessage.includes('wrong') ||
          errorMessage.includes('no active account') ||
          errorMessage.includes('authentication') ||
          errorMessage.includes('unauthorized') ||
          errorMessage === 'login failed') {
        setError('E-poçt və ya şifrə yanlışdır');
      } 
      // Check for user not found (less common, as most backends hide this for security)
      else if (errorMessage.includes('not found') || 
               errorMessage.includes('does not exist') ||
               errorMessage.includes('user does not exist')) {
        setError('Bu e-poçt ünvanı ilə istifadəçi tapılmadı');
      } 
      // Check for disabled account
      else if (errorMessage.includes('disabled') || 
               errorMessage.includes('inactive') ||
               errorMessage.includes('not active') ||
               errorMessage.includes('account is disabled')) {
        setError('Hesabınız deaktiv edilib. Zəhmət olmasa dəstək ilə əlaqə saxlayın');
      } 
      // Network or server errors
      else if (errorMessage.includes('network') || 
               errorMessage.includes('server') ||
               errorMessage.includes('connection') ||
               errorMessage.includes('timeout')) {
        setError('Serverlə əlaqə qurula bilmədi. İnternet bağlantınızı yoxlayın');
      }
      // Default error - also treat as credentials error for security
      else {
        setError('E-poçt və ya şifrə yanlışdır');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Theme Toggle - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Timera-ya Daxil Olun
            </CardTitle>
            <CardDescription className="text-center">
              Hesabınıza daxil olmaq üçün e-poçt və şifrənizi daxil edin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-poçt</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-poçt ünvanınızı daxil edin"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifrə</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrənizi daxil edin"
                    {...register('password')}
                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Daxil olunur...' : 'Daxil Ol'}
              </Button>
            </form>

            <Separator />

            <div className="text-center text-sm">
              <span className="text-gray-600">Hesabınız yoxdur? </span>
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Qeydiyyatdan keçin
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
