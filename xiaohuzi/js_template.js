/**
 * [version_1_0_1 实现基本的替换功能]
 * @param  {[type]} tpl  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
var version_1_0_1 = function  (tpl, data) {
    return tpl && tpl.replace(/<%([^%>]+)?%>/g, function (s0,s1) {
        return data[s1];
    });
}

/**
 * [version_1_0_2 解觉引入object数据结构的问题]
 * @param  {[type]} tpl  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
var version_1_0_2 = function  (tpl, data) {
    return tpl && tpl.replace(/<%([^%>]+)?%>/g, function (s0, s1) {
        var result = '';
        var curData = data;
        if (s1 && String(s1).indexOf('.') > -1) {
            var arrKeys = String(s1).split('.');
            while (key = arrKeys.shift()) {
                result = result ? result[key] : data[key];
            }
        }
        else {
            result = data[s1];
        }
        return result;
    });
}


var tplEngine_0 = function(tpl, data){
    var reg = /<%([^%>]+)?%>/g,
            code = 'var r=[];\n',
            cursor = 0;  //主要的作用是定位代码最后一截
    var add = function(line) {
        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    };

    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index)); //添加非逻辑部分
        add(match[1]);  //添加逻辑部分 match[0] = "<%" + match[1] + "%>";
        cursor = match.index + match[0].length;
    }

    add(tpl.substr(cursor, tpl.length - cursor)); //代码的最后一截 如:" years old."

    code += 'return r.join("");'; // 返回结果，在这里我们就拿到了装入数组后的代码
    console.log(code);

    return tpl;
};


var tplEngine = function(tpl, data2) {
    var reg = /<%([^%>]+)?%>/g,
        regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;

    var add = function(line, js) {
        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data2);
};

var tpl = '<% for(var i = 0; i < this.posts.length; i++) {' +　
        'var post = this.posts[i]; %>' +
        '<% if(!post.expert){ %>' +
            '<span>post is null</span>' +
        '<% } else { %>' +
            '<a href="#"><% post.expert %> at <% post.time %></a>' +
        '<% } %>' +
    '<% } %>';

var data2 = {
    "posts": [{
        "expert": "content 1",
        "time": "yesterday"
    },{
        "expert": "content 2",
        "time": "today"
    },{
        "expert": "content 3",
        "time": "tomorrow"
    },{
        "expert": "",
        "time": "eee"
    }]
};

var res = tplEngine(tpl, data2);





















