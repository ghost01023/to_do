import {auth0} from "@/lib/auth0";

import Dashboard from "@/app/components/dashboard/Dashboard";
import Login from "@/app/components/login_signup_page/Login"


export default async function Home() {
    const session = await auth0.getSession();
    if (session) {
        return (
            <Login></Login>
        )
    } else {
        return (
            <Dashboard username={"rosja"}></Dashboard>
        )
    }
}