class Player {
    constructor(name, handicap) {
        this.name = name
        this.handicap = parseFloat(handicap)
    }

    asString() {
        return "[" + this.name + ":" + this.handicap + "]"
    }
}

class Match {
    constructor(cabeceiro, peseiro, timeP1, timeP2) {
        this.cabeceiro = cabeceiro
        this.peseiro = peseiro
        this.timeP1 = timeP1
        this.timeP2 = timeP2
    }

    asString() {
        return "" + this.cabeceiro.asString() + " x " + this.peseiro.asString() + " : " + this.timeP1 + " : " + this.timeP2
    }

    getAverageTime() {
        return Match.averageTime(this.timeP1, this.timeP2)
    }

    static getSatValue() {
        return 'SAT'
    }

    static timeStringTreatment(time) {
        return parseFloat(time.replace(',','.').replace(':','.'))
    }

    static averageTime(p1, p2) {
        return (parseFloat(p1) + parseFloat(p2)) / 2
    }
}

function arrayFirstToLast(arr) {
    const first = arr.splice(0, 1)[0]
    return [...arr, first]
}

function getFromArrayWithLoop(arr, virtualIndex) {
    const noOfPastLoops = Math.floor(virtualIndex / arr.length)
    const actualIndex = virtualIndex - (noOfPastLoops * arr.length)
    return arr[actualIndex]
}

function isMatchPresent(sets, match) {
    for (var set of sets) {
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
    sets = []
    isOpen = false

    constructor(cabeceiroList, peseiroList) {
        this.timestamp = +new Date()
        this.setMatches(cabeceiroList, peseiroList)
        this.isOpen = true
    }

    // pretty sure it would be a lot more efficient to store the matches and then divide them into sets when needed 
    setMatches(cabeceiroList, peseiroList) {
        const numberOfSets = Math.max(cabeceiroList.length, peseiroList.length)
        const matchesPerSet = Math.min(cabeceiroList.length, peseiroList.length)
        const numberOfMatches = cabeceiroList.length * peseiroList.length

        let m=0;
        for (let s = 0; s < numberOfSets; s++) {

            this.sets.push([])

            for (; m < numberOfMatches - (matchesPerSet * (numberOfSets-s-1)) ; m++) {

                let newMatch = new Match(getFromArrayWithLoop(cabeceiroList, m), getFromArrayWithLoop(peseiroList, m))

                if (isMatchPresent(this.sets, newMatch)) {
                    if (cabeceiroList.length > peseiroList.length) {
                        cabeceiroList = arrayFirstToLast(cabeceiroList)
                    } else {
                        peseiroList = arrayFirstToLast(peseiroList)
                    }
                    newMatch = new Match(getFromArrayWithLoop(cabeceiroList, m), getFromArrayWithLoop(peseiroList, m))
                }

                this.sets[s].push(newMatch)
            }
        }
    }

    getSets() {
        return this.sets
    }

    getMatches() {
        const matches = []
        for (const set of this.sets) {
            matches.push(...set)
        }
        return matches
    }

    asString() {
        let str = ''
        for (const set of this.sets) {
            for (const match of set) {
                str += match.asString() + '\n'
            }
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