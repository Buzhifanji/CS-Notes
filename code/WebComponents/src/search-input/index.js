class SearchInput extends HTMLElement {
	constructor() {
		super();
		this.state = { count: 0 };
		// 创建一个 shadow root
		// open：shadow root元素可以从js外部访问根节点
		// closed：拒绝从js外部访问关闭的shadow root节点
		const shadow = this.attachShadow({ mode: 'open' });

		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('class', 'input-value');

		const button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.innerText = 'Search';

		const text = document.createElement('p');

		// 创建一些 CSS，并应用到 shadow dom上
		const style = document.createElement('style');
		style.textContent = '.input-value { margin: 5px; color: red }';

		shadow.append(input);
		shadow.append(button);
		shadow.append(style);
		shadow.append(text);

		button.addEventListener('click', (e) => {
			this.state.count++;
			text.textContent = `按钮被点击了${this.state.count}次。`;
		});
	}

	connectedCallback() {
		const defaultValue = this.getAttribute('defaultValue');
		const input = this.shadowRoot.querySelector('.input-value');
		input.value = defaultValue;
	}
}
customElements.define('search-input', SearchInput);
