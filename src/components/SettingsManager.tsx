
import { Settings } from "lucide-react";

interface SettingsManagerProps {
  selectedProject: string | null;
}

export const SettingsManager = ({ selectedProject }: SettingsManagerProps) => {
  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          설정을 관리할 프로젝트를 선택해주세요
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">
        설정 관리 기능이 준비 중입니다
      </p>
    </div>
  );
};
