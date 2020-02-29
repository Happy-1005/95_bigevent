$(function () {

    getUserinfo()
});

//获取用户登录信息
function getUserinfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //调用下面的函数
            randerAvatar(res.data);
        },
    });
};

//根据登录信息(1)渲染用户名(2)渲染图片 或者用户名首字母 
function randerAvatar(user) {
    //渲染用户设置的用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic) {
        //渲染图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        //渲染文本
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();

    }
};

//设置退出登录
var layer = layui.layer;
$('#btnLogout').on('click', function () {
    layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';

        layer.close(index);
    });
});