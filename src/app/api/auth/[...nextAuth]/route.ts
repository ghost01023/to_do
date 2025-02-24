import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import {signIn} from "next-auth/react"
import PgAdapter from "@auth/pg-adapter";

// interface SessionProps {
//     session: string;
//     user: string;
// }

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Neon PostgreSQL URL
});

export const authOptions = {
    adapter: PgAdapter(pool),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                const client = await pool.connect();
                const res = await client.query(
                    "SELECT * FROM users WHERE email = $1",
                    [email]
                );
                client.release();

                if (res.rows.length === 0) return null;
                const user = res.rows[0];

                // TODO: Hash and compare passwords properly
                if (user.password !== password) return null;

                return { id: user.id, name: user.name, email: user.email };
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
