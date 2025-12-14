export type AppConfig = {
    apiPrefix: string
    unAuthenticatedEntryPath: string
    authenticatedEntryPath: string
    locale: string
}

const appConfig: AppConfig = {
    apiPrefix: 'https://api.ph4ntoms.org/gateway',
    // apiPrefix: 'http://localhost:8222/gateway',
    unAuthenticatedEntryPath: '/sign-in',
    authenticatedEntryPath: '/',
    locale: 'vn',
}

export default appConfig