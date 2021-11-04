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

// auto colapses navbar when clicking an item
$(document).ready(function() {
    $("nav").find("li").on("click", "a", function() {
        $('.navbar-collapse').collapse('hide');
    });
});

$(document).on('click', '#new-session-button', e => {
    e.preventDefault()
    loadContent('./sections/inclusion.html', () => InclusionScreen.loadInclusion())
})

$(document).on('click', '#current-session-button', e => {
    e.preventDefault()
    const openSession = Storage.getFirstOpenSession()
    if (!openSession) {
        loadContent('./sections/inclusion.html', () => InclusionScreen.loadInclusion())
    }
    loadContent('./sections/session.html', () => Session1Screen.loadSession(openSession))
})