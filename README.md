# js_template
> js_template 的实现原理

- 1.正则抠出要匹配的内容
- 2.装入数组
- 3.分辨js逻辑部分
- 4.引擎函数
- 5.把data扔进去

> 主要是正则替换

```
//1
// out template
    <% for (var i = 0; i <this.list.length; i++) {
        var user = this.list[i];
        if (user.age < 10) {
            %>
            <span><%user.name%></span>
            <%
        }else {
            %>
            <span><%user.name%></span>
            <%
        }
    }%>
// 2
// first step match the logic code and non logic code
// expire like this string
var r =[];
 for (var i = 0; i <this.list.length; i++) {
        var user = this.list[i];
        if (user.age < 10) {
        r.push("
                    <span>");
        r.push(user.name);
        r.push("</span>
                    ");
                }else {
        r.push("
                    <span>");
        r.push(user.name);
        r.push("</span>
                    ");

        }
    }
    return r.join("")


//3
// new Function using the generated string and change context
// return new Function(funStr,'').apply(data);


```

> 参考文章
- [小胡子的模板引擎](http://segmentfault.com/a/1190000000426283)
- [javascript模板引擎和实现原理](http://segmentfault.com/a/1190000000432600)
