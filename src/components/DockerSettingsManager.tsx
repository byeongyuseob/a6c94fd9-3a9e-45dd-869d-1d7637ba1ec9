
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Server, Database, Key } from "lucide-react";
import { ProjectSettings } from "@/utils/mockData";

interface DockerSettingsManagerProps {
  settings: ProjectSettings;
  onUpdateSettings: (settings: ProjectSettings) => void;
}

export const DockerSettingsManager = ({ settings, onUpdateSettings }: DockerSettingsManagerProps) => {
  const updateDockerConfig = (key: string, value: string) => {
    onUpdateSettings({
      ...settings,
      docker: {
        ...settings.docker,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            API 서버 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-url">API URL</Label>
            <Input
              id="api-url"
              value={settings.docker?.apiUrl || ''}
              onChange={(e) => updateDockerConfig('apiUrl', e.target.value)}
              placeholder="http://localhost:8080/api"
            />
          </div>
          <div>
            <Label htmlFor="api-key">API KEY</Label>
            <Input
              id="api-key"
              type="password"
              value={settings.docker?.apiKey || ''}
              onChange={(e) => updateDockerConfig('apiKey', e.target.value)}
              placeholder="your-api-key-here"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            데이터베이스 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="db-url">DB URL</Label>
            <Input
              id="db-url"
              value={settings.docker?.dbUrl || ''}
              onChange={(e) => updateDockerConfig('dbUrl', e.target.value)}
              placeholder="postgresql://localhost:5432"
            />
          </div>
          <div>
            <Label htmlFor="db-id">DB ID (사용자명)</Label>
            <Input
              id="db-id"
              value={settings.docker?.dbId || ''}
              onChange={(e) => updateDockerConfig('dbId', e.target.value)}
              placeholder="postgres"
            />
          </div>
          <div>
            <Label htmlFor="db-pw">DB PW (비밀번호)</Label>
            <Input
              id="db-pw"
              type="password"
              value={settings.docker?.dbPassword || ''}
              onChange={(e) => updateDockerConfig('dbPassword', e.target.value)}
              placeholder="your-database-password"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Docker Compose 환경변수
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">docker-compose.yml 예시:</h4>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - API_URL=${settings.docker?.apiUrl || 'http://localhost:8080/api'}
      - API_KEY=${settings.docker?.apiKey || 'your-api-key'}
      - DB_URL=${settings.docker?.dbUrl || 'postgresql://localhost:5432'}
      - DB_USER=${settings.docker?.dbId || 'postgres'}
      - DB_PASSWORD=${settings.docker?.dbPassword || 'password'}
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=${settings.docker?.dbId || 'postgres'}
      - POSTGRES_PASSWORD=${settings.docker?.dbPassword || 'password'}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
