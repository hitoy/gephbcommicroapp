var baseurl = 'https://m.gephb.com'; //补全零

var addzero = function(num){
    if(num < 10) num = '0' + num;
    return num.toString();
};


//截取文字
var substr = function(string, start, length){
    if(!length) var length = string.length - start;
    if(start < 0) var start = string.length + start;
    var stop = start + length;
    if(string) return string.substring(start, stop);
    return string;
};

//把html实体转化为字符
var entitydecode = function(string){
    var map = {
        '&nbsp;': ' ',
        '&quot;': '"',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&euro;': '€',
        '&sbquo;': '‚',
        '&fnof;': 'ƒ',
        '&bdquo;': '„',
        '&hellip;': '…',
        '&dagger;': '†',
        '&Dagger;': '‡',
        '&circ;': 'ˆ',
        '&permil;': '‰',
        '&Scaron;': 'Š',
        '&lsaquo;': '‹',
        '&OElig;': 'Œ',
        '&Zcaron;': 'Ž',
        '&lsquo;': '‘',
        '&rsquo;': '’',
        '&ldquo;': '“',
        '&rdquo;': '”',
        '&bull;': '•',
        '&ndash;': '–',
        '&mdash;': '—',
        '&tilde;': '˜',
        '&trade;': '™',
        '&scaron;': 'š',
        '&rsaquo;': '›',
        '&oelig;': 'œ',
        '&zcaron;': 'ž',
        '&Yuml;': 'Ÿ',
        '&middot': '·',
        '&prime;': '′',
        '&Prime;': '″',
        '&oline;': '‾',
        '&euro;': '€',
        '&trade;': '™',
        '&larr;': '←',
        '&uarr;': '↑',
        '&rarr;': '→',
        '&darr;': '↓',
        '&harr;': '↔',
        '&crarr;': '↵',
        '&lceil;': '⌈',
        '&rceil;': '⌉',
        '&lfloor;': '⌊',
        '&rfloor;': '⌋',
        '&loz;': '◊',
        '&spades;': '♠',
        '&clubs;': '♣',
        '&hearts;': '♥',
        '&diams;': '♦',
        '&laquo;': '«',
        '&raquo;': '»',
        '&reg;': '®',
        '&copy;': '©',
        '&uml;': '¨',
        '&not;': '¬',
        '&macr;': '¯',
        '&deg;': '°',
        '&plusmn;': '±',
        '&iquest;': '¿',
        '&times;': '×',
        '&divide;': '÷'
    };
    var reg = getRegExp('&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});', 'ig');
    return string.replace(reg, function(m){
            if(map[m]){
            return map[m];
            }

            return m;
            });
};

//补全格式化网址
var absurl = function(url){
    if(!url || url.indexOf('http') === 0){
        return url;
    }

    return baseurl + url;
};

//格式化时间
var formatDate = function(format, seconds){
    var d = getDate(seconds * 1000);
    var finds = ['Y', 'm', 'n', 'd', 'j', 'H', 'i', 's'];
    var replace = [addzero(d.getFullYear()), addzero(d.getMonth() + 1),(d.getMonth() + 1).toString(), addzero(d.getDate()), d.getDate().toString(), addzero(d.getHours()), addzero(d.getMinutes()), addzero(d.getSeconds())];
    finds.forEach(function(el, index){
            format = format.replace(el, replace[index]);
            });
    return format;
};

//格式化播放时间
var formatDuration = function(seconds){
    seconds = parseInt(seconds);
    var duration = '';

    if(seconds > 3600){
        var hour = Math.floor(seconds / 3600);
        seconds = seconds - hour * 3600;
        duration = addzero(hour) + ':';
    }

    var minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    duration = duration + addzero(minutes) + ':' + addzero(seconds);
    return duration;
};

//格式化html文本，增加class名，便于样式控制
var formatHtml = function(html){
    var prefix = 'node';
    if(!html) return html;

    //对标题进行处理
    var reg = getRegExp('<h\d[^>]*>', 'ig');
    var newContent = html.replace(reg, function(match, capture){
        var level = match.match(getRegExp('<h(\d)', 'i'));
        var title = '';

        if(level){
        title = '<h' + level[1] + '>';
        }

        return title;
    });

    //对图片进行处理
    var reg = getRegExp('<img[^>]*>', 'ig');
    newContent = newContent.replace(reg, function(match, capture){
        var src = match.match(getRegExp('src=["\']([^\'"]+)["\']', 'i')) || '';
        var title = match.match(getRegExp('title=["\']([^\'"]+)["\']', 'i')) || '';
        var alt = match.match(getRegExp('alt=["\']([^\'"]+)["\']', 'i')) || '';
        var width = match.match(getRegExp('width=["\'](\d+)["\']', 'i')) || '';
        var height = match.match(getRegExp('height=["\'](\d+)["\']', 'i')) || '';

        var attrs = '';
        if(title)
            attrs =  ' title="'+ title[1] +'"';
        if(alt)
            attrs +=  ' alt="'+ alt[1] +'"';
        if(width)
            attrs +=  ' width="'+ width[1] +'"';
        if(height)
            attrs +=  ' height="'+ height[1] +'"';

        if(src[1] && substr(src[1], -4) == '.gif'){
            return '<img src="' + absurl(src[1]) + '"' + attrs +'>';
        }else if(src[1]){
            return '<img src="' + absurl(src[1]) + '/500"' + attrs +'>';
        }

        return '';
    });

    //对视频进行处理
    var reg = getRegExp('<video[^>]*>.*?<\/video>', 'img');
    newContent = newContent.replace(reg, function(match, capture){
        var src = match.match(getRegExp('src=["\']([^\'"]+)["\']', 'i')) || '';
        var width = match.match(getRegExp('width=["\'](\d+)["\']', 'i')) || '';
        var height = match.match(getRegExp('height=["\'](\d)["\']', 'i')) || '';

        if(src[1]){
            return '<video src="' + absurl(src[1]) + '" ' + width + ' ' + height + ' preload controls></video>';
        }

            return '';
    });

    //给标签添加classs，并保留其他属性
    var reg = getRegExp('<[^\/][^>]*>', 'img');
    newContent = newContent.replace(reg, function(match, capture){
        var tagmatch = match.match(getRegExp('^<([^ >\/]*)([^>]*)>', 'i'));
        var tag = tagmatch[1];
        var attrstr = tagmatch[2];

        var classname = false;
        var classreg = getRegExp('class[\s\t\r\n]*=[\s\t\r\n]*["\']([^"\']*)["\']', 'i');
        attrstr = attrstr.replace(classreg, function(m, c){
            var classmatch = m.match(classreg);
            classname = classmatch[1];
            return 'class="' + classname + ' ' + prefix + '-' + tag + '"';
        });

        if(!classname){
            attrstr = ' class="' + prefix + '-' + tag + '"' + attrstr;
        }
        return '<' + tag + attrstr + '>';
    });

    //清除空行和换行
    newContent = newContent.replace(getRegExp('<br[^>]*\/>', 'ig'), '');
    newContent = newContent.replace(getRegExp('<p[^>]*><\/p>', 'ig'), ''); //实体转化

    newContent = entitydecode(newContent);
    return newContent;
};

//清除所有html格式
var strip_tags = function(html){
    var tagreg = getRegExp('<[^>]+>', 'ig');

    if(html){
        return html.replace(tagreg, '');
    }
};

module.exports = {
    substr: substr,
    absurl: absurl,
    formatDate: formatDate,
    formatDuration: formatDuration,
    formatHtml: formatHtml,
    strip_tags: strip_tags
};
