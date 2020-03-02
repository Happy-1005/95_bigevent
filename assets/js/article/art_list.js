$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    //定义一个参数对象 用来发送给服务器
    var q = {
        pagenum: 1,//页码值 
        pagesize: 3,//每页显示几条数据
        cate_id: '', //文章分类的 Id
        state: '',//文章的状态
    }


    //定义模板引擎过滤器更新时间
    template.defaults.imports.dataFun = function (date) {
        // 2012-12-12 12:12:12
        var da = new Date(date);

        var y = da.getFullYear();
        var m = zero(da.getMonth() + 1);
        var d = zero(da.getDate());

        var hh = zero(da.getHours());
        var mm = zero(da.getMinutes());
        var ss = zero(da.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义了一个补零的函数
    function zero(num) {
        return num > 9 ? num : '0' + num
    }

    initTable();
    initCase();

    //定义获取文章列表函数
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);

                renderPage(res.total);
            }
        });
    };

    //定义获取文章分类函数
    function initCase() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！');
                }
                var htmlStr = template('tpl-case', res);
                $('[name=cate_id]').html(htmlStr);
                //调用layui的form重新渲染下拉选项
                form.render();
            }
        });
    };

    //点击筛选按钮 提交表单函数
    $('#form-choose').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })


    //定义分页功能函数
    function renderPage(total) {
        laypage.render({
            elem: 'pager', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize,//每页显示的条数
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                var newPage = obj.curr;
                q.pagenum = newPage;
                var newSize = obj.limit;
                q.pagesize = newSize;
                //首次不执行
                if (!first) {
                    //do something
                    initTable();
                }
            }
        });
    };

    // 点击编辑按钮  
    $('tbody').on('click', '#btn-edit', function () {
        location.href = '/article/art_edit.html?id=' + $(this).attr('data-id');

    });

    //点击删除按钮
    $('body').on('click', '#btn-del', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    initTable();
                    initCase();
                }
            })

            layer.close(index);
        });
    })




});