'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();
  const isEng = language === 'eng';
  const isRus = language === 'rus';

  return (
    <DashboardLayout 
      title={isEng ? "Terms of Service" : isRus ? "Условия использования" : "İstifadə Şərtləri"}
      description={isEng ? "Timera platform terms of service and rules" : isRus ? "Условия использования и правила платформы Timera" : "Timera platformasının istifadə şərtləri və qaydaları"}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEng ? "Terms of Service" : isRus ? "Условия использования" : "İstifadə Şərtləri"}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "1. Acceptance of Terms" : isRus ? "1. Принятие условий" : "1. Qəbul və Razılıq"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng 
                    ? "By accessing and using Timera, you accept and agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the platform."
                    : isRus
                    ? "Используя платформу Timera, вы принимаете и соглашаетесь с этими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте платформу."
                    : "Timera platformasına qoşulmaqla və istifadə etməklə, bu istifadə şərtlərini qəbul etmiş olursunuz. Əgər bu şərtlərlə razılaşmırsınızsa, platformadan istifadə etməyin."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "2. Account Requirements" : isRus ? "2. Требования к аккаунту" : "2. Hesab Tələbləri"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "To use the platform:" : isRus ? "Для использования платформы:" : "Platformadan istifadə etmək üçün:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "You must be 18 years or older" : isRus ? "Вам должно быть 18 лет или больше" : "18 yaş və ya daha böyük olmalısınız"}</li>
                  <li>{isEng ? "You must provide accurate and complete information" : isRus ? "Вы должны предоставить точную и полную информацию" : "Düzgün və dəqiq məlumatlar təqdim etməlisiniz"}</li>
                  <li>{isEng ? "You are responsible for maintaining the security of your account credentials" : isRus ? "Вы несете ответственность за безопасность учетных данных" : "Hesab məlumatlarınızı məxfi saxlamaq məsuliyyətinizdir"}</li>
                  <li>{isEng ? "You are responsible for all activities under your account" : isRus ? "Вы несете ответственность за все действия в вашем аккаунте" : "Hesabınızın altında baş verən bütün fəaliyyətlərə cavabdehsiniz"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "3. Service Description" : isRus ? "3. Описание сервиса" : "3. Xidmətlərin İstifadəsi"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng 
                    ? "Timera is an AI-assisted social media management platform. Our services include:"
                    : isRus
                    ? "Timera — это платформа управления социальными сетями с помощью ИИ. Наши услуги включают:"
                    : "Timera AI-dəstəkli sosial media idarəetmə platformasıdır. Xidmətlərimiz:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "AI-assisted content generation (user review and approval required)" : isRus ? "Генерация контента с помощью ИИ (требуется проверка и одобрение пользователем)" : "AI ilə məzmun yaradılması (istifadəçinin yoxlanması və təsdiqi tələb olunur)"}</li>
                  <li>{isEng ? "Social media post scheduling (manual approval before publishing)" : isRus ? "Планирование публикаций (требуется ручное одобрение перед публикацией)" : "Sosial media paylaşımlarının planlaşdırılması (dərc etməzdən əvvəl təsdiq tələb olunur)"}</li>
                  <li>{isEng ? "Multi-platform publishing (user controls all publishing actions)" : isRus ? "Публикация на нескольких платформах (пользователь контролирует все действия)" : "Çoxsaylı platformalara paylaşım (istifadəçi bütün əməliyyatlara nəzarət edir)"}</li>
                  <li>{isEng ? "Analytics and performance tracking" : isRus ? "Аналитика и отслеживание производительности" : "Analitika və performans izləmə"}</li>
                  <li>{isEng ? "Meta Ads campaign management (user oversight required)" : isRus ? "Управление рекламными кампаниями Meta (требуется надзор пользователя)" : "Meta Ads kampaniyalarının idarə edilməsi (istifadəçi nəzarəti tələb olunur)"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "4. AI-Assisted Content & User Control" : isRus ? "4. Контент с помощью ИИ и контроль пользователя" : "4. AI Məzmun və İstifadəçi Nəzarəti"}
                </h2>
                <p className="text-muted-foreground">
                  <strong>
                    {isEng 
                      ? "Important: AI assists, but you decide and approve."
                      : isRus
                      ? "Важно: ИИ помогает, но вы принимаете решения и одобряете."
                      : "Vacib: AI kömək edir, amma siz qərar verir və təsdiq edirsiniz."}
                  </strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                  <li>{isEng ? "AI generates content suggestions - you review, edit, and approve before any post is published" : isRus ? "ИИ создает предложения контента — вы проверяете, редактируете и утверждаете перед любой публикацией" : "AI məzmun təklifləri yaradır - hər hansı post dərc edilməzdən əvvəl siz yoxlayır, redaktə edir və təsdiq edirsiniz"}</li>
                  <li>{isEng ? "No content is published without your explicit approval" : isRus ? "Никакой контент не публикуется без вашего явного одобрения" : "Heç bir məzmun sizin açıq təsdiqi olmadan dərc edilmir"}</li>
                  <li>{isEng ? "Scheduled posts require manual approval - automated publishing only occurs after you approve" : isRus ? "Запланированные посты требуют ручного одобрения — автоматическая публикация происходит только после вашего одобрения" : "Planlaşdırılmış postlar təsdiq tələb edir - avtomatik dərc yalnız siz təsdiq etdikdən sonra baş verir"}</li>
                  <li>{isEng ? "You have full control to edit, modify, or reject any AI-generated content" : isRus ? "У вас есть полный контроль для редактирования, изменения или отклонения любого контента, созданного ИИ" : "AI yaratdığı istənilən məzmunu redaktə etmək, dəyişdirmək və ya rədd etmək üçün tam nəzarətə maliksiniz"}</li>
                  <li>{isEng ? "All Meta Ads actions require your authorization and approval" : isRus ? "Все действия Meta Ads требуют вашей авторизации и одобрения" : "Bütün Meta Ads əməliyyatları sizin icazənizi və təsdiqi tələb edir"}</li>
                  <li>{isEng ? "You are responsible for reviewing all content before it goes live" : isRus ? "Вы несете ответственность за проверку всего контента перед публикацией" : "Məzmun dərc edilməzdən əvvəl yoxlamaq məsuliyyəti sizdədir"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "5. Content Responsibility" : isRus ? "5. Ответственность за контент" : "5. Məzmun Məsuliyyəti"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "You are fully responsible for all content created and published through our platform:"
                    : isRus
                    ? "Вы несете полную ответственность за весь контент, созданный и опубликованный через нашу платформу:"
                    : "Platformada yaratdığınız və paylaşdığınız məzmun üçün tam məsuliyyət daşıyırsınız:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Content must comply with legal and ethical standards" : isRus ? "Контент должен соответствовать юридическим и этическим стандартам" : "Məzmun qanuni və etik standartlara uyğun olmalıdır"}</li>
                  <li>{isEng ? "You must respect copyright and intellectual property" : isRus ? "Вы должны уважать авторские права и интеллектуальную собственность" : "Müəllif hüquqlarına və intellektual mülkiyyətə hörmət edilməlidir"}</li>
                  <li>{isEng ? "You cannot create harmful, offensive, or illegal content" : isRus ? "Вы не можете создавать вредный, оскорбительный или незаконный контент" : "Zərərli, təhqiredici və ya qanunsuz məzmun yarada bilməzsiniz"}</li>
                  <li>{isEng ? "You must not violate third-party rights" : isRus ? "Вы не должны нарушать права третьих лиц" : "Üçüncü tərəflərin hüquqlarını pozmamalısınız"}</li>
                  <li>{isEng ? "Even though AI generates suggestions, YOU approve and publish - you are responsible" : isRus ? "Даже если ИИ генерирует предложения, ВЫ одобряете и публикуете - вы несете ответственность" : "AI təkliflər yaratsa belə, SİZ təsdiq edir və dərc edirsiniz - məsuliyyət sizdədir"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "6. Prohibited Activities" : isRus ? "6. Запрещенные действия" : "6. Qadağan Olunmuş Fəaliyyətlər"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "The following activities are prohibited:" : isRus ? "Следующие действия запрещены:" : "Aşağıdakı fəaliyyətlər qadağandır:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Attempting to compromise platform security or harm the system" : isRus ? "Попытки нарушить безопасность платформы или нанести вред системе" : "Platformanın təhlükəsizliyini pozmaq və ya sistemə zərər vermək"}</li>
                  <li>{isEng ? "Unauthorized access to other users' accounts" : isRus ? "Несанкционированный доступ к аккаунтам других пользователей" : "Digər istifadəçilərin hesablarına yetkisiz giriş"}</li>
                  <li>{isEng ? "Posting spam, fraud, or misleading content" : isRus ? "Публикация спама, мошеннического или вводящего в заблуждение контента" : "Spam, fırıldaq və ya yanıltıcı məzmun yaymaq"}</li>
                  <li>{isEng ? "Violating Meta, Facebook, Instagram, or other platform policies" : isRus ? "Нарушение политик Meta, Facebook, Instagram или других платформ" : "Meta, Facebook, Instagram və ya digər platformaların siyasətlərini pozmaq"}</li>
                  <li>{isEng ? "Reselling or redistributing platform services for commercial purposes" : isRus ? "Перепродажа или распространение услуг платформы в коммерческих целях" : "Platformanın xidmətlərini kommersiya məqsədləri üçün yenidən satmaq"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "7. Meta Platform Integration & User Oversight" : isRus ? "7. Интеграция с платформой Meta и контроль пользователя" : "7. Meta Platforması İnteqrasiyası və İstifadəçi Nəzarəti"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "By connecting your Facebook or Instagram accounts, you authorize Timera to:"
                    : isRus
                    ? "Подключая аккаунты Facebook или Instagram, вы разрешаете Timera:"
                    : "Facebook və ya Instagram hesablarınızı qoşmaqla, Timera-ya icazə verirsiniz:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Access your Pages and Instagram Business accounts" : isRus ? "Доступ к вашим страницам и бизнес-аккаунтам Instagram" : "Səhifələrinizə və Instagram Biznes hesablarınıza giriş"}</li>
                  <li>{isEng ? "Publish posts on your behalf ONLY after you approve them" : isRus ? "Публиковать посты от вашего имени ТОЛЬКО после вашего одобрения" : "Yalnız SİZ təsdiq etdikdən SONRA postları dərc etmək"}</li>
                  <li>{isEng ? "Retrieve engagement metrics and analytics" : isRus ? "Получать метрики вовлеченности и аналитику" : "Məşğulluq metriklərini və analitikanı əldə etmək"}</li>
                  <li>{isEng ? "Manage messages from your connected accounts (user reads and replies)" : isRus ? "Управлять сообщениями из ваших подключенных аккаунтов (пользователь читает и отвечает)" : "Bağlı hesablarınızdan mesajları idarə etmək (istifadəçi oxuyur və cavab verir)"}</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  <strong>
                    {isEng
                      ? "⚠️ Important: No automated posting occurs without your manual review and approval. You maintain full control over what gets published."
                      : isRus
                      ? "⚠️ Важно: Никакая автоматическая публикация не происходит без вашей ручной проверки и одобрения. Вы сохраняете полный контроль над тем, что публикуется."
                      : "⚠️ Vacib: Sizin əl ilə yoxlama və təsdiqi olmadan heç bir avtomatik dərc baş vermir. Nəyin dərc olunacağına tam nəzarət sizə məxsusdur."}
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "8. Payment and Subscription" : isRus ? "8. Оплата и подписка" : "8. Ödəniş və Abunəlik"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "Some services may require payment:" : isRus ? "Некоторые услуги могут требовать оплаты:" : "Bəzi xidmətlər ödəniş tələb edə bilər:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "Subscription plans and pricing are displayed on the platform" : isRus ? "Планы подписки и цены отображаются на платформе" : "Abunəlik planları və qiymətlər platformada göstərilir"}</li>
                  <li>{isEng ? "Payments may be automatically renewed" : isRus ? "Платежи могут автоматически продлеваться" : "Ödənişlər avtomatik olaraq yenilənə bilər"}</li>
                  <li>{isEng ? "You can cancel your subscription at any time" : isRus ? "Вы можете отменить подписку в любое время" : "İstənilən vaxt abunəliyi ləğv edə bilərsiniz"}</li>
                  <li>{isEng ? "Refund policy varies by subscription plan" : isRus ? "Политика возврата зависит от плана подписки" : "Geri qaytarma siyasəti abunəlik planına görə dəyişir"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "9. Data and Privacy" : isRus ? "9. Данные и конфиденциальность" : "9. Məlumat və Gizlilik"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "Your use of Timera is also governed by our Privacy Policy. We encrypt all access tokens and handle your data securely. See our Privacy Policy for full details."
                    : isRus
                    ? "Ваше использование Timera также регулируется нашей Политикой конфиденциальности. Мы шифруем все токены доступа и надежно обрабатываем ваши данные. Полную информацию см. в нашей Политике конфиденциальности."
                    : "Timera-dan istifadəniz Gizlilik Siyasətimizlə də tənzimlənir. Bütün giriş tokenlərini şifrələyir və məlumatlarınızı təhlükəsiz idarə edirik. Tam məlumat üçün Gizlilik Siyasətimizə baxın."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "10. Service Modifications" : isRus ? "10. Изменения сервиса" : "10. Xidmətin Dəyişdirilməsi"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "We reserve the right to modify or discontinue the service at any time with reasonable notice to users."
                    : isRus
                    ? "Мы оставляем за собой право изменять или прекращать сервис в любое время с разумным уведомлением пользователей."
                    : "İstifadəçilərə münasib bildiriş verməklə istənilən vaxt xidməti dəyişdirmək və ya dayandırmaq hüququnu özümüzdə saxlayırıq."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "11. Limitation of Liability" : isRus ? "11. Ограничение ответственности" : "11. Məsuliyyətin Məhdudlaşdırılması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "Timera is provided \"as is\" without warranties. We are not liable for any damages arising from your use of the service. You use the platform at your own risk."
                    : isRus
                    ? "Timera предоставляется \"как есть\" без гарантий. Мы не несем ответственности за любой ущерб, возникший в результате использования сервиса. Вы используете платформу на свой риск."
                    : "Platforma \"olduğu kimi\" təqdim olunur. Xidmətlərdən istifadə nəticəsində yaranan zərərlərə görə məsuliyyət daşımırıq. Platformadan öz riskinizlə istifadə edirsiniz."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "12. Termination" : isRus ? "12. Прекращение" : "12. Xidmətin Dayandırılması"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "Account termination conditions:" : isRus ? "Условия прекращения действия аккаунта:" : "Hesabın dayandırılması şərtləri:"}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>{isEng ? "You may terminate your account at any time" : isRus ? "Вы можете прекратить действие аккаунта в любое время" : "İstənilən vaxt hesabınızı ləğv edə bilərsiniz"}</li>
                  <li>{isEng ? "We may terminate accounts that violate these terms" : isRus ? "Мы можем прекратить действие аккаунтов, нарушающих эти условия" : "Bu şərtləri pozan hesabları dayandıra bilərik"}</li>
                  <li>{isEng ? "Upon termination, your data will be deleted according to our retention policy" : isRus ? "После прекращения ваши данные будут удалены в соответствии с нашей политикой хранения" : "Dayandırılmadan sonra məlumatlarınız saxlama siyasətimizə uyğun silinəcək"}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "13. Changes to Terms" : isRus ? "13. Изменения условий" : "13. Şərtlərdə Dəyişikliklər"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng
                    ? "These terms may be updated from time to time. Users will be notified of significant changes. Continued use of the platform after changes constitutes acceptance of the new terms."
                    : isRus
                    ? "Эти условия могут время от времени обновляться. Пользователи будут уведомлены о значительных изменениях. Продолжение использования платформы после изменений означает принятие новых условий."
                    : "Bu şərtlər vaxtaşırı yenilənə bilər. Əhəmiyyətli dəyişikliklər haqqında istifadəçilər məlumatlandırılacaq. Dəyişikliklərdən sonra platformadan istifadəyə davam etməklə yeni şərtləri qəbul etmiş olursunuz."}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  {isEng ? "14. Contact" : isRus ? "14. Контакты" : "14. Əlaqə"}
                </h2>
                <p className="text-muted-foreground">
                  {isEng ? "For questions about these Terms, contact us at:" : isRus ? "По вопросам об этих Условиях свяжитесь с нами:" : "İstifadə şərtləri ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:"}
                </p>
                <p className="text-muted-foreground">
                  {isEng ? "Email: legal@timera.az" : isRus ? "Email: legal@timera.az" : "E-poçt: legal@timera.az"}
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
