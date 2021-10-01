function loadContent(pageRef, callback) {
    $.ajax({
        url: pageRef,
        data: {},
        type: 'GET',
        dataType: 'text',
        success: (response) => {
            $('#page-body').html(response)
        },
        error: (error) => {
            console.log('error: ' + error.statusText)
            console.log(error)
        },
        complete: callback
    })
}

$(document).ready(function() {

})

$(document).on('click', '#current-session-button', e => {
    e.preventDefault()
    loadContent('./sections/inclusion.html')
})