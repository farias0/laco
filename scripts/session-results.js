class SessionResultsScreen {
    static session = []

    static loadSessionResults(session) {
        this.session = session

        $('#sessionResults').append(this.session.asString())
    }
}