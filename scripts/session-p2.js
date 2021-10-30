class Session2Screen {
    static session = []
    
    static createSetTable(setNumber, matches) {
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(UI.createTh('', 10))
        headerTr.appendChild(UI.createTh('Partida', 40)) //
        headerTr.appendChild(UI.createTh('1º Boi', 25)) //
        headerTr.appendChild(UI.createTh('2º Boi', 25)) //
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(UI.createTd(parseInt(match) + 1)) //
            tr.appendChild(UI.createTd(matches[match].cabeceiro.name + ' x ' + matches[match].peseiro.name)) //
            tr.appendChild(UI.createTd(matches[match].timeP1)) //
            tr.appendChild(UI.createTimeInput(setNumber, match))
            tbody.appendChild(tr)
        }
    
        return table
    }

    static createToResultsButton() { //
        const button = document.createElement('button')
        button.id = 'to-session-results-button' //
        button.classList.add('btn', 'btn-success', 'btn-lg', 'float-right') //
        button.innerHTML = 'Terminar' //

        $(document).on('click', '#to-session-results-button', e => { //
            this.setMatchesResults()
            Storage.saveSession(this.session)
            loadContent('./sections/session-results.html', () => SessionResultsScreen.loadSessionResults(this.session))
        })

        return button
    }

    static loadSessionP2(session) {
        this.session = session

        const matches = this.session.getMatches()
        let qualified = matches.filter(m => m.timeP1 !== Match.getSatValue())
        qualified.sort((a, b) => Match.timeStringTreatment(b.timeP1) - Match.timeStringTreatment(a.timeP1))

        $('#sessionP2').append(this.createSetTable(1, qualified))

        $('#sessionP2').append(this.createToResultsButton())
    }

    // returns a map (key=cabeceiro) with submaps (key=peseiro) with the result as a value (time or SAT)
    static getResultsAsMap() {
        const matches = {}
        for (const table of $('#sessionP2').children()) { //
            if (table.id === 'match-set-table') {
                const rows = table.tBodies.item(0).rows
                for (const row of rows) {
                    const players = row.childNodes[1].innerText.split(' x ')
                    const c = players[0]
                    const p = players[1]
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
            if (match.timeP1 !== Match.getSatValue()) {
                match.timeP2 = results[match.cabeceiro.name][match.peseiro.name] //
            }
        }
    }
}