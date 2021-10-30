class Session2Screen {
    static session = []

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

        const table = UI.createTable()
                        .addColumn(UI.createTh('', 10))
                        .addColumn(UI.createTh('Partida', 40))
                        .addColumn(UI.createTh('1º Boi', 25))
                        .addColumn(UI.createTh('2º Boi', 25))
                        .setRows(qualified.map(match => [
                            UI.createTd(qualified.indexOf(match) + 1),
                            UI.createTd(match.cabeceiro.name + ' x ' + match.peseiro.name),
                            UI.createTd(match.timeP1),
                            UI.createTimeInput(1, qualified.indexOf(match))
                        ]))
                        .build()

        $('#sessionP2').append(table)

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