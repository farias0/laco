class SessionResultsScreen {
    static session = []

    static loadSessionResults(session) {
        this.session = session

        const matches = this.session.getMatches()
        let qualified = matches.filter(m => m.timeP1 !== Match.getSatValue() && m.timeP2 !== Match.getSatValue())
        qualified.sort((a, b) => b.getAverageTime() - a.getAverageTime())

        $('#sessionResults').append(Table.createTable()
                                            .addColumn(Table.createColumn('', 10))
                                            .addColumn(Table.createColumn('Partida', 50)) 
                                            .addColumn(Table.createColumn('1º', 17)) 
                                            .addColumn(Table.createColumn('2º', 17)) 
                                            .addColumn(Table.createColumn('Média', 17)) 
                                            .setRows(qualified.map(match => [
                                                Table.createCell(qualified.indexOf(match) + 1),
                                                Table.createCell(match.cabeceiro.name + ' x ' + match.peseiro.name),
                                                Table.createCell(match.timeP1),
                                                Table.createCell(match.timeP2),
                                                Table.createCell(match.getAverageTime())
                                            ]))
                                            .build())
    }
}