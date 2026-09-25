export const USER_TOKEN_KEY = "sj-user-token";

export function readUserToken() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(USER_TOKEN_KEY) || localStorage.getItem(USER_TOKEN_KEY) || "";
}

export function storeUserToken(token: string, remember: boolean) {
  sessionStorage.setItem(USER_TOKEN_KEY, token);
  if (remember) {
    localStorage.setItem(USER_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(USER_TOKEN_KEY);
  }
}

export function clearUserToken() {
  sessionStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_TOKEN_KEY);
}
