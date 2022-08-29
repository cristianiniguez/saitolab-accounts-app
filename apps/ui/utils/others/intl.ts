import { DEFAULT_LOCALE } from 'constants/';
import { GetServerSidePropsContext } from 'next';

export const getTranslationsProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale || ctx.defaultLocale || DEFAULT_LOCALE;

  return {
    messages: (await import(`i18n/${locale}.json`)).default,
  };
};
