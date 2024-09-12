const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.HASHING_KEY);

const encrypt = (string) => {
    return cryptr.encrypt(string);
}

const decrypt = (string) => {
    return cryptr.decrypt(string);
}

module.exports = {encrypt, decrypt}