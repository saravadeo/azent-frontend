export class Utils {
    static isValidURL(urlStr) {
        return urlStr.indexOf("http://") === 0 || urlStr.indexOf("https://") === 0;
    }
}