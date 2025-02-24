import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "@neondatabase/serverless";
import PgAdapter from "@auth/pg-adapter";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true, // Neon requires SSL
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
                const res = await client.query("SELECT * FROM users WHERE email = $1", [email]);
                client.release();

                if (res.rows.length === 0) return null;
                const user = res.rows[0];

                // TODO: Hash and compare passwords
                if (user.password !== password) return null;

                return { id: user.id, name: user.name, email: user.email };
            },
        }),
    ],
    // pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
