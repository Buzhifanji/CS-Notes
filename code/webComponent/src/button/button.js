import { emit } from '../eventBus/index.js'

// let count = 0

function getTemplate(src, fit) {
    return `
        <style>
        </style>
        <button><slot></slot></button>
        `
}

class MyButton extends HTMLElement {
    // static get observedAttributes() {
    //     return ['src', 'fit']
    // }
    static count = 0
    constructor() {
        super()
        this.setShadowRoot()
        // count++
        // MyButton.count = count
        this.addEventListener('click', this.onClick, true)
        console.log('this', this)
    }
    setShadowRoot() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = getTemplate()
    }
    // get src() {
    //     return this.getAttribute('src') || ''
    // }
    // get fit() {
    //     return this.getAttribute('fit') || 'none'
    // }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('name', name, oldValue, newValue)
        if (oldValue) {
            updateAttribute(this, name, newValue)
        }
    }
    onClick(event) {
        console.log('count', this)
        emit()
    }
}

if (!customElements.get('my-button')) {
    customElements.define('my-button', MyButton);
}