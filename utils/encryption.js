// 按需引入 CryptoJS 需要的组件
const CryptoJS = require('crypto-js/core')
const Latin1 = require('crypto-js/enc-latin1')
const AES = require('crypto-js/aes')
const ZeroPadding = require('crypto-js/pad-zeropadding')
const Utf8 = require('crypto-js/enc-utf8')
const Base64 = require('crypto-js/enc-base64')
/*
 * 加密 解密
 */
const baseCryptoCode = "这一段文字用来做给路由加密的私钥"; // 这个私钥每个项目指定一个唯一。更换密钥，请确认16位

const getKeyHex = cryptoCode => Latin1.parse(cryptoCode || baseCryptoCode);

const getIvHex = () => Latin1.parse(baseCryptoCode);

/**
 * 加密
 * @param {String} key
 * @param {String} cryptoCode
 * @returns {string}
 */
export const getEncrypt = (key, cryptoCode) => {
    let keyHex = getKeyHex(cryptoCode);
    let ivHex = getIvHex();
    try {
        key = JSON.stringify(key);
    } catch (e) {
        console.warn(e);
    }
    return AES.encrypt(key, keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: ZeroPadding,
        iv: ivHex
    }).toString();
}

/**
 * 加密后转base64
 * @param {String}} key 
 * @param {String} cryptoCode 
 */
export const getEncryptToBase64 = (key, cryptoCode) => {
    let encryptStr = getEncrypt(key, cryptoCode);
    let wordArray = Utf8.parse(encryptStr);
    return Base64.stringify(wordArray);
}

/**
 * 解密
 * @param data
 * @returns {string}
 */
export const getDecrypt = data => {
    let keyHex = getKeyHex();
    let ivHex = getIvHex();
    let decrypted = AES.decrypt({
        ciphertext: Base64.parse(data)
    }, keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: ZeroPadding,
        iv: ivHex
    }).toString(Utf8);
    try {
        decrypted = JSON.parse(decrypted);
    } catch (e) {
        console.warn(e);
    }
    return decrypted
}

 /**
 * 对base64数据解密  先解析base64，在做解密
 * @param {String} data 
 * @returns {string}
 */
export const getDecryptByBase64 = data => {
    let parsedWordArray = Base64.parse(data);
    let decryptStr = parsedWordArray.toString(Utf8);
    return getDecrypt(decryptStr);
}
