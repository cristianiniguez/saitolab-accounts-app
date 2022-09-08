import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import useFormatMessage from '../../hooks/useFormatMessage';

type PageProps = {
  children: ReactNode;
  title?: string;
};

const Page: FC<PageProps> = ({ children, title: pageTitle }) => {
  const t = useFormatMessage();
  const appName = t('common.app.name');
  const titleToShow = pageTitle ? t('common.app.title', { name: appName, pageTitle }) : appName;

  return (
    <>
      <Helmet>
        <title>{titleToShow}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;
