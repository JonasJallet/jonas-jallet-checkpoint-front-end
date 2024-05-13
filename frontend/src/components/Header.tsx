import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center header bg-primary_color text-white p-4">
      <h1 className="font-semibold text-2xl">Checkpoint : frontend</h1>
      <Link href="/" className="text-xl mt-2">
        Countries
      </Link>
    </header>
  );
}
