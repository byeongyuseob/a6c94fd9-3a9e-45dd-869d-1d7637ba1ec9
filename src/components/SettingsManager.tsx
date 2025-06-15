
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings, getProjectSettings } from "@/utils/mockData";
import { DockerSettingsManager } from "@/components/DockerSettingsManager";
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="docker">환경 설정</TabsTrigger>
          <TabsTrigger value="api-test">설정 조회</TabsTrigger>
        </TabsList>

        <TabsContent value="docker" className="mt-6">
          <DockerSettingsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="api-test" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">환경 설정 조회 API</h3>
            
            <ApiTestPanel
              title="개발 환경 설정 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/environments/dev`}
              description="개발 환경의 설정 정보를 조회합니다."
              queryParams={{
                category: "application",
                format: "json",
                include_secrets: "false"
              }}
              version="v1"
            />

            <ApiTestPanel
              title="스테이징 환경 설정 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/environments/staging`}
              description="스테이징 환경의 설정 정보를 조회합니다."
              queryParams={{
                category: "application",
                format: "json",
                include_secrets: "false"
              }}
              version="v1"
            />

            <ApiTestPanel
              title="프로덕션 환경 설정 조회"
              endpoint={`/api/v1/projects/${selectedProject}/settings/environments/production`}
              description="프로덕션 환경의 설정 정보를 조회합니다."
              queryParams={{
                category: "application",
                format: "json",
                include_secrets: "false"
              }}
              version="v1"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
