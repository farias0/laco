class InclusionScreen {

    static cabeceiroTable
    static peseiroTable

    static loadInclusion() {

        const cabeceiroText = document.createElement('h2')
        cabeceiroText.innerHTML = 'Cabeceiro'
        $('#inclusion').append(cabeceiroText)

        this.cabeceiroTable = Table.createTable()
                                    .addColumn(Table.createColumn('Nome', 70))
                                    .addColumn(Table.createColumn('Handicap', 30))
                                    .build()
        this.addCabeceiroRow(1)
        $('#inclusion').append(this.cabeceiroTable)

        const peseiroText = document.createElement('h2')
        peseiroText.innerHTML = 'Peseiro'
        $('#inclusion').append(peseiroText)

        this.peseiroTable = Table.createTable()
                                    .addColumn(Table.createColumn('Nome', 70))
                                    .addColumn(Table.createColumn('Handicap', 30))
                                    .build()
        this.addPeseiroRow(1)
        $('#inclusion').append(this.peseiroTable)

        $('#inclusion').append(Button.createButton()
                                    .setId('inclusion-start-button')
                                    .setLabel('Começar')
                                    .setType(ButtonType.SUCCESS)
                                    .setAction(() => {
                                        const cabeceiroList = this.getPlayersFromTable(this.cabeceiroTable)
                                        const peseiroList = this.getPlayersFromTable(this.peseiroTable)
                                    
                                        const session = new Session(cabeceiroList, peseiroList)
                                        Storage.saveSession(session)
                                    
                                        loadContent('./sections/session.html', () => Session1Screen.loadSession(session))
                                    })
                                    .build())
    }

    static addCabeceiroRow(number) {
        const newRow = this.cabeceiroTable.tBodies.item(0).insertRow()
        newRow.id = 'inclusion-cabeceiro-' + number
        newRow.appendChild(Table.createTextInputCell(() => { // dynamically creates new rows on input
            const next = number + 1
            if (!this.isRowPresent(this.cabeceiroTable, 'inclusion-cabeceiro-' + next)) { // terrible performance, there's gotta be a better way
                this.addCabeceiroRow(next)
            }
        }))
        newRow.appendChild(Table.createTextInputCell())
    }

    static addPeseiroRow(number) {
        const newRow = this.peseiroTable.tBodies.item(0).insertRow()
        newRow.id = 'inclusion-peseiro-' + number
        newRow.appendChild(Table.createTextInputCell(() => {
            const next = number + 1
            if (!this.isRowPresent(this.peseiroTable, 'inclusion-peseiro-' + next)) {
                this.addPeseiroRow(next)
            }
        }))
        newRow.appendChild(Table.createTextInputCell())
    }

    static isRowPresent(table, rowId) {
        for (const row of table.tBodies.item(0).rows) {
            if (row.id === rowId) {
                return true
            }
        }
        return false
    }

    static getPlayersFromTable(table) {
        const players = []

        for (const row of table.tBodies.item(0).rows) {
            const name = row.childNodes[0].childNodes[0].value
            if (name) {
                const handicap = row.childNodes[1].childNodes[0].value
                players.push(new Player(name, handicap))
            }
        }

        return players
    }
}