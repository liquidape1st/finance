export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://api.goincome.net/gateway',
    // apiPrefix: 'http://localhost:8886/api',
    authenticatedEntryPath: '/app/sales/blog-post-list',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: false,
}

export default appConfig
