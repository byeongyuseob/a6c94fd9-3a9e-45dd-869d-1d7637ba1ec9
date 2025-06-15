
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Save, CheckCircle } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    
    try {
      // 실제 저장 로직 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "설정 저장 완료",
        description: "프로젝트 설정이 성공적으로 저장되었습니다.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "설정 저장 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Settings className="h-5 w-5" />
            </div>
            프로젝트 설정
          </h2>
          <p className="text-muted-foreground mt-1">
            환경 설정 및 API 조회 관리
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 shadow-soft hover:shadow-medium transition-all duration-200"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
              저장 중...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              설정 저장
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="docker" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger 
            value="docker" 
            className="h-full data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all duration-200"
          >
            <Settings className="h-4 w-4 mr-2" />
            환경 설정
          </TabsTrigger>
          <TabsTrigger 
            value="api-test" 
            className="h-full data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all duration-200"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            설정 조회
          </TabsTrigger>
        </TabsList>

        <TabsContent value="docker" className="mt-6 min-h-[500px] animate-in">
          <div className="bg-background/50 backdrop-blur-sm rounded-xl border p-6 shadow-soft">
            <DockerSettingsManager settings={settings} onUpdateSettings={setSettings} />
          </div>
        </TabsContent>

        <TabsContent value="api-test" className="mt-6 min-h-[500px] animate-in">
          <div className="space-y-6">
            <div className="bg-background/50 backdrop-blur-sm rounded-xl border p-6 shadow-soft">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                환경 설정 조회 API
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                각 환경별 설정 정보를 조회하고 테스트할 수 있습니다.
              </p>
            
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
