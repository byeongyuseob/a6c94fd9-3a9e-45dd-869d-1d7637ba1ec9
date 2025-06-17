
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { ApiTestPanelRequestDetails } from "@/components/ApiTestPanelRequestDetails";
import { ApiTestPanelResponse } from "@/components/ApiTestPanelResponse";
import { useApiTest } from "@/hooks/useApiTest";
import type { ApiTestPanelProps } from "@/types/apiTest";

export const ApiTestPanel = ({
  title, endpoint, description, queryParams = {}, version = "v1"
}: ApiTestPanelProps) => {
  const headers = {
    "Accept": "application/json",
    "User-Agent": "Lovable-ApiTest/1.0"
  };

  const {
    response, loading, customParams,
    buildUrl, handleTest, copyToClipboard, updateParam
  } = useApiTest(endpoint, headers, version, queryParams);

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
        <ApiTestPanelRequestDetails
          buildUrl={buildUrl}
          endpoint={endpoint}
          version={version}
          customParams={customParams}
          updateParam={updateParam}
          headers={headers}
          copyToClipboard={copyToClipboard}
        />

        <Button onClick={handleTest} disabled={loading} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          {loading ? "조회 중..." : "데이터 조회"}
        </Button>

        {response && <ApiTestPanelResponse response={response} />}
      </CardContent>
    </Card>
  );
};
