'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './storeSetup';
import Loading from '@/components/shared/Loading';
import React from "react";
import i18n from '@/locales'
import { dateLocales } from '@/locales'
import dayjs from 'dayjs'

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading type='cover' />}
        persistor={persistor}
        onBeforeLift={() => {
          const lang = store.getState().locale.currentLang
          const formattedLang = lang.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase()
          })
          i18n.changeLanguage(formattedLang).then(() => {
              dateLocales[formattedLang]?.().then(() => {
                  dayjs.locale(formattedLang)
              }).catch(() => {
                  // noop
              })
          })
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}