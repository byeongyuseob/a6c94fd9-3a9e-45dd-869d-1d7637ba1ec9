
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectSettings {
  general: {
    name: string;
    description: string;
    visibility: "public" | "private" | "internal";
    allowComments: boolean;
    enableNotifications: boolean;
  };
  security: {
    twoFactorRequired: boolean;
    passwordMinLength: number;
    sessionTimeout: number;
    allowExternalAccess: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    securityAlerts: boolean;
  };
}

interface SettingsManagerProps {
  selectedProject: string | null;
}

export const SettingsManager = ({ selectedProject }: SettingsManagerProps) => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<ProjectSettings>({
    general: {
      name: "웹 애플리케이션",
      description: "메인 웹 애플리케이션 프로젝트",
      visibility: "private",
      allowComments: true,
      enableNotifications: true,
    },
    security: {
      twoFactorRequired: false,
      passwordMinLength: 8,
      sessionTimeout: 60,
      allowExternalAccess: false,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      securityAlerts: true,
    },
  });

  const handleSave = () => {
    toast({
      title: "설정 저장됨",
      description: "프로젝트 설정이 성공적으로 저장되었습니다.",
    });
  };

  const updateGeneralSettings = (field: keyof ProjectSettings["general"], value: any) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
  };

  const updateSecuritySettings = (field: keyof ProjectSettings["security"], value: any) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }));
  };

  const updateNotificationSettings = (field: keyof ProjectSettings["notifications"], value: any) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">프로젝트 설정</h2>
        <Button onClick={handleSave}>
          설정 저장
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-name">프로젝트 이름</Label>
                <Input
                  id="project-name"
                  value={settings.general.name}
                  onChange={(e) => updateGeneralSettings("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="project-description">설명</Label>
                <Input
                  id="project-description"
                  value={settings.general.description}
                  onChange={(e) => updateGeneralSettings("description", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="visibility">프로젝트 공개 범위</Label>
                <Select 
                  value={settings.general.visibility} 
                  onValueChange={(value: any) => updateGeneralSettings("visibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">공개</SelectItem>
                    <SelectItem value="internal">내부</SelectItem>
                    <SelectItem value="private">비공개</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.general.allowComments}
                  onCheckedChange={(checked) => updateGeneralSettings("allowComments", checked)}
                />
                <Label>댓글 허용</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.general.enableNotifications}
                  onCheckedChange={(checked) => updateGeneralSettings("enableNotifications", checked)}
                />
                <Label>알림 활성화</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.security.twoFactorRequired}
                  onCheckedChange={(checked) => updateSecuritySettings("twoFactorRequired", checked)}
                />
                <Label>2단계 인증 필수</Label>
              </div>
              <div>
                <Label htmlFor="password-length">최소 비밀번호 길이</Label>
                <Input
                  id="password-length"
                  type="number"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => updateSecuritySettings("passwordMinLength", parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="session-timeout">세션 타임아웃 (분)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSecuritySettings("sessionTimeout", parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.security.allowExternalAccess}
                  onCheckedChange={(checked) => updateSecuritySettings("allowExternalAccess", checked)}
                />
                <Label>외부 접근 허용</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => updateNotificationSettings("emailNotifications", checked)}
                />
                <Label>이메일 알림</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => updateNotificationSettings("pushNotifications", checked)}
                />
                <Label>푸시 알림</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => updateNotificationSettings("weeklyReports", checked)}
                />
                <Label>주간 리포트</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => updateNotificationSettings("securityAlerts", checked)}
                />
                <Label>보안 알림</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
