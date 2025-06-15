
export interface ApiTestPanelProps {
  title: string;
  endpoint: string;
  description: string;
  queryParams?: Record<string, string>;
  version?: string;
}
export interface ApiTestResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
}
