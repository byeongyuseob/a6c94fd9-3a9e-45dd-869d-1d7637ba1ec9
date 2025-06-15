
import { useState } from "react";
import { Permission } from "@/types/permission";
import { PermissionEmptyState } from "@/components/PermissionEmptyState";
import { PermissionCard } from "@/components/PermissionCard";
import { AddUserDialog } from "@/components/AddUserDialog";

interface PermissionManagerProps {
  selectedProject: string | null;
}

export const PermissionManager = ({ selectedProject }: PermissionManagerProps) => {
  // 샘플 권한 데이터
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "김철수",
      email: "kim@example.com",
      role: "owner",
      permissions: { read: true, write: true, delete: true, manage: true },
      lastActive: "2024-06-15",
    },
    {
      id: "2",
      name: "이영희",
      email: "lee@example.com",
      role: "admin",
      permissions: { read: true, write: true, delete: true, manage: false },
      lastActive: "2024-06-14",
    },
    {
      id: "3",
      name: "박민수",
      email: "park@example.com",
      role: "member",
      permissions: { read: true, write: true, delete: false, manage: false },
      lastActive: "2024-06-13",
    },
  ]);

  const handleAddUser = (permission: Permission) => {
    setPermissions([...permissions, permission]);
  };

  const updatePermission = (id: string, field: keyof Permission["permissions"], value: boolean) => {
    setPermissions(permissions.map(p => 
      p.id === id 
        ? { ...p, permissions: { ...p.permissions, [field]: value } }
        : p
    ));
  };

  if (!selectedProject) {
    return <PermissionEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">권한 관리</h2>
        <AddUserDialog onAddUser={handleAddUser} />
      </div>

      <div className="grid gap-4">
        {permissions.map((permission) => (
          <PermissionCard
            key={permission.id}
            permission={permission}
            onUpdatePermission={updatePermission}
          />
        ))}
      </div>
    </div>
  );
};
