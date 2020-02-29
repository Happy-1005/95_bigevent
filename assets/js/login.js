$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        sameValue: function (value) {
            var val = $('.reg-box [name=password]').val();
            if (value !== val) {
                return '两次密码不一致';
            };
        },
    });

    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#link-login').click();
            }
        });
    });

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });






});