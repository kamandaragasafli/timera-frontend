'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PolicyPage() {
  const { language } = useLanguage();
  const isEng = language === 'eng';
  const isRus = language === 'rus';

  return (
    <DashboardLayout 
      title={isEng ? "Privacy Policy" : isRus ? "Политика конфиденциальности" : "Gizlilik Siyasəti"}
      description={isEng ? "Timera privacy policy and data protection" : isRus ? "Политика конфиденциальности Timera и защита данных" : "Timera gizlilik siyasəti və məlumatların qorunması"}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEng ? "Privacy Policy" : isRus ? "Политика конфиденциальности" : "Gizlilik Siyasəti"}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "1. Information We Collect" : isRus ? "1. Информация, которую мы собираем" : "1. Məlumatların Toplanması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "Timera platform collects the following information from users:"
                    : isRus
                    ? "Платформа Timera собирает следующую информацию от пользователей:"
                    : "Timera platforması istifadəçilərdən aşağıdakı məlumatları toplayır:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Personal information (name, surname, email address)" : isRus ? "Личная информация (имя, фамилия, адрес электронной почты)" : "Şəxsi məlumatlar (ad, soyad, e-poçt ünvanı)"}</li>
                  <li>{isEng ? "Company information (company name, industry, size)" : isRus ? "Информация о компании (название компании, отрасль, размер)" : "Şirkət məlumatları (şirkət adı, sənaye, ölçü)"}</li>
                  <li>{isEng ? "Profile information and settings" : isRus ? "Информация профиля и настройки" : "Profil məlumatları və tənzimləmələr"}</li>
                  <li>{isEng ? "Created content and posts" : isRus ? "Созданный контент и посты" : "Yaradılan məzmun və paylaşımlar"}</li>
                  <li>{isEng ? "Connected social media accounts (only access tokens, encrypted)" : isRus ? "Подключенные аккаунты социальных сетей (только токены доступа, зашифрованные)" : "Qoşulmuş sosial media hesabları (yalnız giriş tokenləri, şifrələnmiş)"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "2. How We Use Your Information" : isRus ? "2. Как мы используем вашу информацию" : "2. Məlumatların İstifadəsi"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "The collected information is used for the following purposes:"
                    : isRus
                    ? "Собранная информация используется для следующих целей:"
                    : "Toplanan məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Providing and improving services" : isRus ? "Предоставление и улучшение услуг" : "Xidmətlərin təmin edilməsi və yaxşılaşdırılması"}</li>
                  <li>{isEng ? "AI-assisted content generation (user review and approval required)" : isRus ? "Генерация контента с помощью ИИ (требуется проверка и одобрение пользователем)" : "AI məzmun yaradılması (istifadəçinin yoxlanması və təsdiqi tələb olunur)"}</li>
                  <li>{isEng ? "Managing user accounts" : isRus ? "Управление аккаунтами пользователей" : "İstifadəçi hesabının idarə edilməsi"}</li>
                  <li>{isEng ? "Technical support and customer service" : isRus ? "Техническая поддержка и обслуживание клиентов" : "Texniki dəstək və müştəri xidmətləri"}</li>
                  <li>{isEng ? "Compliance with legal requirements" : isRus ? "Соблюдение юридических требований" : "Qanuni tələblərin yerinə yetirilməsi"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "3. How We Share Your Information" : isRus ? "3. Как мы делимся вашей информацией" : "3. Məlumatların Paylaşılması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "We share your information with third parties only in the following cases:"
                    : isRus
                    ? "Мы делимся вашей информацией с третьими сторонами только в следующих случаях:"
                    : "Məlumatlarınızı üçüncü tərəflərlə yalnız aşağıdakı hallarda paylaşırıq:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Service providers (cloud hosting, payment systems)" : isRus ? "Поставщики услуг (облачный хостинг, платежные системы)" : "Xidmət təminatçıları (bulud hosting, ödəniş sistemləri)"}</li>
                  <li>{isEng ? "AI service providers (for content generation - OpenAI, Ideogram)" : isRus ? "Поставщики услуг ИИ (для генерации контента - OpenAI, Ideogram)" : "AI xidmət təminatçıları (məzmun yaradılması üçün - OpenAI, Ideogram)"}</li>
                  <li>{isEng ? "Meta/Facebook/Instagram (only when you explicitly connect and approve actions)" : isRus ? "Meta/Facebook/Instagram (только когда вы явно подключаете и одобряете действия)" : "Meta/Facebook/Instagram (yalnız siz açıq şəkildə qoşulub əməliyyatları təsdiq etdikdə)"}</li>
                  <li>{isEng ? "Legal requirements and court orders" : isRus ? "Юридические требования и судебные решения" : "Qanuni tələblər və məhkəmə qərarları"}</li>
                  <li>{isEng ? "With your explicit consent" : isRus ? "С вашего явного согласия" : "İstifadəçinin açıq razılığı ilə"}</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  <strong>
                    {isEng
                      ? "⚠️ Important: We NEVER share your social media credentials or passwords. Only encrypted access tokens are stored."
                      : isRus
                      ? "⚠️ Важно: Мы НИКОГДА не передаем ваши учетные данные или пароли социальных сетей. Хранятся только зашифрованные токены доступа."
                      : "⚠️ Vacib: Sosial media hesablarınızın giriş məlumatlarını və ya şifrələrini HEÇ VAXT paylaşmırıq. Yalnız şifrələnmiş giriş tokenləri saxlanılır."}
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "4. Data Security" : isRus ? "4. Безопасность данных" : "4. Məlumatların Qorunması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "To ensure the security of your information:"
                    : isRus
                    ? "Для обеспечения безопасности вашей информации:"
                    : "Məlumatlarınızın təhlükəsizliyini təmin etmək üçün:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "We use encrypted connections (HTTPS/SSL)" : isRus ? "Мы используем зашифрованные соединения (HTTPS/SSL)" : "Şifrələnmiş əlaqələr (HTTPS/SSL) istifadə edirik"}</li>
                  <li>{isEng ? "Data is stored on secure servers" : isRus ? "Данные хранятся на защищенных серверах" : "Məlumatlar təhlükəsiz serverlərdə saxlanılır"}</li>
                  <li>{isEng ? "Regular security audits are performed" : isRus ? "Проводятся регулярные проверки безопасности" : "Mütəmadi təhlükəsizlik yoxlamaları aparılır"}</li>
                  <li>{isEng ? "Limited access and authorization system" : isRus ? "Система ограниченного доступа и авторизации" : "Məhdud giriş və yetkiləndirmə sistemi"}</li>
                  <li>{isEng ? "All social media tokens are encrypted at rest and in transit" : isRus ? "Все токены социальных сетей шифруются при хранении и передаче" : "Bütün sosial media tokenləri saxlanılarkən və ötürülərkən şifrələnir"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "5. User Rights & Control" : isRus ? "5. Права и контроль пользователя" : "5. İstifadəçi Hüquqları və Nəzarəti"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "Users have the following rights:"
                    : isRus
                    ? "Пользователи имеют следующие права:"
                    : "İstifadəçilər aşağıdakı hüquqlara malikdir:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Access your personal information" : isRus ? "Доступ к вашей личной информации" : "Şəxsi məlumatlarınıza daxil olmaq"}</li>
                  <li>{isEng ? "Request correction of your information" : isRus ? "Запросить исправление вашей информации" : "Məlumatların düzəldilməsini tələb etmək"}</li>
                  <li>{isEng ? "Request deletion of your information" : isRus ? "Запросить удаление вашей информации" : "Məlumatların silinməsini tələb etmək"}</li>
                  <li>{isEng ? "Object to processing of your information" : isRus ? "Возразить против обработки вашей информации" : "Məlumatların işlənməsinə etiraz etmək"}</li>
                  <li>{isEng ? "Request data portability" : isRus ? "Запросить переносимость данных" : "Məlumatların köçürülməsini tələb etmək"}</li>
                  <li>{isEng ? "Disconnect social media accounts at any time" : isRus ? "Отключить аккаунты социальных сетей в любое время" : "İstənilən vaxt sosial media hesablarını ayırmaq"}</li>
                  <li>{isEng ? "Revoke permissions granted to Timera" : isRus ? "Отозвать разрешения, предоставленные Timera" : "Timera-ya verilmiş icazələri ləğv etmək"}</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  <strong>
                    {isEng
                      ? "You maintain full control over your social media accounts and can revoke access at any time through your Facebook/Instagram settings or our platform."
                      : isRus
                      ? "Вы сохраняете полный контроль над своими аккаунтами социальных сетей и можете отозвать доступ в любое время через настройки Facebook/Instagram или нашу платформу."
                      : "Sosial media hesablarınız üzərində tam nəzarət sizə məxsusdur və istənilən vaxt Facebook/Instagram tənzimləmələri və ya platformamız vasitəsilə girişi ləğv edə bilərsiniz."}
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "6. Data Retention" : isRus ? "6. Хранение данных" : "6. Məlumatların Saxlanması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "We retain your information as follows:"
                    : isRus
                    ? "Мы храним вашу информацию следующим образом:"
                    : "Məlumatlarınızı aşağıdakı kimi saxlayırıq:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Account data: Until account deletion" : isRus ? "Данные аккаунта: До удаления аккаунта" : "Hesab məlumatları: Hesab silinənə qədər"}</li>
                  <li>{isEng ? "Posts and content: Until you delete them or your account" : isRus ? "Посты и контент: Пока вы не удалите их или свой аккаунт" : "Postlar və məzmun: Siz silənə və ya hesabınız silinənə qədər"}</li>
                  <li>{isEng ? "Rejected posts: Retained for 30 days, then automatically deleted" : isRus ? "Отклоненные посты: Хранятся 30 дней, затем автоматически удаляются" : "Rədd edilmiş postlar: 30 gün saxlanılır, sonra avtomatik silinir"}</li>
                  <li>{isEng ? "Access tokens: Immediately deleted when you disconnect an account" : isRus ? "Токены доступа: Немедленно удаляются при отключении аккаунта" : "Giriş tokenləri: Hesabı ayırdıqda dərhal silinir"}</li>
                  <li>{isEng ? "Analytics data: Aggregated and anonymized for 90 days" : isRus ? "Данные аналитики: Агрегированы и анонимизированы в течение 90 дней" : "Analitika məlumatları: 90 gün üçün təmizlənmiş və anonim"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "7. Cookies" : isRus ? "7. Cookies" : "7. Cookie-lər"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "The platform uses cookies to improve user experience. Cookies are used for session management, security, and analytics purposes."
                    : isRus
                    ? "Платформа использует cookies для улучшения пользовательского опыта. Cookies используются для управления сеансами, безопасности и аналитики."
                    : "Platforma istifadəçi təcrübəsini yaxşılaşdırmaq üçün cookie-lər istifadə edir. Cookie-lər sessiya idarəetməsi, təhlükəsizlik və analitika məqsədləri üçün istifadə olunur."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "8. Third-Party Services" : isRus ? "8. Сторонние сервисы" : "8. Üçüncü Tərəf Xidmətləri"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "Timera integrates with third-party services:"
                    : isRus
                    ? "Timera интегрируется со сторонними сервисами:"
                    : "Timera üçüncü tərəf xidmətləri ilə inteqrasiya edir:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Meta/Facebook/Instagram: For social media management (subject to their privacy policies)" : isRus ? "Meta/Facebook/Instagram: Для управления социальными сетями (в соответствии с их политикой конфиденциальности)" : "Meta/Facebook/Instagram: Sosial media idarəetməsi üçün (onların gizlilik siyasətlərinə tabe)"}</li>
                  <li>{isEng ? "OpenAI: For AI content generation (data not used for model training)" : isRus ? "OpenAI: Для генерации контента ИИ (данные не используются для обучения модели)" : "OpenAI: AI məzmun yaradılması üçün (məlumatlar model təlimi üçün istifadə olunmur)"}</li>
                  <li>{isEng ? "Ideogram/Fal.ai: For image generation" : isRus ? "Ideogram/Fal.ai: Для генерации изображений" : "Ideogram/Fal.ai: Şəkil yaradılması üçün"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "9. Changes" : isRus ? "9. Изменения" : "9. Dəyişikliklər"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "This privacy policy may be updated from time to time. Users will be notified via email about significant changes."
                    : isRus
                    ? "Эта политика конфиденциальности может время от времени обновляться. Пользователи будут уведомлены по электронной почте о значительных изменениях."
                    : "Bu gizlilik siyasəti vaxtaşırı yenilənə bilər. Əhəmiyyətli dəyişikliklər haqqında istifadəçilər e-poçt vasitəsilə məlumatlandırılacaq."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "10. Contact" : isRus ? "10. Контакты" : "10. Əlaqə"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "For privacy-related questions, contact us at:" : isRus ? "По вопросам конфиденциальности свяжитесь с нами:" : "Gizlilik siyasəti ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:"}
                </p>
                <p className="text-muted-foreground">
                  {isEng ? "Email: privacy@timera.az" : isRus ? "Email: privacy@timera.az" : "E-poçt: privacy@timera.az"}
                </p>
              </section>

              <div className="text-sm text-muted-foreground pt-4 border-t">
                <p>
                  {isEng ? "Last updated:" : isRus ? "Последнее обновление:" : "Son yenilənmə:"} {new Date().toLocaleDateString(isEng ? 'en-US' : isRus ? 'ru-RU' : 'az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
