class Session1Screen {
    static session = null
    
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
            var matches = sets[setNumber]

            var table = UI.createTable()
                            .addColumn(UI.createTh('', 10))
                            .addColumn(UI.createTh('Cabeceiro', 35))
                            .addColumn(UI.createTh('Peseiro', 35))
                            .addColumn(UI.createTh('Tempo', 20))
                            .setRows(matches.map(match => [
                                UI.createTd((Number(setNumber) * matches.length) + (1+matches.indexOf(match))),
                                UI.createTd(match.cabeceiro.name),
                                UI.createTd(match.peseiro.name),
                                UI.createTimeInput(setNumber, matches.indexOf(match))
                            ]))
                            .build()

            $('#session').append(table)
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
