"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';


interface RawJsonProps {
  profile_image_url: string;
}

interface UserProfileProps {
  name: string;
  primaryEmail: string;
  raw_json: RawJsonProps;
}

interface UserProps {
  primaryEmail: string;
}

interface AppProps {
  signIn: string;
  signUp: string;
  signOut: string;
}

export function Header() {
  const [user, setUser] = useState<UserProps>();
  const [app, setApp] = useState<AppProps>();
  const [userProfile, setUserProfile] = useState<UserProfileProps>();

  useEffect(() => {
    fetch("/api/stack")
    .then(res => res.json())
    .then(data => {
      console.log("FOR HEADER:")
      console.log(data);
      setUser(data.user);
      setApp(data.app);
      setUserProfile(data.userProfile);
    })
  }, []);
  

  // const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;
  // const userProfile = await getUserDetails(user?.id);

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 z-10 bg-beige">
      <div className="font-medium text-[15px] tracking-tight bg-beige px-3 rounded">
        <h1>
          Task Manager
        </h1>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className='inline-flex h-8 items-end flex-col'>
          <span className="text-2xl text-gray-600 dark:text-gray-600">
            {`Hello, ${user?.primaryEmail}`}
          </span>
          </span>
          {
            userProfile?.raw_json.profile_image_url && 
            <Image 
              src={userProfile?.raw_json.profile_image_url}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          }
            
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href={app?.signIn || "#"}
            className="inline-flex h-8 items-center justify-center rounded-md px-4 text-[13px] font-medium text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Log In
          </Link>
          <Link
            href={app?.signUp || "#"}
            className="inline-flex h-8 items-center justify-center font-medium  text-center rounded-full outline-none   dark:text-black bg-primary-1 hover:bg-[#00e5bf] whitespace-nowrap px-6 text-[13px] transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
      <Link
          href={app?.signOut || "#"}
          className="text-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-500 py-2 px-3 rounded text-[11px] text-white hover:text-black transition-all duration-200 ease-in-out"
      >
        Sign Out
      </Link>
    </header>
  );
}
