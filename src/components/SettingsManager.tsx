
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings, getProjectSettings } from "@/utils/mockData";
import { SecretKeysManager } from "@/components/SecretKeysManager";
import { GeneralSettingsManager } from "@/components/GeneralSettingsManager";
import { NotificationsManager } from "@/components/NotificationsManager";
import { DockerSettingsManager } from "@/components/DockerSettingsManager";

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="docker">Docker</TabsTrigger>
          <TabsTrigger value="secrets">시크릿 키</TabsTrigger>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="docker">
          <DockerSettingsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="secrets">
          <SecretKeysManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="general">
          <GeneralSettingsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsManager settings={settings} onUpdateSettings={setSettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
