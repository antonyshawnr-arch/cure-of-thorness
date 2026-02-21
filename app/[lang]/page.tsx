// next.config.js: { i18n: { locales: ['en', 'ta', 'ml'] } }
import { useParams } from 'next/navigation';
import { useTranslation } from 'next-i18next'; // npm i next-i18next

export default function Dashboard() {
  const { lang } = useParams();
  const { t } = useTranslation(lang as string);

  return (
    <div className="p-8">
      <h1>{t('welcome')}</h1> {/* JSON: en: 'Welcome', ta: 'வரவேற்கிறோம்' */}
      {/* Add records form, emergency button */}
    </div>
  );
}
