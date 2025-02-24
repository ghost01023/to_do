import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Neon JWKS URL (to fetch public key dynamically)
const JWKS_URL = "https://auth.neon.tech/.well-known/jwks.json";

async function getPublicKey(kid: string) {
    const res = await fetch(JWKS_URL);
    const { keys } = await res.json();
    const key = keys.find((key: any) => key.kid === kid);
    if (!key) throw new Error("Public key not found");
    return key;
}

export const stackServerApp = {
    async getUser() {
        try {
            const c = await cookies();
            const cookieValue = c.get("stack-access")?.value;
            if (!cookieValue) return null;

            const [, token] = JSON.parse(cookieValue); // Extract JWT

            // Decode token header to get `kid`
            const { protectedHeader } = await jwtVerify(token, async () => new Uint8Array());
            const key = await getPublicKey(protectedHeader.kid);

            // Verify JWT
            const { payload } = await jwtVerify(token, key);
            return { id: payload.sub }; // User ID from token
        } catch (error) {
            console.error("Auth Error:", error);
            return null;
        }
    },
};
