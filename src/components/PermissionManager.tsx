
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

  const handleEditUser = (updatedPermission: Permission) => {
    setPermissions(permissions.map(p => 
      p.id === updatedPermission.id ? updatedPermission : p
    ));
  };

  const handleDeleteUser = (permissionId: string) => {
    setPermissions(permissions.filter(p => p.id !== permissionId));
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

      <PermissionCard 
        permissions={permissions} 
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};
