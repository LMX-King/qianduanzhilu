window.addEventListener('load', function () {
    var focus = document.querySelector('.focus')
    var ul = focus.children[0]
    var w = focus.offsetWidth
    var ol = focus.children[1]
    var index = 0
    var timer = setInterval(function () {
        index++
        var translatex = -index * w
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + translatex + 'px)'
    }, 2000)
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0
            ul.style.transition = 'none'
            var translatex = -index * w
            ul.style.transform = 'translateX(' + translatex + 'px)'
        } else if (index < 0) {
            index = 2
            ul.style.transition = 'none'
            var translatex = -index * w
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })
    var startX = 0
    var x = 0
    var moveX = 0
    var flag = false
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX
        x = ul.children[1].offsetLeft
        clearInterval(timer)
    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX
        var translatex = -index * w + moveX
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translatex + 'px)'
        flag = true
        e.preventDefault()
    })
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--
                } else {
                    index++
                }
                var translatex = -index * w
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translatex + 'px)'
            } else {
                var translatex = -index * w
                ul.style.transition = 'all .3s'

                ul.style.transform = 'translateX(' + translatex + 'px)'
            }
            flag = false
        }
        clearInterval(timer)
        timer = setInterval(function () {
            index++
            var translatex = -index * w
            ul.style.transition = 'all .3s'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }, 2000)
    })
    var goBack = document.querySelector('.goBack')
    var banner = document.querySelector('.banner')
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= banner.offsetTop) {
            goBack.style.display = 'block'
        } else {
            goBack.style.display = 'none'
        }
    })
    goBack.addEventListener('touchstart', function () {
        animate(window, 0)
    })
    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  ??????????????? callback()

        // ?????????????????????????????????????????????????????????????????????
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // ?????????????????????????????????
            // ?????????????????????????????? ???????????????????????????
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // ???????????? ????????????????????????
                clearInterval(obj.timer);
                // ???????????????????????????????????????
                // if (callback) {
                //     // ????????????
                //     callback();
                // }
                callback && callback();
            }
            // ????????????1 ?????????????????????????????????????????????  ???????????????(????????? - ???????????????) / 10
            // obj.style.left = obj.offsetLeft + step + 'px';
            window.scroll(0, window.pageYOffset + step)
        }, 15);
    }

})