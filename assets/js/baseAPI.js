$.ajaxPrefilter(function (option) {
    //设置url为公用 方便后期更改地址
    option.url = 'http://www.liulongbin.top:3007' + option.url;

    // my 开头的请求路径，
    // 需要在请求头中携带 Authorization 身份认证字段，
    // 才能正常访问成功
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token'),
        };
        //解决不输入用户名就可以直接登录后台的问题
        option.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            };
        };
    };


});