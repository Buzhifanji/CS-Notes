// Customized built-in elements 继承自基本的HTML元素。在创建时，你必须指定所需扩展的元素
class ExpandingList extends HTMLUListElement {
	constructor() {
		self = super();
		console.log('self', self);
		const uls = Array.from(self.querySelectorAll('ul'));
		const lis = Array.from(self.querySelectorAll('li'));

		uls.forEach((ul) => (ul.style.display = 'none'));

		lis.forEach((li) => {
			if (li.querySelectorAll('ul').length > 0) {
				li.setAttribute('class', 'closed');

				const childText = li.childNodes[0];
				const newSpan = document.createElement('span');

				newSpan.textContent = childText.textContent;
				newSpan.style.cursor = 'pointer';

				newSpan.onclick = self.showul;

				childText.parantNode.insertBefore(newSpan, childText);
				childText.parantNode.removeChild(childText);
			}
		});
	}

	showul(e) {
		const nextul = e.target.nextElementSibling;

		if (nextul.style.display === 'block') {
			nextul.style.display = 'none';
			nextul.parantNode.setAttribute('class', 'closed');
		} else {
			nextul.style.display = 'block';
			nextul.parantNode.setAttribute('class', 'open');
		}
	}
}

customElements.define('expandling-list', ExpandingList, { extends: 'ul' });
