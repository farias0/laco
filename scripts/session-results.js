class SessionResultsScreen {
    static session = []
    
    static createSetTable(matches) { //
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(UI.createTh('', 10))
        headerTr.appendChild(UI.createTh('Partida', 50)) //
        headerTr.appendChild(UI.createTh('1º', 17)) //
        headerTr.appendChild(UI.createTh('2º', 17)) //
        headerTr.appendChild(UI.createTh('Média', 17)) //
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(UI.createTd(parseInt(match) + 1)) //
            tr.appendChild(UI.createTd(matches[match].cabeceiro.name + ' x ' + matches[match].peseiro.name)) //
            tr.appendChild(UI.createTd(matches[match].timeP1)) //
            tr.appendChild(UI.createTd(matches[match].timeP2)) //
            tr.appendChild(UI.createTd(matches[match].getAverageTime())) //
            tbody.appendChild(tr)
        }
    
        return table
    }

    static loadSessionResults(session) {
        this.session = session

        const matches = this.session.getMatches()
        let qualified = matches.filter(m => m.timeP1 !== Match.getSatValue() && m.timeP2 !== Match.getSatValue())
        qualified.sort((a, b) => b.getAverageTime() - a.getAverageTime())

        $('#sessionResults').append(this.createSetTable(qualified))
    }
}