
export interface Permission {
  id: string;
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
  name: string;
  email: string;
  role: "operator" | "manager" | "supermanager" | "developer";
}
