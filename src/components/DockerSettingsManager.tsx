import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Database, Settings, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectSettings } from "@/utils/mockData";

interface DockerSettingsManagerProps {
  settings: ProjectSettings;
  onUpdateSettings: (settings: ProjectSettings) => void;
}

interface EnvironmentConfig {
  application: {
    APP_VERSION: string;
    DEBUG_MODE: string;
    LOG_LEVEL: string;
  };
  api: {
    API_URL: string;
    API_KEY: string;
  };
  database: {
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  };
  custom: { [key: string]: string };
}

export const DockerSettingsManager = ({ settings, onUpdateSettings }: DockerSettingsManagerProps) => {
  const { toast } = useToast();
  const [activeEnvironment, setActiveEnvironment] = useState<'dev' | 'staging' | 'prod'>('dev');
  const [newCustomKey, setNewCustomKey] = useState('');
  const [newCustomValue, setNewCustomValue] = useState('');

  // Initialize environment configs if they don't exist
  const initializeEnvironments = () => {
    if (!settings.docker.environments) {
      return {
        dev: {
          application: { APP_VERSION: '1.0.0-dev', DEBUG_MODE: 'true', LOG_LEVEL: 'debug' },
          api: { API_URL: 'http://localhost:8080/api', API_KEY: 'dev_api_key' },
          database: { DB_HOST: 'localhost', DB_PORT: '5432', DB_NAME: 'myapp_dev', DB_USERNAME: 'dev_user', DB_PASSWORD: 'dev_password' },
          custom: {}
        },
        staging: {
          application: { APP_VERSION: '1.0.0-rc', DEBUG_MODE: 'false', LOG_LEVEL: 'info' },
          api: { API_URL: 'https://staging-api.example.com/api', API_KEY: 'staging_api_key' },
          database: { DB_HOST: 'staging-db.example.com', DB_PORT: '5432', DB_NAME: 'myapp_staging', DB_USERNAME: 'staging_user', DB_PASSWORD: 'staging_password' },
          custom: {}
        },
        prod: {
          application: { APP_VERSION: '1.0.0', DEBUG_MODE: 'false', LOG_LEVEL: 'error' },
          api: { API_URL: 'https://api.example.com/api', API_KEY: 'prod_api_key' },
          database: { DB_HOST: 'prod-db.example.com', DB_PORT: '5432', DB_NAME: 'myapp_prod', DB_USERNAME: 'prod_user', DB_PASSWORD: 'prod_password' },
          custom: {}
        }
      };
    }
    return settings.docker.environments;
  };

  const environments = initializeEnvironments();

  const updateEnvironmentConfig = (env: 'dev' | 'staging' | 'prod', section: string, key: string, value: string) => {
    const updatedEnvironments = {
      ...environments,
      [env]: {
        ...environments[env],
        [section]: {
          ...environments[env][section as keyof EnvironmentConfig],
          [key]: value
        }
      }
    };

    onUpdateSettings({
      ...settings,
      docker: {
        ...settings.docker,
        environments: updatedEnvironments
      }
    });
  };

  const addCustomVariable = () => {
    if (!newCustomKey.trim() || !newCustomValue.trim()) {
      toast({
        title: "오류",
        description: "키와 값을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    updateEnvironmentConfig(activeEnvironment, 'custom', newCustomKey.trim(), newCustomValue.trim());
    setNewCustomKey('');
    setNewCustomValue('');
    
    toast({
      title: "추가됨",
      description: "사용자 정의 환경변수가 추가되었습니다.",
    });
  };

  const removeCustomVariable = (key: string) => {
    const updatedCustom = { ...environments[activeEnvironment].custom };
    delete updatedCustom[key];

    const updatedEnvironments = {
      ...environments,
      [activeEnvironment]: {
        ...environments[activeEnvironment],
        custom: updatedCustom
      }
    };

    onUpdateSettings({
      ...settings,
      docker: {
        ...settings.docker,
        environments: updatedEnvironments
      }
    });

    toast({
      title: "삭제됨",
      description: "환경변수가 삭제되었습니다.",
    });
  };

  const renderEnvironmentSettings = (env: 'dev' | 'staging' | 'prod') => {
    const config = environments[env];

    return (
      <div className="space-y-6">
        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Application 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`${env}-app-version`}>APP_VERSION</Label>
              <Input
                id={`${env}-app-version`}
                value={config.application.APP_VERSION}
                onChange={(e) => updateEnvironmentConfig(env, 'application', 'APP_VERSION', e.target.value)}
                placeholder="1.0.0"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-debug-mode`}>DEBUG_MODE</Label>
              <Input
                id={`${env}-debug-mode`}
                value={config.application.DEBUG_MODE}
                onChange={(e) => updateEnvironmentConfig(env, 'application', 'DEBUG_MODE', e.target.value)}
                placeholder="true/false"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-log-level`}>LOG_LEVEL</Label>
              <Input
                id={`${env}-log-level`}
                value={config.application.LOG_LEVEL}
                onChange={(e) => updateEnvironmentConfig(env, 'application', 'LOG_LEVEL', e.target.value)}
                placeholder="debug/info/warn/error"
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              API 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`${env}-api-url`}>API_URL</Label>
              <Input
                id={`${env}-api-url`}
                value={config.api.API_URL}
                onChange={(e) => updateEnvironmentConfig(env, 'api', 'API_URL', e.target.value)}
                placeholder="http://localhost:8080/api"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-api-key`}>API_KEY</Label>
              <Input
                id={`${env}-api-key`}
                type="password"
                value={config.api.API_KEY}
                onChange={(e) => updateEnvironmentConfig(env, 'api', 'API_KEY', e.target.value)}
                placeholder="your-api-key"
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              DB 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`${env}-db-host`}>DB_HOST</Label>
              <Input
                id={`${env}-db-host`}
                value={config.database.DB_HOST}
                onChange={(e) => updateEnvironmentConfig(env, 'database', 'DB_HOST', e.target.value)}
                placeholder="localhost"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-db-port`}>DB_PORT</Label>
              <Input
                id={`${env}-db-port`}
                value={config.database.DB_PORT}
                onChange={(e) => updateEnvironmentConfig(env, 'database', 'DB_PORT', e.target.value)}
                placeholder="5432"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-db-name`}>DB_NAME</Label>
              <Input
                id={`${env}-db-name`}
                value={config.database.DB_NAME}
                onChange={(e) => updateEnvironmentConfig(env, 'database', 'DB_NAME', e.target.value)}
                placeholder="myapp"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-db-username`}>DB_USERNAME</Label>
              <Input
                id={`${env}-db-username`}
                value={config.database.DB_USERNAME}
                onChange={(e) => updateEnvironmentConfig(env, 'database', 'DB_USERNAME', e.target.value)}
                placeholder="postgres"
              />
            </div>
            <div>
              <Label htmlFor={`${env}-db-password`}>DB_PASSWORD</Label>
              <Input
                id={`${env}-db-password`}
                type="password"
                value={config.database.DB_PASSWORD}
                onChange={(e) => updateEnvironmentConfig(env, 'database', 'DB_PASSWORD', e.target.value)}
                placeholder="password"
              />
            </div>
          </CardContent>
        </Card>

        {/* Custom Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 정의 환경변수</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add new custom variable */}
            <div className="flex gap-2">
              <Input
                placeholder="변수명 (예: CUSTOM_CONFIG)"
                value={newCustomKey}
                onChange={(e) => setNewCustomKey(e.target.value)}
              />
              <Input
                placeholder="값"
                value={newCustomValue}
                onChange={(e) => setNewCustomValue(e.target.value)}
              />
              <Button onClick={addCustomVariable} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Display existing custom variables */}
            {Object.entries(config.custom).map(([key, value]) => (
              <div key={key} className="flex gap-2 items-center">
                <Input value={key} disabled className="bg-muted" />
                <Input
                  value={value}
                  onChange={(e) => updateEnvironmentConfig(env, 'custom', key, e.target.value)}
                />
                <Button 
                  onClick={() => removeCustomVariable(key)} 
                  size="icon" 
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeEnvironment} onValueChange={(value) => setActiveEnvironment(value as 'dev' | 'staging' | 'prod')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dev">Development</TabsTrigger>
          <TabsTrigger value="staging">Staging</TabsTrigger>
          <TabsTrigger value="prod">Production</TabsTrigger>
        </TabsList>

        <TabsContent value="dev">
          {renderEnvironmentSettings('dev')}
        </TabsContent>

        <TabsContent value="staging">
          {renderEnvironmentSettings('staging')}
        </TabsContent>

        <TabsContent value="prod">
          {renderEnvironmentSettings('prod')}
        </TabsContent>
      </Tabs>
    </div>
  );
};
