import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardWrapper from "./components/DashboardWrapper";

export const metadata = {
  title: "Enterprise Dashboard | Indoturbine",
  description: "Secure industrial turbine telemetry and operational dashboard.",
};

export default async function DashboardLayout({ children }) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    redirect("/login");
  }

  return <DashboardWrapper user={session.user}>{children}</DashboardWrapper>;
}
