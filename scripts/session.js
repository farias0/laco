function createTimeInput(set, match) {
    var buttonId = 'sat-btn-' + set + '-' + match
    var timeInputId = 'time-' + set + '-' + match

    var div = document.createElement('div')
        // div.classList.add('input-group')
        // div.classList.add('input-group-lg')

    var timeInput = document.createElement('input')
    timeInput.classList.add('form-control')
    timeInput.id = timeInputId
        /* timeInput.type = 'time'
        timeInput.step = '1'
        timeInput.min = '00:00:00'
        timeInput.max = '20:00:00' */
    div.appendChild(timeInput)

    var buttonDiv = document.createElement('div')
        // buttonDiv.classList.add('input-group-append')

    /* var button = document.createElement('input')
    button.type = 'checkbox'
    button.classList.add('btn-check')
    button.id = buttonId
    button.autocomplete = 'off'

    var buttonLabel = document.createElement('label')
    buttonLabel.classList.add('btn')
    buttonLabel.classList.add('btn-primary')
    buttonLabel.classList.add('btn-danger')
    buttonLabel.classList.add('small')
    buttonLabel.htmlFor = buttonId
    buttonLabel.textContent = 'SAT' 
    
    buttonDiv.appendChild(button)
    buttonDiv.appendChild(buttonLabel) */

    var buttonLabel = document.createElement('label')

    var button = document.createElement('input')
    button.type = 'checkbox'
    button.id = buttonId

    buttonLabel.textContent = 'SAT  '

    $(button).change(() => {
        if ($(button).is(':checked')) {
            $(timeInput).prop('disabled', true);
        } else {
            $(timeInput).prop('disabled', false);
        }
    });

    buttonLabel.appendChild(button)
    buttonDiv.appendChild(buttonLabel)

    div.appendChild(buttonDiv)

    return div
}

function createTh(label, cssTag) {
    var th = document.createElement('th')
    th.classList.add(cssTag)
    th.scope = 'col'
    th.innerText = label
    return th
}

function createThSize1(label) {
    return createTh(label, 'match-table-column-s1')
}

function createThSize2(label) {
    return createTh(label, 'match-table-column-s2')
}

function createThSize3(label) {
    return createTh(label, 'match-table-column-s3')
}

function createTd(label) {
    var td = document.createElement('td')
    td.innerText = label
    return td
}

function createSetTable(setNumber, matches) {
    var table = document.createElement('table')
    table.id = 'match-set-table'
    table.classList.add('table')

    var thead = table.createTHead()
    var headerTr = document.createElement('tr')
    headerTr.appendChild(createThSize1(''))
    headerTr.appendChild(createThSize3('Cabeceiro'))
    headerTr.appendChild(createThSize3('Peseiro'))
    headerTr.appendChild(createThSize2('Tempo'))
    thead.appendChild(headerTr)

    var tbody = table.createTBody()
    for (var match in matches) {
        var tr = document.createElement('tr')
        tr.appendChild(createTd((Number(setNumber) * matches.length) + (1+Number(match))))
        tr.appendChild(createTd(matches[match].getCabeceiro()))
        tr.appendChild(createTd(matches[match].getPeseiro()))
        tr.appendChild(createTimeInput(setNumber, match))
        tbody.appendChild(tr)
    }

    $('#session').append(table)
}

function createToP2Button() {
    var button = document.createElement('button')
    button.id = 'to-session-p2-button'
    button.classList.add('btn', 'btn-primary', 'btn-lg', 'float-right')
    button.innerHTML = 'Próximo'
    $('#session').append(button)
}

function loadSession(session) {
    var sets = session.getMatches()
    for (var setNumber in sets) {
        createSetTable(setNumber, sets[setNumber])
    }
    createToP2Button()
}