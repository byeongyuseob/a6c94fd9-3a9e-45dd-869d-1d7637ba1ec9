
import { useState } from "react";
import type { ApiTestResponse } from "@/types/apiTest";
import { useToast } from "@/hooks/use-toast";

export function useApiTest(
  endpoint: string,
  headers: Record<string, string>,
  version: string,
  queryParams: Record<string, string>
) {
  const { toast } = useToast();
  const [response, setResponse] = useState<ApiTestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [customParams, setCustomParams] = useState<Record<string, string>>(queryParams);

  const buildUrl = () => {
    const params = new URLSearchParams();
    Object.entries(customParams).forEach(([key, value]) => {
      if (value.trim()) params.append(key, value);
    });
    const queryString = params.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  };

  const handleTest = async () => {
    setLoading(true);

    setTimeout(() => {
      let mockData, status = 200, statusText = "OK";
      if (endpoint.includes("permissions")) {
        mockData = {
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
          paging: {
            page: customParams.page ? Number(customParams.page) : 1,
            limit: customParams.limit ? Number(customParams.limit) : 10,
            total: 2,
            totalPages: 1
          },
          meta: {
            apiVersion: version,
            requestedAt: new Date().toISOString()
          }
        };
      } else {
        mockData = {
          data: {
            environments: {
              dev: { application: { appVersion: "1.0.0-dev", debugMode: "true", logLevel: "debug" } },
              staging: { application: { appVersion: "1.0.0-rc", debugMode: "true", logLevel: "info" } },
              production: { application: { appVersion: "1.0.0", debugMode: "false", logLevel: "info" } }
            },
            secrets: { count: 3, lastUpdated: "2024-06-10T12:00:00Z" }
          },
          meta: {
            apiVersion: version,
            requestedAt: new Date().toISOString()
          }
        };
      }
      const mockResponse: ApiTestResponse = {
        status,
        statusText,
        data: mockData,
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

  return {
    response,
    loading,
    customParams,
    buildUrl,
    handleTest,
    copyToClipboard,
    updateParam
  };
}
