/*
 * 远程请求库
 */

function savecookie(cookie){
    if(!cookie) return;
    var now = new Date().getTime();
    var cookiename = '';
    var cookievalue = '';
    var expires = '';
    cookie.split(';').forEach(function(obj, index){
        var obj = obj.trim();
        var objarr = obj.split('=');
        var key = objarr[0];
        var value = objarr[1] || '';
        if(index == 0){
            cookiename = key;
            cookievalue = decodeURIComponent(value);
        }
        if(key.toLowerCase() == 'expires'){
            expires = new Date(value).getTime();
        }
    });
    tt.getStorage({
        key: 'cookies',
        success: function(result){
            var cookies = result.data || [];
            var replaceindex = false;
            cookies.forEach(function(cookie, index){
                if(cookie.name == cookiename){
                    replaceindex = index;
                }
            });
            if(replaceindex !== false){
                cookies[replaceindex] = {
                    name: cookiename,
                    value: cookievalue,
                    expires: expires
                }
            }else{
                cookies.push({
                    name: cookiename,
                    value: cookievalue,
                    expires: expires
                });
            }
            cookies = cookies.filter(function(cookie){
                return cookie.expires > now;
            });
            tt.setStorage({
                key: 'cookies',
                data: cookies
            });
        },
        fail: function(result){
            let cookies = [{
                name: cookiename,
                value: cookievalue,
                expires: expires
            }];
            tt.setStorage({
                key: 'cookies',
                data: cookies
            });
        }
    });
}

function cookieheader(){
    var cookies = tt.getStorageSync('cookies');
    if(!cookies) return 'microapp=bytedance';

    var strings = '';
    cookies.forEach(function(cookie){
        strings += cookie.name + '=' + encodeURIComponent(cookie.value) + '; ';
    });
    return strings.replace(/; $/, '');
}

function asyncRequest() {
    if(arguments.length == 1){
        var url = arguments[0];
        var data = Array();
        var method = 'GET';
    }else if(arguments.length == 2){
        var url = arguments[0];
        var data = arguments[1];
        var method = 'GET';
    }else if(arguments.length == 3){
        var url = arguments[0];
        var data = arguments[1];
        var method = arguments[2];
    }
    return new Promise(function(resolve, reject){
        tt.request({
            url: url,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cookieheader(),
            },
            data: data,
            dataType: 'string',
            method: method,
            success: function(response){
                let cookie = response.header['set-cookie'] || response.header['Set-Cookie'] || '';
                savecookie(cookie);
                resolve(response.data);
            },
            fail: function(res){
                reject(res);
            }
        });
    });
}

function get(url, data){
    return asyncRequest(url, data, 'GET');
}

function post(url, data){
    return asyncRequest(url, data, 'POST');
}

module.exports = {
    request: asyncRequest,
    get: get,
    post,
    post
};
