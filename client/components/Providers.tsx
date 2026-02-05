"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/storeSetup";
import { useAppSelector } from "@/store";
import "@/locales/locales";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

import i18n from '@/locales/locales';

function LangSync() {
    const currentLang = useAppSelector((state) => state.locale.currentLang);

    useEffect(() => {
        const langCode = currentLang === "vi" ? "vi-VN" : "en-US";
        document.documentElement.lang = langCode;
        if (i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }
    }, [currentLang]);

    return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <LangSync />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
