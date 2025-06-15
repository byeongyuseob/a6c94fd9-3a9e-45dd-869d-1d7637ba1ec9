
export interface Permission {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: "operator" | "manager" | "supermanager" | "developer";
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manage: boolean;
  };
  lastActive: string;
}

export interface NewUser {
  employeeId: string;
  name: string;
  email: string;
  role: "operator" | "manager" | "supermanager" | "developer";
}
