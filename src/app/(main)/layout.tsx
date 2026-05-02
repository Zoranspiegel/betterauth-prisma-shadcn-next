import { getServerSession } from "@/lib/get-server-session";
import Navbar from "./navbar";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (!session) redirect("/sign-in");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
