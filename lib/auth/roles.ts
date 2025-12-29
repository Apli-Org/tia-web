import { Tables } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";

export type AdminRole = "super_admin" | "moderator" | "support";

export type AdminUser = Tables<"admin_users">;

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single();

  return adminUser;
}

export async function checkAdminRole(
  allowedRoles: AdminRole[]
): Promise<boolean> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return false;
  }

  return allowedRoles.includes(admin.role as AdminRole);
}

export async function requireAdmin(
  allowedRoles?: AdminRole[]
): Promise<AdminUser> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  if (allowedRoles && !allowedRoles.includes(admin.role as AdminRole)) {
    throw new Error(
      `Unauthorized: Requires one of these roles: ${allowedRoles.join(", ")}`
    );
  }

  return admin;
}

export function hasPermission(
  adminRole: AdminRole,
  requiredRoles: AdminRole[]
): boolean {
  return requiredRoles.includes(adminRole);
}

export const ROLE_PERMISSIONS = {
  super_admin: ["all"],
  moderator: ["moderation", "verification", "reports"],
  support: ["tickets", "users_view"],
} as const;
