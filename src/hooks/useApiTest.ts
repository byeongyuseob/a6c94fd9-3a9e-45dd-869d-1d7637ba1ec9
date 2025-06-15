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
      // 권한 API 처리
      if (endpoint.includes("permissions")) {
        // 특정 사용자 권한 조회(프로필 상세)
        if (endpoint.includes("{userId}") && customParams.include?.includes("profile")) {
          mockData = {
            data: {
              id: "1",
              name: "Jung Regular",
              role: "regular",
              email: "kim.regular@example.com",
              employeeId: "EMP001",
              profile: {
                position: "Software Engineer",
                department: "IT Dept.",
                phone: "+82-10-1111-2222",
                joinedAt: "2024-01-15",
                address: "서울 강남구"
              },
              createdAt: "2024-01-15T09:00:00Z",
              lastLogin: "2024-06-14T14:30:00Z"
            },
            meta: {
              apiVersion: version,
              requestedAt: new Date().toISOString()
            }
          };
        }
        // 역할별 권한 조회
        else if (endpoint.includes("byRole")) {
          mockData = {
            data: [
              {
                role: "regular",
                count: 3,
                members: [
                  { id: "1", name: "Jung Regular", employeeId: "EMP001" }
                ]
              },
              {
                role: "contract",
                count: 2,
                members: [
                  { id: "2", name: "Lee Contract", employeeId: "EMP002" }
                ]
              },
              {
                role: "manager",
                count: 1,
                members: [
                  { id: "3", name: "Park Manager", employeeId: "EMP003" }
                ]
              },
              {
                role: "supermanager",
                count: 1,
                members: [
                  { id: "4", name: "Choi Supermanager", employeeId: "EMP004" }
                ]
              },
              {
                role: "developer",
                count: 2,
                members: [
                  { id: "5", name: "Jung Developer", employeeId: "EMP005" }
                ]
              }
            ],
            meta: {
              apiVersion: version,
              requestedAt: new Date().toISOString()
            }
          };
        }
        // 전체 권한 목록 조회 등
        else {
          mockData = {
            data: [
              {
                id: "1",
                name: "Jung Regular",
                role: "regular",
                email: "kim.regular@example.com",
                employeeId: "EMP001",
                createdAt: "2024-01-15T09:00:00Z",
                lastLogin: "2024-06-14T14:30:00Z"
              },
              {
                id: "2",
                name: "Lee Contract",
                role: "contract",
                email: "lee.contract@example.com",
                employeeId: "EMP002",
                createdAt: "2024-01-21T09:00:00Z",
                lastLogin: "2024-06-13T14:12:00Z"
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
        }
      }
      // ... keep existing code (else: secrets/env mock, etc) the same ...
      else {
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
