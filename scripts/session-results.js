class SessionResultsScreen {
    static session = []

    static loadSessionResults(session) {
        this.session = session

        const matches = this.session.getMatches()
        let qualified = matches.filter(m => m.timeP1 !== Match.getSatValue() && m.timeP2 !== Match.getSatValue())
        qualified.sort((a, b) => b.getAverageTime() - a.getAverageTime())

        const table = UI.createTable()
                        .addColumn(UI.createTh('', 10))
                        .addColumn(UI.createTh('Partida', 50)) 
                        .addColumn(UI.createTh('1º', 17)) 
                        .addColumn(UI.createTh('2º', 17)) 
                        .addColumn(UI.createTh('Média', 17)) 
                        .setRows(qualified.map(match => [
                            UI.createTd(qualified.indexOf(match) + 1),
                            UI.createTd(match.cabeceiro.name + ' x ' + match.peseiro.name),
                            UI.createTd(match.timeP1),
                            UI.createTd(match.timeP2),
                            UI.createTd(match.getAverageTime())
                        ]))
                        .build()

        $('#sessionResults').append(table)
    }
}