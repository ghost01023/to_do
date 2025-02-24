import Link from "next/link";

interface HeaderProps {
    username: string;
}

const Header = ({username}: HeaderProps) => {
  return (
    <div className="bg-gray-800 text-white h-[12vh] w-full flex items-center justify-center">
        Welcome, {username}!
      Temporary Header
        <Link href={"/src/app/api/auth/logout"}>Logout</Link>
    </div>
  );
};

export default Header;