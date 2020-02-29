$(function () {
    //用input模拟上传文件按钮的点击
    $('#btn-up').on('click', function () {
        $('#file-up').click();
    });

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    //监听文件选择框的change事件
    $('#file-up').on('change', function (e) {
        var files = e.target.files;
        if (files.length === 0) {
            return layui.layer.msg('请选择图片');
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    //上传更改头像
    $('#upLoad').on('click', function () {
        var dataURL = $image
            // 创建一个 Canvas 画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png');
        $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('更新头像失败！');
            }
            layui.layer.msg('更新头像成功！');
            window.parent.getUserinfo();
        })

    })





});