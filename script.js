const items = {
	sticker: { name: 'Sticker Pack', price: 0.5 },
	keychain: { name: 'Keychain', price: 1.5 },
	plush: { name: 'Mini Plush', price: 4.0 },
	comic: { name: 'Comic Book', price: 2.75 },
	mystery: { name: 'Mystery Box', price: 3.25 }
};

const btnGroup = document.getElementById('button-group');
const cart = document.getElementById('shopping-cart');
const totalSpan = document.getElementById('total-span');
let total = 0;

btnGroup.addEventListener('click', (e) => {
	const btn = e.target.closest('button');
	if (!btn || !btn.id) return;
	const id = btn.id;
	const item = items[id];
	if (!item) return;
	addToCart(item);
});

function addToCart(item) {
	total = +(total + item.price).toFixed(2);
	totalSpan.textContent = total.toFixed(2);

	const row = document.createElement('div');
	row.className = 'cart-item';
	row.innerHTML = `
		<div>
			<div class="item-name">${item.name}</div>
			<div class="item-price">$${item.price.toFixed(2)}</div>
		</div>
		<div>
			<button class="remove-btn" aria-label="Remove ${item.name}">Remove</button>
		</div>
	`;
	cart.appendChild(row);
}

cart.addEventListener('click', (e) => {
	if (!e.target.classList.contains('remove-btn')) return;
	const row = e.target.closest('.cart-item');
	if (!row) return;
	const priceText = row.querySelector('.item-price').textContent.replace('$', '');
	const price = parseFloat(priceText) || 0;
	total = +(total - price).toFixed(2);
	totalSpan.textContent = total.toFixed(2);
	row.remove();
});

// Optional: keyboard accessibility for buttons
document.querySelectorAll('#button-group button').forEach(b => {
	b.addEventListener('keyup', (e) => {
		if (e.key === 'Enter' || e.key === ' ') b.click();
	});
});
