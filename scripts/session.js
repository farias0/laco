class Session1Screen {
    static session = null

    // creates cell div with time input & SAT checkbox
    static createTimeInput(set, match) {
        const div = document.createElement('div')

        const timeInput = document.createElement('input')
        timeInput.classList.add('form-control')
        timeInput.id = 'time-' + set + '-' + match
        div.appendChild(timeInput)
    
        const satCheckboxDiv = document.createElement('div')
        const satCheckboxLabel = document.createElement('label')
        const satCheckbox = document.createElement('input')
        satCheckbox.type = 'checkbox'
        satCheckbox.id = 'sat-btn-' + set + '-' + match
        satCheckboxLabel.textContent = 'SAT  '
    
        $(satCheckbox).change(() => {
            if ($(satCheckbox).is(':checked')) {
                $(timeInput).prop('disabled', true);
            } else {
                $(timeInput).prop('disabled', false);
            }
        });
    
        satCheckboxLabel.appendChild(satCheckbox)
        satCheckboxDiv.appendChild(satCheckboxLabel)
    
        div.appendChild(satCheckboxDiv)

        return div
    }
    
    // creates the header for each set table
    static createTh(label, cssTag) {
        const th = document.createElement('th')
        th.classList.add(cssTag)
        th.scope = 'col'
        th.innerText = label
        return th
    }
    
    static createThSize1(label) {
        return this.createTh(label, 'match-table-column-s1')
    }
    
    static createThSize2(label) {
        return this.createTh(label, 'match-table-column-s2')
    }
    
    static createThSize3(label) {
        return this.createTh(label, 'match-table-column-s3')
    }
    
    // creates the cells for each table row (minus the time input cell)
    static createTd(label) {
        const td = document.createElement('td')
        td.innerText = label
        return td
    }
    
    static createSetTable(setNumber, matches) {
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(this.createThSize1(''))
        headerTr.appendChild(this.createThSize3('Cabeceiro'))
        headerTr.appendChild(this.createThSize3('Peseiro'))
        headerTr.appendChild(this.createThSize2('Tempo'))
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(this.createTd((Number(setNumber) * matches.length) + (1+Number(match))))
            tr.appendChild(this.createTd(matches[match].cabeceiro))
            tr.appendChild(this.createTd(matches[match].peseiro))
            tr.appendChild(this.createTimeInput(setNumber, match))
            tbody.appendChild(tr)
        }
    
        $('#session').append(table)
    }
    
    static createToP2Button() {
        const button = document.createElement('button')
        button.id = 'to-session-p2-button'
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'float-right')
        button.innerHTML = 'Próximo'
        $('#session').append(button)
    }
    
    static loadSession(session) {
        const sets = session.getMatches()
        for (const setNumber in sets) {
            this.createSetTable(setNumber, sets[setNumber])
        }
        this.createToP2Button()
    }

    static setMatchesResults() {
        const sets = session.getMatches()
    }
}

$(document).on('click', '#to-session-p2-button', e => {
    Session1Screen.setMatchesResults()    
    loadContent('./sections/session-p2.html', () => loadSessionP2(Session1Screen.session))
})

