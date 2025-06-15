
export interface Permission {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
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
  role: "owner" | "admin" | "member" | "viewer";
}
