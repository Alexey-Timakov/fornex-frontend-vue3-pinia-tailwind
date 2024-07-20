import type { TBackup } from "./fetchData";

export const saveCurrentSession = (user: string, state: TBackup[]) => {
  const data = JSON.stringify(state);
  localStorage.setItem("user", user);
  localStorage.setItem("userData", data);
}

const checkIsBuckups = (data: any): data is TBackup[] => {
  if (Array.isArray(data) && data.length && "id" in data[0]) {
    return true
  }
  else return false
}

export const checkUserInLs = (user: string): boolean => {
  const check = localStorage.getItem("user");
  if (check && check === user) {
    return true
  }
  return false
}

export const loadPrevSession = (): TBackup[] | null => {
  const lsData = localStorage.getItem("userData");

  if (!lsData) {
    return null
  }

  const data = JSON.parse(lsData)

  if (checkIsBuckups(data)) {
    return data
  }

  else return null
}

export const logoutFromSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userData");
}