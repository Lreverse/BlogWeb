$(function() {

    // 监听退出事件
    $('#logout').on('click', function(){
        window.localStorage.removeItem('token');  // 清空token
        window.location.href = '/api';
    })


    // 监听评论表单提交事件
    $('#form_comment').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: "/my/comment",
            type: "post",
            data: $(this).serialize(),
            success: function(res){
                console.log(res);
                if(res.status !== 0) {
                    return console.log('评论失败！')
                }
                else {
                    alert('评论成功！')
                    window.location.href = '/my/homepage'
                }
            }
        })
    })
})