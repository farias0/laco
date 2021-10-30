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
        const satChecboxId = 'sat-btn-' + set + '-' + match

        const satCheckboxLabel = document.createElement('label')
        satCheckboxLabel.textContent = 'SAT'
        satCheckboxLabel.classList.add('sat-checkbox-label')
        satCheckboxLabel.for = satChecboxId
        satCheckboxDiv.appendChild(satCheckboxLabel)

        const satCheckbox = document.createElement('input')
        satCheckbox.type = 'checkbox'
        satCheckbox.id = satChecboxId
        satCheckboxDiv.appendChild(satCheckbox)
    
        $(satCheckbox).change(() => {
            if ($(satCheckbox).is(':checked')) {
                $(timeInput).prop('disabled', true);
            } else {
                $(timeInput).prop('disabled', false);
            }
        });

        div.appendChild(satCheckboxDiv)

        return div
    }

    static getValuesFromTimeInput(div) {
        return {
            time: div.childNodes[0].value,
            isSat: div.childNodes[1].childNodes[1].checked
        }
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
            tr.appendChild(this.createTd(matches[match].cabeceiro.name))
            tr.appendChild(this.createTd(matches[match].peseiro.name))
            tr.appendChild(this.createTimeInput(setNumber, match))
            tbody.appendChild(tr)
        }
    
        return table
    }
    
    static createToP2Button() {
        const button = document.createElement('button')
        button.id = 'to-session-p2-button'
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'float-right')
        button.innerHTML = 'Próximo'

        $(document).on('click', '#to-session-p2-button', e => {
            this.setMatchesResults()
            Storage.saveSession(this.session)
            loadContent('./sections/session-p2.html', () => Session2Screen.loadSessionP2(this.session))
        })

        return button
    }
    
    static loadSession(session) {
        this.session = session

        const sets = this.session.getSets()
        for (const setNumber in sets) {
            $('#session').append(
                this.createSetTable(setNumber, sets[setNumber])
            )
        }

        $('#session').append(this.createToP2Button())
    }

    // returns a map (key=cabeceiro) with submaps (key=peseiro) with the result as a value (time or SAT)
    static getResultsAsMap() {
        const matches = {}
        for (const table of $('#session').children()) {
            if (table.id === 'match-set-table') {
                const rows = table.tBodies.item(0).rows
                for (const row of rows) {
                    const c = row.childNodes[1].innerText
                    const p = row.childNodes[2].innerText
                    const result = this.getValuesFromTimeInput(row.childNodes[3])
                    if (!matches[c]) matches[c] = {}
                    matches[c][p] = result.isSat ? Match.getSatValue() : result.time
                } 
            }
        }
        return matches
    }

    // retrieve and set the result of each match to the session object
    static setMatchesResults() {
        const matches = this.session.getMatches()
        const results = this.getResultsAsMap()

        for (const match of matches) {
            match.timeP1 = results[match.cabeceiro.name][match.peseiro.name]
        }
    }
}
