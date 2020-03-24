// tslint:disable
const TokenKey = 'X-Token';

export default function getToken() {
    let token: any = '';
    const requestParams: any = GetRequest();
    if (requestParams != null && requestParams.token !== '' && requestParams.token !== undefined) {
        token = requestParams.token;
        setToken(requestParams.token);
    }
    if (!token || token === 'undefined' || token === null || token === '') {
        token = localStorage.getItem(TokenKey);
    }
    return token;
}

export function setToken(token: string) {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}

export function GetRequest() {
    const url = location.href; // 获取url中"?"符后的字串

    const requestParams: any = {};
    if (url.indexOf('?') !== -1) {
        const str = url.substr(url.indexOf('?') + 1);
        const strs: any = str.split('&');
        // for (const s of strs) {
        //     requestParams[s.split('=')[0]] = unescape(s.split('=')[1]);
        // }
        for (let i = 0; i < strs.length; i++) {
            requestParams[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
    }
    return requestParams;
}
