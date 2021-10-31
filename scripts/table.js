class Table {
    
    id = ''
    columns = []
    rows = []

    constructor(id) {
        this.id = id
    }

    static createTable(id = 'match-set-table') {
        return new Table(id)
    }

    addColumn(column) {
        this.columns.push(column)
        return this
    }

    setRows(rows) {
        this.rows = rows
        return this
    }

    build() {
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

    static createColumn(label, widthPct = 20) {
        const th = document.createElement('th')
        th.scope = 'col'
        th.innerText = label
        th.style.width = widthPct + "%"
        return th
    }

    static createCell(label) {
        const td = document.createElement('td')
        td.innerText = label
        return td
    }

    static createTextInputCell(action = ()=>{}) {
        const input = document.createElement('input')
        input.type = 'text'
        input.classList.add('form-control')
        input.addEventListener('input', action)

        const cell = document.createElement('td')
        cell.appendChild(input)
        return cell
    }

    static createTimeInputCell(id) {
        const div = document.createElement('div')

        const timeInput = document.createElement('input')
        timeInput.classList.add('form-control')
        timeInput.id = 'time-' + id
        div.appendChild(timeInput)
    
        const satCheckboxDiv = document.createElement('div')
        const satChecboxId = 'sat-btn-' + id

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

    static getValuesFromTimeInputCell(cell) {
        return {
            time: cell.childNodes[0].value,
            isSat: cell.childNodes[1].childNodes[1].checked
        }
    }
}