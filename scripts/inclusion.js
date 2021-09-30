function newPeInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-pe-" + number + "\">";
}

function newLacoInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-laco-" + number + "\">"
}

function checkForChildElement(parent, children) {
    for (var element of $('#' + parent).children()) {
        if (element.id == children) return true
    }
    return false
}

function createNextPeInput(number) {
    $('#inclusion-pe').append(newPeInput(number))
    setPeInputBehaviour(number)
}

function createNextLacoInput(number) {
    $('#inclusion-laco').append(newLacoInput(number))
    setLacoInputBehaviour(number)
}

function setPeInputBehaviour(number) {
    $(document).on('input', '#inclusion-pe-' + number, e => {
        var next = number + 1
        if (!checkForChildElement('inclusion-pe', 'inclusion-pe-' + next)) { // terrible performance, there's gotta be a better way
            createNextPeInput(next)
        }
    })
}

function setLacoInputBehaviour(number) {
    $(document).on('input', '#inclusion-laco-' + number, e => {
        var next = number + 1
        if (!checkForChildElement('inclusion-laco', 'inclusion-laco-' + next)) {
            createNextLacoInput(next)
        }
    })
}

setPeInputBehaviour(1)
setLacoInputBehaviour(1)

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

    var session = new Session(peList, lacoList)
    Storage.saveSession(session)
})