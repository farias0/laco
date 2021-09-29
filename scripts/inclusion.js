function addListener(number) {
    $(document).one('click', '#inclusion-pe-' + number, e => {
        var inputNumber = e.target.id.substring(e.target.id.length - 1)
        console.log('ok')
        $('#inclusion-pe').append("<input type=\"text\" class=\"form-control\" id=\"inclusion-pe-" + inputNumber + "\">")
    })
}

addListener(1)

$(document).on('click', '#inclusion-start-button', e => {
    console.log('start')
})