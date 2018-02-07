import { AES, enc } from 'crypto-js';

export const encrypt = (text, key) =>
  AES.encrypt(text, key).toString();

export const decrypt = (text, key) =>
  AES.decrypt(text, key).toString(enc.Utf8);
