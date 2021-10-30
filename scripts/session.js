class Session1Screen {
    static session = null
    
    static createSetTable(setNumber, matches) {
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(UI.createTh('', 10))
        headerTr.appendChild(UI.createTh('Cabeceiro', 35))
        headerTr.appendChild(UI.createTh('Peseiro', 35))
        headerTr.appendChild(UI.createTh('Tempo', 20))
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(UI.createTd((Number(setNumber) * matches.length) + (1+Number(match))))
            tr.appendChild(UI.createTd(matches[match].cabeceiro.name))
            tr.appendChild(UI.createTd(matches[match].peseiro.name))
            tr.appendChild(UI.createTimeInput(setNumber, match))
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
                    const result = UI.getValuesFromTimeInput(row.childNodes[3])
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
