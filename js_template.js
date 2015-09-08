;(function  ($) {
    var reg = /<%([^%>]+)?%>/g;
    var code = "var r =[];" + "\n";
    var regOut = /(^([\s\r\t\n]?)?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var regOut = /^(\s)?(if|for|else|switch|case|break|{|})+(.*)?/g;
    var regOut = /(^(\s))?(if|for|else|switch|case|break|{|})+/g;
    var match,cursor = 0 ;
    var add = function  (line, flag) {
        flag ?
                (code += line.match(regOut) ? line+'\n' : 'r.push(' + line + ');\n')
            :   (code += (line != "" ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : ''));
        //code += (line != "" ? 'r.push(' + line.replace(/"/g,'\\"') + ');\n' : '');
        return add;
    }
    var myTplEng = function  (tpl, data) {
        tpl = tpl.trim();
        while (match = reg.exec(tpl)) {
            add(tpl.slice(cursor, match.index));// <span></span>
            add(match[1],true);
            cursor = match.index + match[0].length;
        }
        code += 'return r.join("")';
        var funstr = code.replace(/[\r\t\n]/g, '');
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
        //return new Function(code.replace([\r\t\n], ""), '').apply(data);
    }
    window.myTplEng = myTplEng;
})(jQuery,window);
