$(function () {
    var layer = layui.layer;
    var form = layui.form;

    //初始化富文本编辑器函数
    initEditor();
    //调用文章分类函数
    initCase();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    //点击提交封面按钮
    $('#btn-file').on('click', function () {
        $('#ipt-file').click();
    });

    //获取文章分类函数
    function initCase() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表成功');
                }
                var htmlStr = template('tep-list', res);
                $('[name=cate_id]').html(htmlStr);
                //调用layui的form重新渲染下拉选项
                form.render();
            }
        });
    };

    // //更换裁剪后的图片
    $('#ipt-file').on('change', function (e) {
        var file = e.target.files;
        if (file.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(file[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    //准备提交的参数
    var art_sate = '已发布';
    $('#btn-save2').on('click', function () {
        art_sate = '草稿';
    })

    $('#myForm').on('submit', function (e) {
        e.preventDefault();

        var fd = new FormData($(this)[0]);
        fd.append('state', art_sate);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);

                //调用函数
                publicAritlce(fd);
            })
    });

    function publicAritlce(fd) {
        $.ajax({
            'type': 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败');
                }
                layer.msg('发布文章成功');
                location.href = '/article/art_list.html';
            }
        })
    }





})