
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Play, Code, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiTestPanelProps {
  title: string;
  endpoint: string;
  description: string;
  queryParams?: Record<string, string>;
  version?: string;
}

export const ApiTestPanel = ({ 
  title, 
  endpoint, 
  description,
  queryParams = {},
  version = "v1"
}: ApiTestPanelProps) => {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customParams, setCustomParams] = useState<Record<string, string>>(queryParams);

  const headers = {
    "Accept": "application/json",
    "Authorization": "Bearer your-jwt-token",
    "X-API-Version": version,
    "User-Agent": "Lovable-ApiTest/1.0"
  };

  const buildUrl = () => {
    const params = new URLSearchParams();
    Object.entries(customParams).forEach(([key, value]) => {
      if (value.trim()) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  };

  const handleTest = async () => {
    setLoading(true);
    
    // 시뮬레이션된 응답
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: "OK",
        data: endpoint.includes("permissions") ? {
          data: [
            { 
              id: "1", 
              name: "김개발", 
              role: "admin", 
              email: "kim@example.com",
              employeeId: "EMP001",
              createdAt: "2024-01-15T09:00:00Z",
              lastLogin: "2024-06-14T14:30:00Z"
            },
            { 
              id: "2", 
              name: "이디자인", 
              role: "editor", 
              email: "lee@example.com",
              employeeId: "EMP002",
              createdAt: "2024-01-20T10:15:00Z",
              lastLogin: "2024-06-13T16:45:00Z"
            }
          ],
          pagination: {
            total: 2,
            page: 1,
            limit: 10,
            totalPages: 1
          },
          meta: {
            version: version,
            timestamp: new Date().toISOString()
          }
        } : {
          data: {
            docker: {
              environments: {
                dev: { 
                  application: { 
                    APP_VERSION: "1.0.0-dev",
                    DEBUG_MODE: "true",
                    LOG_LEVEL: "debug"
                  }
                },
                prod: {
                  application: {
                    APP_VERSION: "1.0.0",
                    DEBUG_MODE: "false",
                    LOG_LEVEL: "info"
                  }
                }
              }
            },
            secrets: { 
              count: 3,
              lastUpdated: "2024-06-10T12:00:00Z"
            }
          },
          meta: {
            version: version,
            timestamp: new Date().toISOString()
          }
        },
        headers: {
          "content-type": "application/json",
          "x-request-id": "req_" + Math.random().toString(36).substr(2, 9),
          "x-api-version": version,
          "x-ratelimit-remaining": "99"
        }
      };
      
      setResponse(mockResponse);
      setLoading(false);
      
      toast({
        title: "API 조회 완료",
        description: `GET ${buildUrl()} - 200 OK`,
      });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "복사됨",
      description: "클립보드에 복사되었습니다.",
    });
  };

  const updateParam = (key: string, value: string) => {
    setCustomParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          {title}
          <Badge variant="outline">API {version}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Request Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-muted px-2 py-1 rounded flex-1">{buildUrl()}</code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(buildUrl())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Query Parameters */}
          <div>
            <h4 className="text-sm font-medium mb-2">쿼리 파라미터</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(customParams).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="text-xs">{key}</Label>
                  <Input
                    id={key}
                    value={value}
                    onChange={(e) => updateParam(key, e.target.value)}
                    placeholder={`${key} 값 입력`}
                    className="h-8 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Headers */}
          <div>
            <h4 className="text-sm font-medium mb-2">요청 헤더</h4>
            <div className="bg-muted p-3 rounded-lg">
              <pre className="text-xs">
{JSON.stringify(headers, null, 2)}
              </pre>
            </div>
          </div>

          {/* cURL Command */}
          <div>
            <h4 className="text-sm font-medium mb-2">cURL 명령어</h4>
            <div className="bg-muted p-3 rounded-lg relative">
              <pre className="text-xs pr-8">
{`curl -X GET "${buildUrl()}" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer your-jwt-token" \\
  -H "X-API-Version: ${version}" \\
  -H "User-Agent: Lovable-ApiTest/1.0"`}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(`curl -X GET "${buildUrl()}" -H "Accept: application/json" -H "Authorization: Bearer your-jwt-token" -H "X-API-Version: ${version}" -H "User-Agent: Lovable-ApiTest/1.0"`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <Button onClick={handleTest} disabled={loading} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          {loading ? "조회 중..." : "데이터 조회"}
        </Button>

        {/* Response */}
        {response && (
          <div>
            <h4 className="text-sm font-medium mb-2">응답 결과</h4>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{response.status}</Badge>
                <span className="text-sm text-muted-foreground">{response.statusText}</span>
                <Badge variant="outline" className="text-xs">
                  API {response.headers["x-api-version"]}
                </Badge>
              </div>
              <pre className="text-xs whitespace-pre-wrap">
{JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
