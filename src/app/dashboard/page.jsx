import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardView from "./components/DashboardView";

export default async function DashboardPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  return <DashboardView user={session?.user} />;
}
