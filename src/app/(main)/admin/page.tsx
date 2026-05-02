import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <main className="flex flex-1 items-center justify-center">
      <h1>Admin</h1>
    </main>
  );
}
