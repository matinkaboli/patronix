import crypto from 'crypto';

const encrypt = (text, key) => {
  const cipher =
    crypto.createCipher('aes-256-cbc', `${key}<C5}!E%(_-Y)?:]@[6@~[<1o|`);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text, key) => {
  const decipher =
    crypto.createDecipher('aes-256-cbc', `${key}<C5}!E%(_-Y)?:]@[6@~[<1o|`);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export default {
  encrypt,
  decrypt
};
