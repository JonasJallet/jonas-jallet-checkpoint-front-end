import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center header bg-primary_color text-white p-4">
      <h1 className="font-semibold">Checkpoint : frontend</h1>
      <Link href="/">Countries</Link>
    </header>
  );
}
