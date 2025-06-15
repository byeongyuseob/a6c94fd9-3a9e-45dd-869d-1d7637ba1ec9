
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings, getProjectSettings } from "@/utils/mockData";
import { DockerSettingsManager } from "@/components/DockerSettingsManager";
import { SecretKeysManager } from "@/components/SecretKeysManager";
import { ApiTestPanel } from "@/components/ApiTestPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsManagerProps {
  selectedProject: string | null;
}

export const SettingsManager = ({ selectedProject }: SettingsManagerProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ProjectSettings | null>(null);

  useEffect(() => {
    if (selectedProject) {
      setSettings(getProjectSettings(selectedProject));
    }
  }, [selectedProject]);

  const handleSave = () => {
    toast({
      title: "설정 저장됨",
      description: "프로젝트 설정이 성공적으로 저장되었습니다.",
    });
  };

  if (!selectedProject || !settings) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">프로젝트 설정</h2>
        <Button onClick={handleSave}>
          설정 저장
        </Button>
      </div>

      <Tabs defaultValue="docker" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="docker">환경 설정</TabsTrigger>
          <TabsTrigger value="secrets">시크릿 관리</TabsTrigger>
          <TabsTrigger value="api-test">API 조회</TabsTrigger>
        </TabsList>

        <TabsContent value="docker" className="mt-6">
          <DockerSettingsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="secrets" className="mt-6">
          <SecretKeysManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="api-test" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">설정 조회 API</h3>
            
            <ApiTestPanel
              title="전체 프로젝트 설정 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings`}
              description="프로젝트의 모든 설정을 조회합니다."
              queryParams={{
                include: "docker,secrets,general",
                format: "json"
              }}
              version="v1"
            />

            <ApiTestPanel
              title="Docker 환경 설정 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/docker`}
              description="Docker 관련 환경 설정을 조회합니다."
              queryParams={{
                environment: "dev",
                category: "application"
              }}
              version="v1"
            />

            <ApiTestPanel
              title="시크릿 키 목록 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/secrets`}
              description="등록된 시크릿 키 목록을 조회합니다. (값은 마스킹됨)"
              queryParams={{
                type: "api_key",
                status: "active",
                search: ""
              }}
              version="v1"
            />

            <ApiTestPanel
              title="설정 변경 이력 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/audit-log`}
              description="설정 변경 이력을 조회합니다."
              queryParams={{
                from: "2024-01-01",
                to: "2024-12-31",
                action: "",
                user: ""
              }}
              version="v1"
            />

            <ApiTestPanel
              title="환경별 설정 비교"
              endpoint={`/api/v1/projects/${selectedProject}/settings/compare`}
              description="서로 다른 환경의 설정을 비교합니다."
              queryParams={{
                source: "dev",
                target: "prod",
                category: "all"
              }}
              version="v1"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
