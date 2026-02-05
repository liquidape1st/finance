export type AppConfig = {
    apiPrefix: string
    unAuthenticatedEntryPath: string
    authenticatedEntryPath: string
    locale: string
}

const appConfig: AppConfig = {
    apiPrefix: 'https://api.goinsight.org/api',
    // apiPrefix: 'http://localhost:8886/api',
    unAuthenticatedEntryPath: '/sign-in',
    authenticatedEntryPath: '/',
    locale: 'vi',
}

export default appConfig