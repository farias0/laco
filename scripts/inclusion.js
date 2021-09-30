function newPeInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-pe-" + number + "\">";
}

function newLacoInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-laco-" + number + "\">"
}


function createNextPeInput(number) {
    $('#inclusion-pe').append(newPeInput(number))
    $(document).one('input', '#inclusion-pe-' + number, e => {
        createNextPeInput(number + 1)
    })
}

function createNextLacoInput(number) {
    $('#inclusion-laco').append(newLacoInput(number))
    $(document).one('input', '#inclusion-laco-' + number, e => {
        createNextLacoInput(number + 1)
    })
}

$(document).one('input', '#inclusion-pe-1', e => {
    createNextPeInput(2)
})

$(document).one('input', '#inclusion-laco-1', e => {
    createNextLacoInput(2)
})

function getValuesFromChildrenInputs(element) {
    // for some reason the code below isn't working
    // return element.children()
    //.filter(c => c.tagName == 'INPUT')

    var arr = []

    for (e of element.children()) {
        if (e.tagName === 'INPUT') {
            var val = document.getElementById(e.id).value
            if (val.length > 0) arr.push(val)
        }
    }

    return arr
}

$(document).on('click', '#inclusion-start-button', e => {
    var peList = getValuesFromChildrenInputs($('#inclusion-pe'))
    var lacoList = getValuesFromChildrenInputs($('#inclusion-laco'))

    console.log(peList)
    console.log(lacoList)
})