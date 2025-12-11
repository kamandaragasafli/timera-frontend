'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <DashboardLayout 
      title="İstifadə Şərtləri"
      description="Timera platformasının istifadə şərtləri və qaydaları"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>İstifadə Şərtləri</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Qəbul və Razılıq</h2>
                <p className="text-muted-foreground">
                  Timera platformasına qoşulmaqla və istifadə etməklə, bu istifadə şərtlərini 
                  qəbul etmiş olursunuz. Əgər bu şərtlərlə razılaşmırsınızsa, platformadan 
                  istifadə etməyin.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Hesab Tələbləri</h2>
                <p className="text-muted-foreground">
                  Platformadan istifadə etmək üçün:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>18 yaş və ya daha böyük olmalısınız</li>
                  <li>Düzgün və dəqiq məlumatlar təqdim etməlisiniz</li>
                  <li>Hesab məlumatlarınızı məxfi saxlamaq məsuliyyətinizdir</li>
                  <li>Hesabınızın altında baş verən bütün fəaliyyətlərə cavabdehsiniz</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Xidmətlərin İstifadəsi</h2>
                <p className="text-muted-foreground">
                  Platforma aşağıdakı xidmətləri təmin edir:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>AI ilə məzmun yaradılması</li>
                  <li>Sosial media paylaşımlarının planlaşdırılması</li>
                  <li>Çoxsaylı platformalara paylaşım</li>
                  <li>Analitika və performans izləmə</li>
                  <li>Reklam kampaniyalarının idarə edilməsi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Məzmun Məsuliyyəti</h2>
                <p className="text-muted-foreground">
                  Platformada yaratdığınız və paylaşdığınız məzmun üçün tam məsuliyyət daşıyırsınız:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Məzmun qanuni və etik standartlara uyğun olmalıdır</li>
                  <li>Müəllif hüquqlarına və intellektual mülkiyyətə hörmət edilməlidir</li>
                  <li>Zərərli, təhqiredici və ya qanunsuz məzmun yarada bilməzsiniz</li>
                  <li>Üçüncü tərəflərin hüquqlarını pozmamalısınız</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Qadağan Olunmuş Fəaliyyətlər</h2>
                <p className="text-muted-foreground">
                  Aşağıdakı fəaliyyətlər qadağandır:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Platformanın təhlükəsizliyini pozmaq və ya sistemə zərər vermək</li>
                  <li>Digər istifadəçilərin hesablarına yetkisiz giriş</li>
                  <li>Spam, fırıldaq və ya yanıltıcı məzmun yaymaq</li>
                  <li>Avtomatlaşdırılmış sistemlərlə platformanı sui-istifadə etmək</li>
                  <li>Platformanın xidmətlərini kommersiya məqsədləri üçün yenidən satmaq</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Ödəniş və Abunəlik</h2>
                <p className="text-muted-foreground">
                  Bəzi xidmətlər ödəniş tələb edə bilər:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Abunəlik planları və qiymətlər platformada göstərilir</li>
                  <li>Ödənişlər avtomatik olaraq yenilənə bilər</li>
                  <li>Ləğv etmək istəyirsinizsə, abunəliyi ləğv edə bilərsiniz</li>
                  <li>Geri qaytarma siyasəti abunəlik planına görə dəyişir</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Mülkiyyət Hüquqları</h2>
                <p className="text-muted-foreground">
                  Platforma və onun məzmunu Timera-ya məxsusdur. Siz yaratdığınız məzmunun 
                  mülkiyyət hüququna maliksiniz, lakin platformanın xidmətlərindən istifadə 
                  etmək üçün bizə lisenziya verirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Xidmətin Dayandırılması</h2>
                <p className="text-muted-foreground">
                  Aşağıdakı hallarda hesabınız dayandırıla və ya ləğv edilə bilər:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>İstifadə şərtlərinin pozulması</li>
                  <li>Qanunsuz fəaliyyət</li>
                  <li>Uzun müddət istifadə olunmayan hesablar</li>
                  <li>Ödəniş problemləri</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Məsuliyyətin Məhdudlaşdırılması</h2>
                <p className="text-muted-foreground">
                  Platforma "olduğu kimi" təqdim olunur. Biz xidmətlərin fasiləsiz, 
                  təhlükəsiz və ya xətasız olacağını zəmanət vermirik. Platformadan 
                  istifadə nəticəsində yaranan itkilərə görə məsuliyyət daşımırıq.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Dəyişikliklər</h2>
                <p className="text-muted-foreground">
                  Bu istifadə şərtləri vaxtaşırı yenilənə bilər. Əhəmiyyətli dəyişikliklər 
                  haqqında istifadəçilər məlumatlandırılacaq. Dəyişikliklərdən sonra platformadan 
                  istifadəyə davam etməklə yeni şərtləri qəbul etmiş olursunuz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Əlaqə</h2>
                <p className="text-muted-foreground">
                  İstifadə şərtləri ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:
                </p>
                <p className="text-muted-foreground">
                  E-poçt: legal@timera.az
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

