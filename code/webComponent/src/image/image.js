function getTemplate(src, fit) {
    return `
        <style>
            :host > .my-image {
                position: relative;
                display: inline-block;
                overflow: hidden;
                width: 100px;
                height: 100px;
            }
            :host .my-image_inner {
                vertical-align: top;
                width: 100%;
                height: 100%;
            }
        </style>
        <div class="my-image">
            <img id="img" style="object-fit: ${fit}" src="${src}" class="my-image_inner" />
        </div>
        `
}

function updateAttribute(elem, name, value) {
    const shadow = elem.shadowRoot;
    shadow.querySelector('img').setAttribute(name, value)
}


class MyImage extends HTMLElement {
    // 监听属性变化（解决父传子的通信问题）
    static get observedAttributes() {
        return ['src', 'fit']
    }
    constructor() {
        super()
        this.setShadowRoot()
    }
    setShadowRoot() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = getTemplate(this.src, this.fit)
    }
    get src() {
        return this.getAttribute('src') || ''
    }
    get fit() {
        return this.getAttribute('fit') || 'none'
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('name', name, oldValue, newValue)
        if (oldValue) {
            updateAttribute(this, name, newValue)
        }
    }
}

const customElementRegistry = window.customElements;

if (!customElementRegistry.get('my-image')) {
    customElementRegistry.define('my-image', MyImage);
}