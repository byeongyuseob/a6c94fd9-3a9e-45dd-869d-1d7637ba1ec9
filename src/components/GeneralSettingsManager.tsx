
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectSettings } from "@/utils/mockData";

interface GeneralSettingsManagerProps {
  settings: ProjectSettings;
  onUpdateSettings: (settings: ProjectSettings) => void;
}

export const GeneralSettingsManager = ({ settings, onUpdateSettings }: GeneralSettingsManagerProps) => {
  return (
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
            onChange={(e) => onUpdateSettings({
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
            onChange={(e) => onUpdateSettings({
              ...settings,
              general: { ...settings.general, description: e.target.value }
            })}
          />
        </div>
        <div>
          <Label htmlFor="visibility">프로젝트 공개 범위</Label>
          <Select 
            value={settings.general.visibility} 
            onValueChange={(value: any) => onUpdateSettings({
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
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              general: { ...settings.general, allowComments: checked }
            })}
          />
          <Label>댓글 허용</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.general.enableNotifications}
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              general: { ...settings.general, enableNotifications: checked }
            })}
          />
          <Label>알림 활성화</Label>
        </div>
      </CardContent>
    </Card>
  );
};
