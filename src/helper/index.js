const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const TokenService = {
  getToken() {
    return getCookieValue(TOKEN_KEY);
  },

  setToken(token) {
    document.cookie = `${TOKEN_KEY}=${token}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`
  },

  removeToken() {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  getReFreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setReFreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken || '');
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
export default TokenService;