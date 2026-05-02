import { ThemeToggle } from "@/components/theme-toggle";
import UserDropdown from "@/components/user-dropdown";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-3">
        <Link href="/dashboard">Better Next</Link>
        <div className="flex">
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
