$(function () {

    var layer = layui.layer;
    var form = layui.form;
    initTable();

    //获取文章数据列表函数
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                var htmlStr = template('mytemplte', res);
                $('tbody').html(htmlStr);
            }
        });
    };

    //添加文章类别的索引
    var addIndex = null;
    //添加类别按钮的设置
    $('#showAdd').on('click', function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tab-add').html(),
            area: ['500px', '250px']
        })
    });

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败');
                }
                layer.msg('新增文章分类成功');
                initTable();
                //根据索引添加完内容后关闭弹出层
                layer.close(addIndex);
            }
        });
    });

    //编辑文章分类
    var editIndex = null;
    $('table').on('click', '.btnEdit', function () {
        editIndex = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#tab-edit').html(),
            area: ['500px', '250px'],
        });

        //根据id 点击编辑按钮后获取对应的数据 并且渲染
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败');
                }
                form.val('form-edit', res.data);
            }
        });
    });


    //点击修改按钮 提交数据 并关闭弹出层
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败');
                }
                layer.msg('更新分类信息成功');
                initTable();
                layer.close(editIndex);
            }
        })
    });

    //点击删除按钮 并更新数据
    $('body').on('click', '.btnDelete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    initTable();
                }
            })
            layer.close(index);
        });
    });





});





