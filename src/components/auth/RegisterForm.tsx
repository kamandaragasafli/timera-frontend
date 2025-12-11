'use client';

import { useState, useEffect } from 'react';
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

// Password strength calculator
const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: '', color: '' };
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 10;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 15;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 15;
  
  // Contains numbers
  if (/[0-9]/.test(password)) strength += 15;
  
  // Contains special characters
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20;
  
  let label = '';
  let color = '';
  
  if (strength < 30) {
    label = 'Zəif';
    color = 'bg-red-500';
  } else if (strength < 60) {
    label = 'Orta';
    color = 'bg-yellow-500';
  } else if (strength < 80) {
    label = 'Yaxşı';
    color = 'bg-blue-500';
  } else {
    label = 'Güclü';
    color = 'bg-green-500';
  }
  
  return { strength, label, color };
};

const registerSchema = z.object({
  email: z.string().email('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin'),
  password: z.string().min(8, 'Şifrə ən azı 8 simvol olmalıdır'),
  confirmPassword: z.string(),
  first_name: z.string().min(1, 'Ad tələb olunur'),
  last_name: z.string().min(1, 'Soyad tələb olunur'),
  company_name: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifrələr uyğun gəlmir",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: '', color: '' });
  const [passwordMismatch, setPasswordMismatch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Watch password and confirmPassword fields
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Update password strength indicator
  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength({ strength: 0, label: '', color: '' });
    }
  }, [password]);

  // Check if passwords match in real-time
  useEffect(() => {
    if (confirmPassword && password) {
      if (password !== confirmPassword) {
        setPasswordMismatch('Şifrələr uyğun gəlmir');
      } else {
        setPasswordMismatch('');
      }
    } else {
      setPasswordMismatch('');
    }
  }, [password, confirmPassword]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...restData } = data;
      // Send confirm_password to backend and use email as username
      const userData = {
        ...restData,
        username: restData.email, // Use email as username
        confirm_password: confirmPassword,
      };
      await registerUser(userData);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || '';
      
      // Handle specific errors in Azerbaijan
      if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('exist')) {
        setError('Bu e-poçt ünvanı artıq istifadə olunur');
      } else {
        setError('Qeydiyyat uğursuz oldu. Zəhmət olmasa yenidən cəhd edin');
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
              Hesab Yaradın
            </CardTitle>
            <CardDescription className="text-center">
              Timera ilə işə başlayın
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Ad</Label>
                  <Input
                    id="first_name"
                    placeholder="Adınız"
                    {...register('first_name')}
                    className={errors.first_name ? 'border-red-500' : ''}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500">{errors.first_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Soyad</Label>
                  <Input
                    id="last_name"
                    placeholder="Soyadınız"
                    {...register('last_name')}
                    className={errors.last_name ? 'border-red-500' : ''}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-poçt</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="epoct@numune.az"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name">Şirkət Adı (İstəyə Bağlı)</Label>
                <Input
                  id="company_name"
                  placeholder="Şirkətinizin adı"
                  {...register('company_name')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifrə</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrə yaradın"
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
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Şifrə gücü:</span>
                      <span className={`font-medium ${
                        passwordStrength.strength < 30 ? 'text-red-500' :
                        passwordStrength.strength < 60 ? 'text-yellow-500' :
                        passwordStrength.strength < 80 ? 'text-blue-500' :
                        'text-green-500'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      İpucu: Böyük və kiçik hərflər, rəqəmlər və xüsusi simvollar istifadə edin
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifrəni Təsdiq Et</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Şifrəni təkrar daxil edin"
                    {...register('confirmPassword')}
                    className={errors.confirmPassword || passwordMismatch ? 'border-red-500 pr-10' : confirmPassword && !passwordMismatch ? 'border-green-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? (
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
                {/* Real-time password mismatch error */}
                {passwordMismatch && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {passwordMismatch}
                  </p>
                )}
                {/* Show success when passwords match */}
                {confirmPassword && !passwordMismatch && password && (
                  <p className="text-sm text-green-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Şifrələr uyğundur
                  </p>
                )}
                {/* Form validation error */}
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Hesab yaradılır...' : 'Qeydiyyatdan Keç'}
              </Button>
            </form>

            <Separator />

            <div className="text-center text-sm">
              <span className="text-gray-600">Artıq hesabınız var? </span>
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Daxil Ol
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
