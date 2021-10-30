class UI {

    static Table = class Table {

        id = ''
        columns = []
        rows = []

        constructor(id = 'match-set-table') {
            this.id = id
        }

        addColumn(column) {
            this.columns.push(column)
            return this
        }

        setRows(rows) {
            this.rows = rows
            return this
        }

        // createCell()
        // createTimeCell()

        build() {
            if (this.columns.length !== this.rows[0].length) {
                throw 'No. of cells per row incompatible with no. of columns'
            }

            const table = document.createElement('table')
            table.id = this.id
            table.classList.add('table')

            const thead = table.createTHead()
            const headerTr = document.createElement('tr')
            for (const column of this.columns) {
                headerTr.appendChild(column)
            }
            thead.appendChild(headerTr)

            const tbody = table.createTBody()
            for (const row of this.rows) {
                const tr = document.createElement('tr')
                for (const cell of row) {
                    tr.appendChild(cell)
                }
                tbody.appendChild(tr)
            }
        
            return table
        }
    }

    static createTable() {
        return new this.Table()
    }

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
}