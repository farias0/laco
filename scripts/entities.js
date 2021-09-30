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

function arrayLastToFirst(arr) {
    var last = arr.pop()
    return [last, ...arr]
}

class Session {
    timestamp = ''
    matches = []
    isOpen = false

    constructor(cabeceiroList, peseiroList) {
        this.timestamp = +new Date()
        this.setMatches(cabeceiroList, peseiroList)
        this.isOpen = true
    }

    setMatches(cabeceiroList, peseiroList) {
        var numberOfSets = Math.max(cabeceiroList.length, peseiroList.length)
        var matchesPerSet = Math.min(cabeceiroList.length, peseiroList.length)

        for (var s = 0; s < numberOfSets; s++) {
            var set = []

            for (var m = 0; m < matchesPerSet; m++) {
                set.push(new Match(cabeceiroList[m], peseiroList[m]))
            }

            this.matches.push(set)

            if (cabeceiroList.length > peseiroList.length) {
                cabeceiroList = arrayLastToFirst(cabeceiroList)
            } else {
                peseiroList = arrayLastToFirst(peseiroList)
            }
        }
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