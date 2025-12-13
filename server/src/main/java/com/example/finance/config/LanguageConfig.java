package com.example.finance.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@Configuration
public class LanguageConfig {

    static class CustomHeaderLocaleResolver implements LocaleResolver {

        private final Locale defaultLocale = Locale.US;

        @NonNull
        @Override
        public Locale resolveLocale(HttpServletRequest request) {
            String lang = request.getHeader("X-App-Language");
            if (!StringUtils.hasText(lang)) {
                return defaultLocale;
            }
            return Locale.forLanguageTag(lang);
        }

        @Override
        public void setLocale(@NonNull HttpServletRequest httpServletRequest, HttpServletResponse response, Locale locale) {
        }
    }


    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:i18n/messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        return new CustomHeaderLocaleResolver();
    }
}