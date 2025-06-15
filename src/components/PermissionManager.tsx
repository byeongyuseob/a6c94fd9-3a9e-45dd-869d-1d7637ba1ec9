
import { useState, useEffect } from "react";
import { Permission } from "@/types/permission";
import { PermissionEmptyState } from "@/components/PermissionEmptyState";
import { PermissionCard } from "@/components/PermissionCard";
import { AddUserDialog } from "@/components/AddUserDialog";
import { ApiTestPanel } from "@/components/ApiTestPanel";
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

      {/* API Test Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">API 테스트</h3>
        
        <ApiTestPanel
          title="권한 목록 조회 API"
          endpoint={`/api/projects/${selectedProject}/permissions`}
          method="GET"
          description="프로젝트의 모든 사용자 권한을 조회합니다."
        />

        <ApiTestPanel
          title="사용자 권한 추가 API"
          endpoint={`/api/projects/${selectedProject}/permissions`}
          method="POST"
          body={{
            name: "새 사용자",
            email: "newuser@example.com",
            employeeId: "EMP001",
            role: "viewer"
          }}
          description="프로젝트에 새로운 사용자 권한을 추가합니다."
        />

        <ApiTestPanel
          title="사용자 권한 수정 API"
          endpoint={`/api/projects/${selectedProject}/permissions/{permissionId}`}
          method="PUT"
          body={{
            role: "editor"
          }}
          description="기존 사용자의 권한을 수정합니다."
        />

        <ApiTestPanel
          title="사용자 권한 삭제 API"
          endpoint={`/api/projects/${selectedProject}/permissions/{permissionId}`}
          method="DELETE"
          description="사용자 권한을 삭제합니다."
        />
      </div>
    </div>
  );
};
