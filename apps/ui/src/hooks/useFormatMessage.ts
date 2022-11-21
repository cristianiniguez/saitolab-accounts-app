import { useIntl } from 'react-intl';

// @formatjs types
type FormatXMLElementFn<T, R = string | T | Array<string | T>> = (parts: Array<string | T>) => R;
type PrimitiveType = string | number | boolean | null | undefined | Date;
type FormatMessageValues = Record<string, PrimitiveType | FormatXMLElementFn<string, string>>;

function useFormatMessage() {
  const { formatMessage } = useIntl();
  return (id: string, values?: FormatMessageValues) => formatMessage({ id }, values);
}

export default useFormatMessage;
