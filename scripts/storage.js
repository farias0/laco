class Storage {

    static sessionListKey = "sessions"

    static sortSessionList(sessionList) {
        return sessionList.sort((a, b) => b.timestamp - a.timestamp)
    }

    static getAllSessions() {
        var sessions = JSON.parse(window.localStorage.getItem(this.sessionListKey))
        if (!sessions) return []
        return sessions.map(s => Session.recreateFromJson(s))
    }

    static getFirstOpenSession() {
        var sessionList = this.getAllSessions()
        for (var session of sessionList) {
            if (session.isOpen) return session
        }
    }

    static clearAllHistory() {
        window.localStorage.clear()
    }

    static saveSession(session) {
        var sessionList = this.getAllSessions()

        var alreadyPresentIndex = null
        for (var i in sessionList) {
            if (sessionList[i].timestamp === session.timestamp) {
                alreadyPresentIndex = i
                break
            }
        }

        if (alreadyPresentIndex) {
            sessionList[alreadyPresentIndex] = session
        } else {
            sessionList.push(session)
            sessionList = this.sortSessionList(sessionList)
        }

        window.localStorage.setItem(this.sessionListKey, JSON.stringify(sessionList))
    }
}