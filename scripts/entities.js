class Match {
    constructor(cabeceiro, peseiro, time) {
        this.cabeceiro = cabeceiro
        this.peseiro = peseiro
        this.time = time
    }

    getCabeceiro() {
        return this.cabeceiro
    }

    getPeseiro() {
        return this.peseiro
    }

    getTime() {
        return this.time
    }

    setTime(time) {
        this.time = time
    }

    asString() {
        return "" + this.cabeceiro + " x " + this.peseiro + " : " + this.time
    }
}

function arrayFirstToLast(arr) {
    var first = arr.splice(0, 1)[0]
    return [...arr, first]
}

function getFromArrayWithLoop(arr, index) {
    var noOfPastLoops = Math.floor(index / arr.length)
    var actualIndex = index - (noOfPastLoops * arr.length)
    return arr[actualIndex]
}

function isMatchPresent(matches, match) {
    for (var set of matches) {
        for (var m of set) {
            if (m.cabeceiro === match.cabeceiro && m.peseiro === match.peseiro) {
                return true
            }
        }
    }
    return false
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
        var numberOfMatches = cabeceiroList.length * peseiroList.length

        var m=0;
        for (var s = 0; s < numberOfSets; s++) {

            this.matches.push([])

            for (; m < numberOfMatches - (matchesPerSet * (numberOfSets-s-1)) ; m++) {

                var newMatch = new Match(getFromArrayWithLoop(cabeceiroList, m), getFromArrayWithLoop(peseiroList, m))

                if (isMatchPresent(this.matches, newMatch)) {
                    if (cabeceiroList.length > peseiroList.length) {
                        cabeceiroList = arrayFirstToLast(cabeceiroList)
                    } else {
                        peseiroList = arrayFirstToLast(peseiroList)
                    }
                    newMatch = new Match(getFromArrayWithLoop(cabeceiroList, m), getFromArrayWithLoop(peseiroList, m))
                }

                this.matches[s].push(newMatch)
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