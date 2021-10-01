function createTh(label) {
    var th = document.createElement('th')
    th.scope = 'col'
    th.innerText = label
    return th
}

function createTd(label) {
    var td = document.createElement('td')
    td.innerText = label
    return td
}

function createSetTable(set) {
    var table = document.createElement('table')
    table.id = 'match-set-table'
    table.classList.add('table')

    var thead = table.createTHead()
    var headerTr = document.createElement('tr')
    headerTr.appendChild(createTh('Cabeceiro'))
    headerTr.appendChild(createTh('Peseiro'))
    headerTr.appendChild(createTh('Tempo'))
    thead.appendChild(headerTr)

    var tbody = table.createTBody()
    for (var match in set) {
        var tr = document.createElement('tr')
        tr.appendChild(createTd(set[match].getCabeceiro()))
        tr.appendChild(createTd(set[match].getPeseiro()))
        tr.appendChild(createTd(set[match].getTime()))
        tbody.appendChild(tr)
    }

    $('#session').append(table)
}

function loadSession(session) {
    for (var set of session.getMatches()) {
        createSetTable(set)
    }
}