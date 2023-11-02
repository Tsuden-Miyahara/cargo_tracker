import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b flex gap-4 items-center h-14 w-full px-4 bg-white fixed top-0 z-10">
        <h1>
            <Link href="/">
                Home
            </Link>
        </h1>
        <h1>
            <Link href="/tracking">
                Tracking
            </Link>
        </h1>
    </header>
  );
};

export default Header;