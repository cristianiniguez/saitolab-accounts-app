import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextIntlProvider } from 'next-intl';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextIntlProvider messages={pageProps.messages}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </NextIntlProvider>
    </SessionProvider>
  );
}

export default MyApp;
