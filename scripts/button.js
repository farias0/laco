class Button {
    id = ''
    label = ''
    type = ''
    action = () => {}

    constructor(id=Button.getRandomButtonId(), label='Botão', type=ButtonType.NORMAL) {
        this.id = id
        this.label = label
        this.type = type
    }

    static createButton() {
        return new Button()
    }

    setId(id) {
        this.id = id
        return this
    }

    setLabel(label) {
        this.label = label
        return this
    }

    setType(type) {
        this.type = type
        return this
    }

    setAction(action) {
        this.action = action
        return this
    }
    
    build() {
        const button = document.createElement('button')
        button.id = this.id
        button.classList.add('btn', ButtonType.getBootstrapClass(this.type), 'btn-lg', 'float-right')
        button.innerHTML = this.label

        $(document).on('click', '#' + this.id, this.action)

        return button
    }

    static getRandomButtonId() {
        return 'btn-' + (Math.random() * 10000)
    }
}

class ButtonType {
    static NORMAL = 'NORMAL'
    static SUCCESS = 'SUCCESS'
    
    static getBootstrapClass(type) {
        switch (type) {
            case this.NORMAL:
                return 'btn-primary'
            case this.SUCCESS:
                return 'btn-success'
            default:
                throw 'Invalid button type; use ButtonType class'
        }
    }
}