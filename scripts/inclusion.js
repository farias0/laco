class InclusionScreen {

    static loadInclusion() {
        this.setCabeceiroInputBehaviour(1)
        this.setPeseiroInputBehaviour(1)

        $(document).on('click', '#inclusion-start-button', e => {
            var cabeceiroNameList = this.getValuesFromChildrenInputs($('#inclusion-cabeceiro'))
            var peseiroNameList = this.getValuesFromChildrenInputs($('#inclusion-peseiro'))
        
            const cabeceiroList = cabeceiroNameList.map(c => new Player(c, "0"))
            const peseiroList = peseiroNameList.map(p => new Player(p, "0"))
        
            var session = new Session(cabeceiroList, peseiroList)
            Storage.saveSession(session)
        
            loadContent('./sections/session.html', () => Session1Screen.loadSession(session))
        })
    }

    static setCabeceiroInputBehaviour(number) {
        $(document).on('input', '#inclusion-cabeceiro-' + number, e => {
            var next = number + 1
            if (!this.isChildElementPresent('inclusion-cabeceiro', 'inclusion-cabeceiro-' + next)) { // terrible performance, there's gotta be a better way
                this.createNextCabeceiroInput(next)
            }
        })
    }
    
    static setPeseiroInputBehaviour(number) {
        $(document).on('input', '#inclusion-peseiro-' + number, e => {
            var next = number + 1
            if (!this.isChildElementPresent('inclusion-peseiro', 'inclusion-peseiro-' + next)) {
                this.createNextPeseiroInput(next)
            }
        })
    }

    static isChildElementPresent(parent, children) {
        for (var element of $('#' + parent).children()) {
            if (element.id == children) return true
        }
        return false
    }

    static createNextCabeceiroInput(number) {
        $('#inclusion-cabeceiro').append(this.newCabeceiroInput(number))
        this.setCabeceiroInputBehaviour(number)
    }
    
    static createNextPeseiroInput(number) {
        $('#inclusion-peseiro').append(this.newPeseiroInput(number))
        this.setPeseiroInputBehaviour(number)
    }

    static newCabeceiroInput(number) {
        return "<input type=\"text\" class=\"form-control\" id=\"inclusion-cabeceiro-" + number + "\">";
    }
    
    static newPeseiroInput(number) {
        return "<input type=\"text\" class=\"form-control\" id=\"inclusion-peseiro-" + number + "\">"
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