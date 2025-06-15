
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProjectSettings } from "@/utils/mockData";

interface NotificationsManagerProps {
  settings: ProjectSettings;
  onUpdateSettings: (settings: ProjectSettings) => void;
}

export const NotificationsManager = ({ settings, onUpdateSettings }: NotificationsManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.notifications.emailNotifications}
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              notifications: { ...settings.notifications, emailNotifications: checked }
            })}
          />
          <Label>이메일 알림</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.notifications.pushNotifications}
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              notifications: { ...settings.notifications, pushNotifications: checked }
            })}
          />
          <Label>푸시 알림</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.notifications.weeklyReports}
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              notifications: { ...settings.notifications, weeklyReports: checked }
            })}
          />
          <Label>주간 리포트</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.notifications.securityAlerts}
            onCheckedChange={(checked) => onUpdateSettings({
              ...settings,
              notifications: { ...settings.notifications, securityAlerts: checked }
            })}
          />
          <Label>보안 알림</Label>
        </div>
      </CardContent>
    </Card>
  );
};
