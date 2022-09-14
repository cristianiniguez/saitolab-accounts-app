import { FC, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import messages_en from '@/i18n/en.json';

const messages: { [key: string]: Record<string, string> } = { en: messages_en };
const language = navigator.language.split(/[-_]/)[0];
const defaultLocale = 'en';

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <IntlProvider locale={language} messages={messages[language] || messages[defaultLocale]}>
      {children}
    </IntlProvider>
  );
};

export default MessagesProvider;
