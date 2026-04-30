import { ThemeToggle } from "@/components/theme-toggle";
import UserDropdown from "@/components/user-dropdown";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-3">
        <Link href="/dashboard">Better Next</Link>
        <div className="flex">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
