import { redirect } from 'next/navigation';
import { defaultLocale } from '@/configs/i18n';

export default function Page() {
  redirect(`/${defaultLocale}`);
}
