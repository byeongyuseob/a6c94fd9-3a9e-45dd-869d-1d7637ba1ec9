
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  buildUrl: () => string;
  endpoint: string;
  version: string;
  customParams: Record<string, string>;
  updateParam: (key: string, value: string) => void;
  headers: Record<string, string>;
  copyToClipboard: (text: string) => void;
}

export const ApiTestPanelRequestDetails = ({
  buildUrl,
  version,
  customParams,
  updateParam,
  headers,
  copyToClipboard,
}: Props) => (
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
    <div>
      <h4 className="text-sm font-medium mb-2">요청 헤더</h4>
      <div className="bg-muted p-3 rounded-lg">
        <pre className="text-xs">
{JSON.stringify(headers, null, 2)}
        </pre>
      </div>
    </div>
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
          onClick={() => copyToClipboard(
            `curl -X GET "${buildUrl()}" -H "Accept: application/json" -H "Authorization: Bearer your-jwt-token" -H "X-API-Version: ${version}" -H "User-Agent: Lovable-ApiTest/1.0"`
          )}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
