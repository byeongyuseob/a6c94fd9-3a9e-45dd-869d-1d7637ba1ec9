
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
          <TabsTrigger value="api-test">API 테스트</TabsTrigger>
        </TabsList>

        <TabsContent value="docker" className="mt-6">
          <DockerSettingsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="secrets" className="mt-6">
          <SecretKeysManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="api-test" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">설정 관리 API 테스트</h3>
            
            <ApiTestPanel
              title="프로젝트 설정 조회 API"
              endpoint={`/api/projects/${selectedProject}/settings`}
              method="GET"
              description="프로젝트의 모든 설정을 조회합니다."
            />

            <ApiTestPanel
              title="환경 설정 업데이트 API"
              endpoint={`/api/projects/${selectedProject}/settings/docker`}
              method="PUT"
              body={{
                environments: {
                  dev: {
                    application: {
                      APP_VERSION: "1.0.0-dev",
                      DEBUG_MODE: "true",
                      LOG_LEVEL: "debug"
                    },
                    api: {
                      API_URL: "http://localhost:8080/api",
                      API_KEY: "dev_api_key"
                    },
                    database: {
                      DB_HOST: "localhost",
                      DB_PORT: "5432",
                      DB_NAME: "myapp_dev",
                      DB_USERNAME: "dev_user",
                      DB_PASSWORD: "dev_password"
                    }
                  }
                }
              }}
              description="Docker 환경 설정을 업데이트합니다."
            />

            <ApiTestPanel
              title="시크릿 키 추가 API"
              endpoint={`/api/projects/${selectedProject}/settings/secrets`}
              method="POST"
              body={{
                name: "NEW_API_KEY",
                key: "sk-1234567890abcdef",
                description: "새로운 API 키"
              }}
              description="새로운 시크릿 키를 추가합니다."
            />

            <ApiTestPanel
              title="시크릿 키 삭제 API"
              endpoint={`/api/projects/${selectedProject}/settings/secrets/{keyId}`}
              method="DELETE"
              description="기존 시크릿 키를 삭제합니다."
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
