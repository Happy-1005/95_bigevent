$(function () {
    var form = layui.form;
    var layer = layui.layer;

    $('#form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！');
                // $('#form')[0].reset();
            }
        });
    });

    //密码格式规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        newPwd: function (value) {
            var pwd = $('[name=oldPwd]').val();
            if (value === pwd) {
                return '新旧密码不能重复！'
            }
        },
        samePwd: function (value) {
            var pwd = $('[name=newPwd]').val();
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    });



});