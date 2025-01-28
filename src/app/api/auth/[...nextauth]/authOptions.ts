import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginAction } from '@/app/login/actions/loginAction';

/**
 * NextAuth configuration for handling authentication using credentials provider.
 * 
 * @type {NextAuthOptions}
 * @property {Object} session - Defines session strategy (JWT).
 * @property {Array} providers - List of authentication providers (credentials provider in this case).
 * @property {Object} callbacks - Defines JWT and session handling logic.
 * @property {Object} pages - Custom pages for sign-in.
 * @property {string} secret - Secret key for JWT signing.
 */
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'john.doe@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                const result = await loginAction(email, password);

                if (result.success && result.user) {
                    return {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string,
                };
                session.token = token as unknown as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET || 'default_secret',
};
