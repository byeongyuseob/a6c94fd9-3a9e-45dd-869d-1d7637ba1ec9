
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
        <h3 className="text-lg font-semibold">권한 조회 API</h3>

        {/* 전체 권한 목록 조회 */}
        <ApiTestPanel
          title="전체 권한 목록 조회"
          endpoint={`/api/v1/projects/${selectedProject}/permissions`}
          description="프로젝트의 모든 사용자 권한을 조회합니다."
          queryParams={{
            page: "1",
            limit: "10",
            role: "",
            search: ""
          }}
          version="v1"
        />

        {/* 특정 사용자 권한 조회 */}
        <ApiTestPanel
          title="특정 사용자 권한 조회"
          endpoint={`/api/v1/projects/${selectedProject}/permissions/{userId}`}
          description="특정 사용자의 상세 권한 정보를 조회합니다."
          queryParams={{
            include: "profile"
          }}
          version="v1"
        />

        {/* 역할별 권한 조회 */}
        <ApiTestPanel
          title="역할별 권한 조회"
          endpoint={`/api/v1/projects/${selectedProject}/permissions/byRole`}
          description="역할별로 그룹화된 권한 목록을 조회합니다."
          queryParams={{
            roles: "regular,contract,manager,supermanager,developer",
            includeCount: "true"
          }}
          version="v1"
        />
      </div>
    </div>
  );
};
