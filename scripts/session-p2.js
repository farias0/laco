class Session2Screen {
    static session = []

    // TODO figure out how to reutilize table methods between sessions

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
    
    // creates the header for each set table
    static createTh(label, cssTag) {
        const th = document.createElement('th')
        th.classList.add(cssTag)
        th.scope = 'col'
        th.innerText = label
        return th
    }
    
    static createThSize1(label) {
        return this.createTh(label, 'match-table-column-p2-s1') //
    }
    
    static createThSize2(label) {
        return this.createTh(label, 'match-table-column-p2-s2') //
    }
    
    static createThSize3(label) {
        return this.createTh(label, 'match-table-column-p2-s3') //
    }
    
    // creates the cells for each table row (minus the time input cell)
    static createTd(label) {
        const td = document.createElement('td')
        td.innerText = label
        return td
    }
    
    static createSetTable(setNumber, matches) {
        const table = document.createElement('table')
        table.id = 'match-set-table'
        table.classList.add('table')
    
        const thead = table.createTHead()
        const headerTr = document.createElement('tr')
        headerTr.appendChild(this.createThSize1(''))
        headerTr.appendChild(this.createThSize3('Partida')) //
        headerTr.appendChild(this.createThSize2('1º Boi')) //
        headerTr.appendChild(this.createThSize2('2º Boi')) //
        thead.appendChild(headerTr)
    
        const tbody = table.createTBody()
        for (var match in matches) {
            const tr = document.createElement('tr')
            tr.appendChild(this.createTd(parseInt(match) + 1)) //
            tr.appendChild(this.createTd(matches[match].cabeceiro + ' x ' + matches[match].peseiro)) //
            tr.appendChild(this.createTd(matches[match].timeP1)) //
            tr.appendChild(this.createTimeInput(setNumber, match))
            tbody.appendChild(tr)
        }
    
        return table
    }

    static loadSessionP2(session) {
        this.session = session

        const matches = this.session.getMatches()
        let qualified = matches.filter(m => m.timeP1 !== Match.getSatValue())
        qualified.sort((a, b) => Match.timeStringTreatment(b.timeP1) - Match.timeStringTreatment(a.timeP1))

        $('#sessionP2').append(this.createSetTable(1, qualified))
    }
}