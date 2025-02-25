import { NextResponse } from "next/server";
import { getUserDetails } from "@/app/actions";
import { stackServerApp } from "@/stack";

export async function GET() {
  const user = await stackServerApp.getUser();
  console.log("TRYING TO GET USER");
  // console.log(user);
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  const data = {
    user: user,
    app: app,
    userProfile: userProfile,
  };
  return NextResponse.json(data);
}
