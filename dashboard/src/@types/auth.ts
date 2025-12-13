export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    data: {
        accessToken: string
        refreshToken: string
        type: string
        email: string
        fullName: string
        user: {
            id: string
            email: string
            fullName: string
            phone: string
            address: string
            roles: string[]
            authorities: string[]
        }
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
