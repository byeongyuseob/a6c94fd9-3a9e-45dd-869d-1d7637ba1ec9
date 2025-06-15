
import { useState, useEffect } from "react";
import { Permission } from "@/types/permission";
import { PermissionEmptyState } from "@/components/PermissionEmptyState";
import { PermissionCard } from "@/components/PermissionCard";
import { AddUserDialog } from "@/components/AddUserDialog";
import { getProjectPermissions } from "@/utils/mockData";

interface PermissionManagerProps {
  selectedProject: string | null;
}

export const PermissionManager = ({ selectedProject }: PermissionManagerProps) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (selectedProject) {
      setPermissions(getProjectPermissions(selectedProject));
    }
  }, [selectedProject]);

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
