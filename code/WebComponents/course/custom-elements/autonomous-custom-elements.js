// Autonomous custom elements 是独立的元素，它不继承其他内建的HTML元素
class PopUpInfo extends HTMLElement {
	constructor() {
		super();
		function createEle(tag) {
			return document.createElement(tag);
		}
		// 创建一个 shadow root
		const shadow = this.attachShadow({ mode: 'open' });

		// 创建一个 spans
		const wrapper = createEle('span');
		wrapper.setAttribute('class', 'wrapper');

		const icon = createEle('span');
		icon.setAttribute('class', 'icon');
		icon.setAttribute('tabindex', 0);

		const info = createEle('span');
		info.setAttribute('class', 'info');

		// 获取text属性上的内容，并添加到一个span标签内
		const text = this.getAttribute('text');
		info.textContent = text;

		// 插入 icon
		let imgUrl;
		if (this.hasAttribute('img')) {
			imgUrl = this.getAttribute('img');
		} else {
			imgUrl = 'img/closure.png';
		}
		const img = createEle('img');
		img.src = imgUrl;
		icon.appendChild(img);

		// 创建一些 CSS，并应用到 shadow dom上
		const style = createEle('style');
		style.textContent = `
        .wrapper {
          position: relative;
        }
        .info {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          background: white;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
        img {
          width: 1.2rem;
        }
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }
      `;

		// 将创建的元素附加到 shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
		wrapper.appendChild(icon);
		wrapper.appendChild(info);
	}
}

customElements.define('popup-info', PopUpInfo);
