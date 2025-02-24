// app/api/auth/status/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function GET() {
    try {
        // Get the session token from cookies
        const cookieStore = await cookies();
        console.log(cookieStore);
        const sessionToken = cookieStore.get('stack-access'); // Adjust cookie name based on Neon Auth's actual cookie name
        console.log("sessionToken is ");
        console.log(sessionToken);
        if (!sessionToken?.value) {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }

        // Verify the session with Neon Auth
        console.log("trying to query neon auth via sessiontoken");
        const response = await fetch('https://console.neon.tech/api/v1/auth/session', {
            headers: {
                'Cookie': `neon-session=${sessionToken.value}`
            }
        });
        console.log("response from neon was");
        console.log(response);
        if (response.ok) {
            const userData = await response.json();
            return NextResponse.json({
                isAuthenticated: true,
                user: userData
            });
        } else {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        return NextResponse.json({
            isAuthenticated: false,
            error: 'Server error'
        }, { status: 500 });
    }
}