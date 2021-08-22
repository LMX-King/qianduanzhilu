$(function () {
    load()
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === '') {
                alert('不能为空')
            } else {
                var local = getDate()
                local.push({ title: $(this).val(), done: false })
                saveDate(local)
                load()
                $(this).val('')
            }
        }
    })
    $('ol ,ul').on('click', 'a', function () {
        var date = getDate()
        var index = $(this).attr('id')
        console.log(index);
        date.splice(index, 1)
        // console.log($(index));
        saveDate(date)
        load()
    })
    $('ol,ul').on('click', 'input', function () {
        var date = getDate()
        var index = $(this).siblings('a').attr('id')
        console.log(index);
        date[index].done = $(this).prop('checked')
        saveDate(date)
        load()
    })
    function getDate() {
        var date = localStorage.getItem('todolist')
        if (date !== null) {
            return JSON.parse(date)
        } else {
            return []
        }
    }
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date))
    }
    function load() {
        var data = getDate()
        $('ul,ol').empty()
        var todoCount = 0
        var doneCount = 0
        $.each(data, function (i, n) {
            if (n.done) {
                $('ul').prepend("<li><input type='checkbox' checked><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'></a></li>")
                doneCount++
            } else {
                $('ol').prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'></a></li>")
                todoCount++
            }
        })
        $('#donecount').text(doneCount)
        $('#todocount').text(todoCount)
    }
})