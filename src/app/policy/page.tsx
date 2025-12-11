'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PolicyPage() {
  return (
    <DashboardLayout 
      title="Gizlilik Siyasəti"
      description="Timera gizlilik siyasəti və məlumatların qorunması"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gizlilik Siyasəti</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Məlumatların Toplanması</h2>
                <p className="text-muted-foreground">
                  Timera platforması istifadəçilərdən aşağıdakı məlumatları toplayır:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Şəxsi məlumatlar (ad, soyad, e-poçt ünvanı)</li>
                  <li>Şirkət məlumatları (şirkət adı, sənaye, ölçü)</li>
                  <li>Profil məlumatları və tənzimləmələr</li>
                  <li>Yaradılan məzmun və paylaşımlar</li>
                  <li>Qoşulmuş sosial media hesabları</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Məlumatların İstifadəsi</h2>
                <p className="text-muted-foreground">
                  Toplanan məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Xidmətlərin təmin edilməsi və yaxşılaşdırılması</li>
                  <li>AI məzmun yaradılması və personalizasiya</li>
                  <li>İstifadəçi hesabının idarə edilməsi</li>
                  <li>Texniki dəstək və müştəri xidmətləri</li>
                  <li>Qanuni tələblərin yerinə yetirilməsi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Məlumatların Paylaşılması</h2>
                <p className="text-muted-foreground">
                  Məlumatlarınızı üçüncü tərəflərlə yalnız aşağıdakı hallarda paylaşırıq:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Xidmət təminatçıları (bulud hosting, ödəniş sistemləri)</li>
                  <li>AI xidmət təminatçıları (məzmun yaradılması üçün)</li>
                  <li>Qanuni tələblər və məhkəmə qərarları</li>
                  <li>İstifadəçinin açıq razılığı ilə</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Məlumatların Qorunması</h2>
                <p className="text-muted-foreground">
                  Məlumatlarınızın təhlükəsizliyini təmin etmək üçün:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Şifrələnmiş əlaqələr (HTTPS/SSL) istifadə edirik</li>
                  <li>Məlumatlar təhlükəsiz serverlərdə saxlanılır</li>
                  <li>Mütəmadi təhlükəsizlik yoxlamaları aparılır</li>
                  <li>Məhdud giriş və yetkiləndirmə sistemi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. İstifadəçi Hüquqları</h2>
                <p className="text-muted-foreground">
                  İstifadəçilər aşağıdakı hüquqlara malikdir:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Şəxsi məlumatlarına daxil olmaq</li>
                  <li>Məlumatların düzəldilməsini tələb etmək</li>
                  <li>Məlumatların silinməsini tələb etmək</li>
                  <li>Məlumatların işlənməsinə etiraz etmək</li>
                  <li>Məlumatların köçürülməsini tələb etmək</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Cookie-lər</h2>
                <p className="text-muted-foreground">
                  Platforma istifadəçi təcrübəsini yaxşılaşdırmaq üçün cookie-lər istifadə edir. 
                  Cookie-lər sessiya idarəetməsi, təhlükəsizlik və analitika məqsədləri üçün istifadə olunur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Dəyişikliklər</h2>
                <p className="text-muted-foreground">
                  Bu gizlilik siyasəti vaxtaşırı yenilənə bilər. Əhəmiyyətli dəyişikliklər haqqında 
                  istifadəçilər e-poçt vasitəsilə məlumatlandırılacaq.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Əlaqə</h2>
                <p className="text-muted-foreground">
                  Gizlilik siyasəti ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:
                </p>
                <p className="text-muted-foreground">
                  E-poçt: privacy@timera.az
                </p>
              </section>

              <div className="text-sm text-muted-foreground pt-4 border-t">
                <p>Son yenilənmə: {new Date().toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

