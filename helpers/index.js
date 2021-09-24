import jwtDecode from 'jwt-decode';
const cookieparser = require('cookieparser');

export function getUserFromCookie(req) {
  // cookieが無い場合
  if (!req.headers.cookie) {
    return console.log('cookieなし');
  }
  // cookieがある場合トークンを作成
  if (req.headers.cookie) {
   //Cookieを解析するためcookieparserというミドルウェアで解析
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;
    if (!accessTokenCookie) return;
    const decodedToken = jwtDecode(accessTokenCookie); // ③
    if (!decodedToken) return;
    return decodedToken;
  }
}
