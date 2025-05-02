'use client';

import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from '@/utils/i18n';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const { t, currentLocale } = useTranslation();

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <LanguageSwitcher />
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('common.appName')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('common.loading')}
      </Typography>
      <Button
        component={Link}
        href={`/${currentLocale}/pages/login`}
        variant="contained"
        color="primary"
      >
        {t('common.login')}
      </Button>
    </Box>
  );
}
