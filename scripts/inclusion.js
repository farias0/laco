function newCabeceiroInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-cabeceiro-" + number + "\">";
}

function newPeseiroInput(number) {
    return "<input type=\"text\" class=\"form-control\" id=\"inclusion-peseiro-" + number + "\">"
}

function checkForChildElement(parent, children) {
    for (var element of $('#' + parent).children()) {
        if (element.id == children) return true
    }
    return false
}

function createNextCabeceiroInput(number) {
    $('#inclusion-cabeceiro').append(newCabeceiroInput(number))
    setCabeceiroInputBehaviour(number)
}

function createNextPeseiroInput(number) {
    $('#inclusion-peseiro').append(newPeseiroInput(number))
    setPeseiroInputBehaviour(number)
}

function setCabeceiroInputBehaviour(number) {
    $(document).on('input', '#inclusion-cabeceiro-' + number, e => {
        var next = number + 1
        if (!checkForChildElement('inclusion-cabeceiro', 'inclusion-cabeceiro-' + next)) { // terrible performance, there's gotta be a better way
            createNextCabeceiroInput(next)
        }
    })
}

function setPeseiroInputBehaviour(number) {
    $(document).on('input', '#inclusion-peseiro-' + number, e => {
        var next = number + 1
        if (!checkForChildElement('inclusion-peseiro', 'inclusion-peseiro-' + next)) {
            createNextPeseiroInput(next)
        }
    })
}

setCabeceiroInputBehaviour(1)
setPeseiroInputBehaviour(1)

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
    var cabeceiroNameList = getValuesFromChildrenInputs($('#inclusion-cabeceiro'))
    var peseiroNameList = getValuesFromChildrenInputs($('#inclusion-peseiro'))

    const cabeceiroList = cabeceiroNameList.map(c => new Player(c, "0"))
    const peseiroList = peseiroNameList.map(p => new Player(p, "0"))

    var session = new Session(cabeceiroList, peseiroList)
    Storage.saveSession(session)

    loadContent('./sections/session.html', () => Session1Screen.loadSession(session))
})