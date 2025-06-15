
import { Badge } from "@/components/ui/badge";
interface Props {
  response: {
    status: number;
    statusText: string;
    data: any;
    headers: Record<string, string>;
  }
}

export const ApiTestPanelResponse = ({ response }: Props) => (
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
);
