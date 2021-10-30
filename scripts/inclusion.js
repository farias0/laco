class InclusionScreen {

    static loadInclusion() {
        this.createCabeceiroInput(1)
        this.createPeseiroInput(1)

        $('#inclusion').append(Button.createButton()
                                    .setId('inclusion-start-button')
                                    .setLabel('Começar')
                                    .setType(ButtonType.SUCCESS)
                                    .setAction(() => {
                                        const cabeceiroList = this.getValuesFromChildrenInputs($('#inclusion-cabeceiro'))
                                                                    .map(c => new Player(c, "0"))
                                        const peseiroList = this.getValuesFromChildrenInputs($('#inclusion-peseiro'))
                                                                .map(p => new Player(p, "0"))
                                    
                                        const session = new Session(cabeceiroList, peseiroList)
                                        Storage.saveSession(session)
                                    
                                        loadContent('./sections/session.html', () => Session1Screen.loadSession(session))
                                    })
                                    .build())
    }

    static createCabeceiroInput(number) {
        $('#inclusion-cabeceiro').append(this.newInput('inclusion-cabeceiro-' + number))

        $(document).on('input', '#inclusion-cabeceiro-' + number, e => {
            var next = number + 1
            if (!this.isChildElementPresent('inclusion-cabeceiro', 'inclusion-cabeceiro-' + next)) { // terrible performance, there's gotta be a better way
                this.createCabeceiroInput(next)
            }
        })
    }
    
    static createPeseiroInput(number) {
        $('#inclusion-peseiro').append(this.newInput('inclusion-peseiro-' + number))

        $(document).on('input', '#inclusion-peseiro-' + number, e => {
            var next = number + 1
            if (!this.isChildElementPresent('inclusion-peseiro', 'inclusion-peseiro-' + next)) {
                this.createPeseiroInput(next)
            }
        })
    }

    static isChildElementPresent(parent, children) {
        for (var element of $('#' + parent).children()) {
            if (element.id == children) return true
        }
        return false
    }

    static newInput(id) {
        const input = document.createElement('input')
        input.type = 'text'
        input.classList.add('form-control')
        input.id = id
        return input
    }

    static getValuesFromChildrenInputs(element) {
        // for some reason the code below isn't working
        // return element.children()
        //.filter(c => c.tagName == 'INPUT')
    
        var arr = []
    
        for (const e of element.children()) {
            if (e.tagName === 'INPUT') {
                var val = document.getElementById(e.id).value
                if (val.length > 0) arr.push(val)
            }
        }
    
        return arr
    }
}