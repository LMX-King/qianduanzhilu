$(function () {
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'));      
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'))
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item')
        } else {
            $('.cart-item').removeClass('check-cart-item')
        }
        getSum()
    })
    $('.j-checkbox').change(function () {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
        $(this).parents('.cart-item').toggleClass('check-cart-item')
        getSum()
    })
    //加号
    $('.increment').click(function () {
        var n = $(this).siblings('.itxt').val()
        n++
        $(this).siblings('.itxt').val(n)
        var sum = $(this).parents('.p-num').siblings('.p-price').text().substring(1) * n
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + sum.toFixed(2))
        getSum()
    })
    //减号
    $('.decrement').click(function () {
        var n = $(this).siblings('.itxt').val()
        if (n == 1) {
            return false
        }
        n--
        $(this).siblings('.itxt').val(n)
        var sum = $(this).parents('.p-num').siblings('.p-price').text().substring(1) * n
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + sum.toFixed(2))
        getSum()
    })
    //自定义数量
    $('.itxt').change(function () {
        var sum = $(this).parents('.p-num').siblings('.p-price').text().substring(1) * $(this).val()
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + sum.toFixed(2))
        getSum()
    })
    getSum()
    //结算部分
    function getSum() {
        var count = 0
        var money = 0
        $('.itxt').each(function (i, ele) {
            if ($('.j-checkbox').eq(i).prop('checked') == true) {
                count += parseInt($(ele).val())
            }
        })
        $('.amount-sum em').text(count)
        $('.p-sum').each(function (i, ele) {
            if ($('.j-checkbox').eq(i).prop('checked') == true) {
                var sum = $(ele).text().substring(1)
                money += parseFloat(sum)
            }
        })
        $('.price-sum em').text('￥' + money.toFixed(2))
    }
    //清理购物车
    $('.clear-all').click(function () {
        $('.cart-item').remove()
        getSum()
    })
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove()
        getSum()
    })
    $('.remove-batch').click(function () {
        $('.j-checkbox:checked').parents('.cart-item').remove()
        getSum()
    })
})