
import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Key, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings, getProjectSettings } from "@/utils/mockData";

interface SettingsManagerProps {
  selectedProject: string | null;
}

export const SettingsManager = ({ selectedProject }: SettingsManagerProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState({ name: "", key: "", description: "" });
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

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

  const handleAddApiKey = () => {
    if (!newApiKey.name.trim() || !newApiKey.key.trim()) {
      toast({
        title: "오류",
        description: "API 키 이름과 키를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (settings) {
      setSettings({
        ...settings,
        secrets: {
          ...settings.secrets,
          apiKeys: [...settings.secrets.apiKeys, { ...newApiKey }],
        },
      });
    }

    setNewApiKey({ name: "", key: "", description: "" });
    setIsAddKeyDialogOpen(false);
    
    toast({
      title: "성공",
      description: "새 API 키가 추가되었습니다.",
    });
  };

  const removeApiKey = (index: number) => {
    if (settings) {
      const newApiKeys = settings.secrets.apiKeys.filter((_, i) => i !== index);
      setSettings({
        ...settings,
        secrets: {
          ...settings.secrets,
          apiKeys: newApiKeys,
        },
      });
      
      toast({
        title: "삭제됨",
        description: "API 키가 삭제되었습니다.",
      });
    }
  };

  const toggleKeyVisibility = (index: number) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(index)) {
      newVisibleKeys.delete(index);
    } else {
      newVisibleKeys.add(index);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return "*".repeat(key.length);
    return key.substring(0, 4) + "*".repeat(key.length - 8) + key.substring(key.length - 4);
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

      <Tabs defaultValue="secrets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="secrets">시크릿 키</TabsTrigger>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="secrets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API 키 관리
                </CardTitle>
                <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      API 키 추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>새 API 키 추가</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="api-name">API 이름</Label>
                        <Input
                          id="api-name"
                          value={newApiKey.name}
                          onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                          placeholder="예: Google Maps API"
                        />
                      </div>
                      <div>
                        <Label htmlFor="api-key">API 키</Label>
                        <Input
                          id="api-key"
                          type="password"
                          value={newApiKey.key}
                          onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
                          placeholder="API 키를 입력하세요"
                        />
                      </div>
                      <div>
                        <Label htmlFor="api-description">설명</Label>
                        <Input
                          id="api-description"
                          value={newApiKey.description}
                          onChange={(e) => setNewApiKey({ ...newApiKey, description: e.target.value })}
                          placeholder="API 키 사용 목적"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddKeyDialogOpen(false)}>
                          취소
                        </Button>
                        <Button onClick={handleAddApiKey}>
                          추가
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.secrets.apiKeys.map((apiKey, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{apiKey.description}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted p-1 rounded">
                        {visibleKeys.has(index) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(index)}
                      >
                        {visibleKeys.has(index) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeApiKey(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>시스템 시크릿</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="database-url">데이터베이스 URL</Label>
                <Input
                  id="database-url"
                  type="password"
                  value={settings.secrets.databaseUrl}
                  onChange={(e) => setSettings({
                    ...settings,
                    secrets: { ...settings.secrets, databaseUrl: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="webhook-secret">웹훅 시크릿</Label>
                <Input
                  id="webhook-secret"
                  type="password"
                  value={settings.secrets.webhookSecret}
                  onChange={(e) => setSettings({
                    ...settings,
                    secrets: { ...settings.secrets, webhookSecret: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="encryption-key">암호화 키</Label>
                <Input
                  id="encryption-key"
                  type="password"
                  value={settings.secrets.encryptionKey}
                  onChange={(e) => setSettings({
                    ...settings,
                    secrets: { ...settings.secrets, encryptionKey: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, name: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="project-description">설명</Label>
                <Input
                  id="project-description"
                  value={settings.general.description}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, description: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="visibility">프로젝트 공개 범위</Label>
                <Select 
                  value={settings.general.visibility} 
                  onValueChange={(value: any) => setSettings({
                    ...settings,
                    general: { ...settings.general, visibility: value }
                  })}
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
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    general: { ...settings.general, allowComments: checked }
                  })}
                />
                <Label>댓글 허용</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.general.enableNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    general: { ...settings.general, enableNotifications: checked }
                  })}
                />
                <Label>알림 활성화</Label>
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
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailNotifications: checked }
                  })}
                />
                <Label>이메일 알림</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, pushNotifications: checked }
                  })}
                />
                <Label>푸시 알림</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyReports: checked }
                  })}
                />
                <Label>주간 리포트</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, securityAlerts: checked }
                  })}
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
