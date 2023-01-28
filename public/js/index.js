$(function() {

    // 点击'home'
    $('.home').on('click', function(){
        $('.about_text').slideUp(1500, function(){
            $('.title').slideDown(1500)
            $('.box').slideUp(1500)
        })
        
    })
    // 点击'about'
    $('.about').on('click', function(){
        $('.box').slideUp(1500)
        $('.title').slideUp(1500, function(){
            $('.about_text').slideDown(1500)
        })
        
    })
    // 点击'login'
    $('.login').on('click', function(){
        $('.title').slideUp(1500)
        $('.box').slideDown(1500)
        $('.about_text').slideUp(1500)
    })


    // 标题
    $('.title').hide()
    $('.title').slideToggle(2000)

    // 点击“去注册”的链接
    $('#link_reg').on('click', function(){
        $('.login-box').fadeToggle(500, function(){
            $('.reg-box').fadeToggle(500)
        })
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function(){
        $('.reg-box').fadeToggle(500, function(){
            $('.login-box').fadeToggle(500)
        })
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
            return alert('用户名为长度4~18位的字符')
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
                }
            }
        })
    })
    
})


