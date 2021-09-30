class Match {
    constructor(p1, p2, time) {
        this.p1 = p1
        this.p2 = p2
        this.time = time
    }

    setTime(time) {
        this.time = time
    }

    asString() {
        return "" + this.p1 + " x " + this.p2 + " : " + this.time
    }
}

class Session {
    matches = []

    constructor(peList, lacoList) {
        for (var pe of peList) {
            for (var laco of lacoList) {
                this.matches.push(new Match(pe, laco))
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
}