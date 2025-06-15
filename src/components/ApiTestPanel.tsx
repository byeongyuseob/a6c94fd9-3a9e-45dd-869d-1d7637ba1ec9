
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Play, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiTestPanelProps {
  title: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  description: string;
}

export const ApiTestPanel = ({ 
  title, 
  endpoint, 
  method, 
  headers, 
  body, 
  description 
}: ApiTestPanelProps) => {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-jwt-token",
    ...headers
  };

  const requestData = {
    method,
    url: endpoint,
    headers: defaultHeaders,
    ...(body && { data: body })
  };

  const handleTest = async () => {
    setLoading(true);
    
    // 시뮬레이션된 응답
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: "OK",
        data: method === "GET" ? (
          endpoint.includes("permissions") ? {
            permissions: [
              { id: "1", name: "김개발", role: "admin", email: "kim@example.com" },
              { id: "2", name: "이디자인", role: "editor", email: "lee@example.com" }
            ],
            total: 2
          } : {
            settings: {
              docker: {
                environments: {
                  dev: { application: { APP_VERSION: "1.0.0-dev" } }
                }
              },
              secrets: { apiKeys: [] }
            }
          }
        ) : { success: true, message: "요청이 성공적으로 처리되었습니다." },
        headers: {
          "content-type": "application/json",
          "x-request-id": "req_123456789"
        }
      };
      
      setResponse(mockResponse);
      setLoading(false);
      
      toast({
        title: "API 테스트 완료",
        description: `${method} ${endpoint} - 200 OK`,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Request Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant={method === "GET" ? "secondary" : "default"}>
              {method}
            </Badge>
            <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint}</code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(endpoint)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Headers */}
          <div>
            <h4 className="text-sm font-medium mb-2">Headers</h4>
            <div className="bg-muted p-3 rounded-lg">
              <pre className="text-xs">
{JSON.stringify(defaultHeaders, null, 2)}
              </pre>
            </div>
          </div>

          {/* Request Body (if applicable) */}
          {body && (
            <div>
              <h4 className="text-sm font-medium mb-2">Request Body</h4>
              <div className="bg-muted p-3 rounded-lg">
                <pre className="text-xs">
{JSON.stringify(body, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* cURL Command */}
          <div>
            <h4 className="text-sm font-medium mb-2">cURL 명령어</h4>
            <div className="bg-muted p-3 rounded-lg relative">
              <pre className="text-xs pr-8">
{`curl -X ${method} "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-jwt-token"${body ? ` \\\n  -d '${JSON.stringify(body)}'` : ''}`}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(`curl -X ${method} "${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token"${body ? ` -d '${JSON.stringify(body)}'` : ''}`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Test Button */}
        <Button onClick={handleTest} disabled={loading} className="w-full">
          <Play className="h-4 w-4 mr-2" />
          {loading ? "테스트 중..." : "API 테스트 실행"}
        </Button>

        {/* Response */}
        {response && (
          <div>
            <h4 className="text-sm font-medium mb-2">응답</h4>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{response.status}</Badge>
                <span className="text-sm text-muted-foreground">{response.statusText}</span>
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
