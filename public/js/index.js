$(function() {
    // 标题
    $('.title').hide()
    $('.title').fadeToggle(2000)

    // 点击“去注册”的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e){
        e.preventDefault();    // 阻止表单提交和页面跳转
        let patt1 = /^[a-zA-Z0-9]{6,20}$/
        let patt2 = /^\d{6,20}$/
        let patt_name = /^\w{4,18}$/
        let user = {
            username: $('#form_reg [name=username]').val(),
            pwd: $('#form_reg [name=password]').val(),
            repwd: $('#form_reg [name=repassword]').val()
        };
        // 检验
        if(!patt_name.test(user.username)) {
            return alert('用户名长度为4~18位字符')
        }
        else if(!patt1.test(user.pwd)) {e
            return alert('密码为长度6~20位的字母、数字或下划线')
        }
        else if(patt2.test(user.pwd)) {
            return alert('密码过于简单')
        }
        else if(user.repwd !== user.pwd) {
            return alert('密码输入不一致')
        }

        $.ajax({
            url:"/api/register",
            type:"POST",
            data:$(this).serialize(),    // 一次性获取表单所有元素
            success: function(res){
                console.log(res);     // 打印服务器端响应的数据
                if(res.status !== 0) {
                    return console.log('注册失败！')
                }
                else {
                    alert('注册成功！')
                    window.location.href = '/api'
                    // setTimeout("window.location.href = '/api/index.html'", 1000);  // 延迟跳转
                }
            }
        })
    })

    // 监听登录表单提交事件
    $('#form_login').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url:"/api/login",
            type:"POST",
            data:$(this).serialize(),
            success: function(res){
                console.log(res);
                if(res.status !== 0) {
                    return console.log('登录失败！')
                }
                else {
                    console.log('登录成功，进入首页！')
                    window.localStorage.setItem('token', res.token)
                    window.location.href = '/my/homepage'
                    // window.location.href = '/my/homepage';
                //     $.ajax({
                //         url:'/my/homepage',
                //         type:'GET',
                //         headers: {
                //             Authorization: localStorage.getItem('token') || '',
                //         },
                //         success: function(res){
                //             console.log('进入博客主页！')
                //         }
                //     })
                }
            }
        })
    })

    // $.ajax({
    //     url:'/my/homepage',
    //     type:'GET',
    //     headers: {
    //         Authorization: localStorage.getItem('token') || '',
    //     },
    //     success: function(res){
    //         console.log('进入博客主页！')
    //     }
    // })

})


