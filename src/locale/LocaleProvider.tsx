import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import type { RootState } from '../redux/store';

import { LOCALE, DEFAULT_LOCALE, LOCALES } from './index';

export interface LocaleProviderProps {
  children: React.ReactNode;
  localeName?: string;
  contextLocale?: string | null;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children, contextLocale, localeName = DEFAULT_LOCALE }) => {
  const lowerCasedLocale = (contextLocale || localeName).toLowerCase();
  const localeIsSupported = Object.values(LOCALE).includes(lowerCasedLocale);
  const locale = localeIsSupported ? lowerCasedLocale : DEFAULT_LOCALE;

  return (
    <IntlProvider locale={locale} messages={LOCALES[locale]} defaultLocale={DEFAULT_LOCALE}>
      {children}
    </IntlProvider>
  );
};

const mapState = (state: RootState) => ({
  contextLocale: state.global.context?.app.locale,
});

export default connect(mapState)(LocaleProvider);
