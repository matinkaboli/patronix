import { HmacSHA512 as hmacal, enc } from 'crypto-js';

export const hmac = (text, key) =>
  hmacal(text, key).toString(enc.Base64);
