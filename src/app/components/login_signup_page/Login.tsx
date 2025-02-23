import Link from "next/link";

const Login = () => {
    return(
        <div>
            <Link href="/api/auth/login?screen_hint=signup">
                <button>Sign up</button>
            </Link>
            <Link href="/api/auth/login">
                <button>Log in</button>
            </Link>
        </div>
    )
}

export default Login;