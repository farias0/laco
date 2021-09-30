class Match {
    constructor(cabeceiro, peseiro, time) {
        this.cabeceiro = cabeceiro
        this.peseiro = peseiro
        this.time = time
    }

    setTime(time) {
        this.time = time
    }

    asString() {
        return "" + this.cabeceiro + " x " + this.peseiro + " : " + this.time
    }
}

class Session {
    timestamp = ''
    matches = []
    isOpen = false

    constructor(cabeceiroList, peseiroList) {
        for (var cabeceiro of cabeceiroList) {
            for (var peseiro of peseiroList) {
                this.matches.push(new Match(cabeceiro, peseiro))
            }
        }
        this.timestamp = +new Date()
        this.isOpen = true
    }

    getMatches() {
        return this.matches
    }

    asString() {
        var str = ''
        for (var match of this.matches) {
            str += match.asString() + '\n'
        }
        return str.slice(0, -1)
    }

    isOpen() {
        return this.isOpen
    }

    close() {
        this.isOpen = false
    }
}