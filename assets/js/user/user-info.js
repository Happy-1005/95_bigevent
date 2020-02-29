$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //获取用户登录信息--初始化
    initUserinfo();

    function initUserinfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                form.val('f1', res.data);
            }
        })
    };

    //监听提交修改按钮
    $('#form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！');
                //获取成功后调用父元素的函数
                window.parent.getUserinfo();
            }
        });
    });

    //重置按钮设置
    $('#btnRes').on('click', function (e) {
        e.preventDefault();
        initUserinfo();
    });


});