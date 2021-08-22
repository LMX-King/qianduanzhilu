$(function () {
    var flag = true
    function getrun() {
        if ($(window).scrollTop() > $('.recommend').offset().top) {
            $('.fixedtool').fadeIn(200)
        } else {
            $('.fixedtool').fadeOut(200)
        }
    }
    getrun()
    $(window).scroll(function () {
        getrun()
        if (flag) {
            $('.floor .w').each(function (i, ele) {
                if ($(ele).offset().top <= $(document).scrollTop()) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass()
                }

            })

        }
    })
    $('.fixedtool li').click(function () {
        flag = false
        $(this).addClass('current').siblings('li').removeClass()
        var indexTop = $('.floor .w').eq($(this).index()).offset().top
        $('body,html').stop().animate({
            scrollTop: indexTop
        }, function () {
            flag = true
        })

    })
    // $('.fixedtool li').each(function (i) {
    //     if($('.fixedtool li').eq(i) )
    // })
})