'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
  Alert,
  CircularProgress
} from '@mui/material'
import { useTranslation } from '@/utils/i18n'
import { useAuth } from '@/contexts/AuthContext'
import { z } from 'zod'
import { useTheme } from '@mui/material/styles'
import { useSettings } from '@/hooks/useSettings' // You'll need to create this hook

// Define validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  // States
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const theme = useTheme();
  const { settings } = { settings: { skin: 'default', mode: theme.palette.mode } }; // Replace with actual useSettings hook

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png';
  const lightImg = '/images/pages/auth-v2-mask-light.png';
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png';
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png';

  // Use appropriate image based on theme
  const authBackground = theme.palette.mode === 'dark' ? darkImg : lightImg;
  const characterIllustration = theme.palette.mode === 'dark' ? darkIllustration : lightIllustration;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (formErrors[name as keyof LoginFormData]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }

    // Clear general error
    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof LoginFormData, string>> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as keyof LoginFormData] = error.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Validate form
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { error, data } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else if (data?.session) {
        // Redirect to dashboard on successful login
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden'>
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        {/* You'll need to implement the Illustrations component or use a simpler approach */}
        <div className='absolute inset-0 z-[-1]'>
          <img src={authBackground} alt='auth-background' className='h-full w-full object-cover' />
        </div>
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href='/'
          className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'
        >
          {/* Replace with your logo component */}
          <Typography variant='h6' color='primary'>
            {t('common.appName')}
          </Typography>
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>{t('auth.welcomeMessage')}</Typography>
            <Typography className='mbs-1'>{t('auth.loginWelcome')}</Typography>
          </div>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <TextField
              autoFocus
              fullWidth
              id="email"
              name="email"
              label={t('auth.email')}
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={isLoading}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label={t('auth.password')}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox />} label={t('auth.rememberMe')} />
              <Typography
                className='text-end'
                color='primary.main'
                component={Link}
                href='/forgot-password'
              >
                {t('auth.forgotPassword')}
              </Typography>
            </div>
            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : t('common.login')}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>{t('auth.newUser')}</Typography>
              <Typography
                component={Link}
                href='/register'
                color='primary.main'
              >
                {t('auth.createAccount')}
              </Typography>
            </div>
          </form>
          <Divider className='gap-3'>{t('common.or')}</Divider>
          <div className='flex justify-center gap-4'>
            {/* Social login buttons would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
