import { use } from "react";
import { apiFetch } from "@/api/users/apiFetch";
import { UsersTable } from "@/components/UsersTable";

export default function UsersPage() {
  const { users } = use(apiFetch());

  return <UsersTable users={users} />;
}
