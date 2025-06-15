
import { useState, useEffect } from "react";
import { Settings, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings, getProjectSettings } from "@/utils/mockData";
import { ApiTestPanel } from "@/components/ApiTestPanel";

interface SettingsManagerProps {
  selectedProject: string | null;
}

export const SettingsManager = ({ selectedProject }: SettingsManagerProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setIsLoading(true);
      // 실제 API 호출을 시뮬레이션
      setTimeout(() => {
        setSettings(getProjectSettings(selectedProject));
        setIsLoading(false);
      }, 300);
    }
  }, [selectedProject]);

  if (!selectedProject) {
    return (
      <div className="text-center py-16 animate-in">
        <div className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/30 text-muted-foreground rounded-2xl w-fit mx-auto mb-6 shadow-soft">
          <Settings className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          프로젝트를 선택해주세요
        </h3>
        <p className="text-muted-foreground">
          설정을 관리할 프로젝트를 선택해주세요
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 bg-muted animate-pulse rounded-lg w-48"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-64"></div>
          </div>
          <div className="h-10 bg-muted animate-pulse rounded-lg w-24"></div>
        </div>
        <div className="h-96 bg-muted animate-pulse rounded-xl"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-16 animate-in">
        <div className="p-6 bg-destructive/10 text-destructive rounded-2xl w-fit mx-auto mb-6">
          <Settings className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          설정을 불러올 수 없습니다
        </h3>
        <p className="text-muted-foreground">
          프로젝트 설정을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  // 환경 정보 배열
  const environments = [
    {
      key: "dev",
      label: "Development",
      description: "개발 환경의 설정 정보를 조회합니다.",
      endpoint: `/api/v1/projects/${selectedProject}/settings/environments/dev`,
    },
    {
      key: "staging",
      label: "Staging",
      description: "스테이징 환경의 설정 정보를 조회합니다.",
      endpoint: `/api/v1/projects/${selectedProject}/settings/environments/staging`,
    },
    {
      key: "production",
      label: "Production",
      description: "프로덕션 환경의 설정 정보를 조회합니다.",
      endpoint: `/api/v1/projects/${selectedProject}/settings/environments/production`,
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Settings className="h-5 w-5" />
            </div>
            환경별 API 설정 조회
          </h2>
          <p className="text-muted-foreground mt-1">
            개발, 스테이징, 프로덕션 환경별로 API 설정을 바로 조회할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {environments.map((env) => (
          <div key={env.key} className="bg-background/50 backdrop-blur-sm rounded-xl border p-6 shadow-soft flex flex-col gap-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              {env.label}
            </h3>
            <p className="text-muted-foreground text-sm mb-2">{env.description}</p>
            <ApiTestPanel
              title={`${env.label} 환경 설정 조회`}
              endpoint={env.endpoint}
              description={env.description}
              queryParams={{
                category: "application",
                format: "json",
                include_secrets: "false"
              }}
              version="v1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
