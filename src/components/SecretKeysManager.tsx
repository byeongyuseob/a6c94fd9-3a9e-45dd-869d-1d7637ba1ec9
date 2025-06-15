
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { AddApiKeyDialog } from "@/components/AddApiKeyDialog";
import { ProjectSettings } from "@/utils/mockData";

interface SecretKeysManagerProps {
  settings: ProjectSettings;
  onUpdateSettings: (settings: ProjectSettings) => void;
}

export const SecretKeysManager = ({ settings, onUpdateSettings }: SecretKeysManagerProps) => {
  const { toast } = useToast();
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());

  const handleAddApiKey = (newApiKey: { name: string; key: string; description: string }) => {
    onUpdateSettings({
      ...settings,
      secrets: {
        ...settings.secrets,
        apiKeys: [...settings.secrets.apiKeys, newApiKey],
      },
    });
  };

  const removeApiKey = (index: number) => {
    const newApiKeys = settings.secrets.apiKeys.filter((_, i) => i !== index);
    onUpdateSettings({
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API 키 관리
            </CardTitle>
            <AddApiKeyDialog onAddApiKey={handleAddApiKey} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.secrets.apiKeys.map((apiKey, index) => (
            <ApiKeyCard
              key={index}
              apiKey={apiKey}
              index={index}
              isVisible={visibleKeys.has(index)}
              onToggleVisibility={toggleKeyVisibility}
              onRemove={removeApiKey}
            />
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
              onChange={(e) => onUpdateSettings({
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
              onChange={(e) => onUpdateSettings({
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
              onChange={(e) => onUpdateSettings({
                ...settings,
                secrets: { ...settings.secrets, encryptionKey: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
