import './globals.css';
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/configs/i18n';

export default function RootLayout() {
  // Redirect to the default locale
  redirect(`/${defaultLocale}`);
}
