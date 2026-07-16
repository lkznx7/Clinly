import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Keycloak,
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
                token.roles = account.provider_account_role
                    ? [account.provider_account_role]
                    : []
            }

            const realmAccess = (token as Record<string, unknown>)?.realm_access as { roles?: string[] } | undefined
            if (realmAccess?.roles) {
                token.roles = realmAccess.roles
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.refreshToken = token.refreshToken as string
            session.expiresAt = token.expiresAt as number
            session.user.role = ((token.roles as string[]) || [])[0] || "therapist"
            return session
        },
    },
    pages: {
        signIn: "/login"
    },
})
