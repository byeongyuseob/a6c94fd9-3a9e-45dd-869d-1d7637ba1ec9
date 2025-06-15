
export const getRoleColor = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-purple-100 text-purple-800";
    case "admin":
      return "bg-blue-100 text-blue-800";
    case "member":
      return "bg-green-100 text-green-800";
    case "viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case "owner":
      return "소유자";
    case "admin":
      return "관리자";
    case "member":
      return "멤버";
    case "viewer":
      return "뷰어";
    default:
      return "알 수 없음";
  }
};

export const getDefaultPermissions = (role: "owner" | "admin" | "member" | "viewer") => {
  return {
    read: true,
    write: role !== "viewer",
    delete: role === "admin" || role === "owner",
    manage: role === "owner",
  };
};
