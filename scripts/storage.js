class Storage {

    static sessionListKey = "sessions"

    static sortSessionList(sessionList) {
        return sessionList.sort((a, b) => b.timestamp - a.timestamp)
    }

    static getAllSessions() {
        var sessions = JSON.parse(window.localStorage.getItem(this.sessionListKey))
        if (!sessions) return []
        return sessions
    }

    static getFirstOpenSession() {
        var sessionList = this.getAllSessions()
        for (var session of sessionList) {
            if (session.isOpen) return session
        }
    }

    static saveSession(session) {
        var sessionList = this.getAllSessions()
        sessionList.push(session)
        sessionList = this.sortSessionList(sessionList)
        window.localStorage.setItem(this.sessionListKey, JSON.stringify(sessionList))
    }
}