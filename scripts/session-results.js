class SessionResultsScreen {
    static session = []

    // creates the header for each set table
    static createTh(label, widthPct) {
        const th = document.createElement('th')
        th.scope = 'col'
        th.innerText = label
        th.style.width = widthPct + "%"
        return th
    }
    
    // creates the cells for each table row (minus the time input cell)
    static createTd(label) {
        const td = document.createElement('td')
        td.innerText = label
        return td
    }
    
    static createSetTable(matches) { //
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(this.createTh('', 10))
        headerTr.appendChild(this.createTh('Partida', 50)) //
        headerTr.appendChild(this.createTh('1º', 17)) //
        headerTr.appendChild(this.createTh('2º', 17)) //
        headerTr.appendChild(this.createTh('Média', 17)) //
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(this.createTd(parseInt(match) + 1)) //
            tr.appendChild(this.createTd(matches[match].cabeceiro.name + ' x ' + matches[match].peseiro.name)) //
            tr.appendChild(this.createTd(matches[match].timeP1)) //
            tr.appendChild(this.createTd(matches[match].timeP2)) //
            tr.appendChild(this.createTd(matches[match].getAverageTime())) //
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