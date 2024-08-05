export default function img(name: string) {
    let baseURL = getBaseURl();
    if (baseURL.length > 0) {
        baseURL = '/' + baseURL;
    }
    return `${baseURL}/images/${name}`;
}

function getBaseURl() {
    const baseURL = sessionStorage.baseURL
    if (baseURL) {
        let  websockerURL = removeQuotes(baseURL);
        return websockerURL;
    }
    return ''
}

function removeQuotes(str: string) {
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
      return str.substring(1, str.length - 1);
    }
    return str;
}
