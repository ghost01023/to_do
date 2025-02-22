import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <nav>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;