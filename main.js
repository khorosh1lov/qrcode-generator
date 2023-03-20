const form = document.querySelector('#generator-form');
const qr = document.querySelector('#qr-code');

const onGenerateSubmit = (e) => {
	e.preventDefault();
	clear();

	const url = document.querySelector('#user-url').value;
	const size = document.querySelector('#qr-size').value;

	if (url === '') {
		alert('Enter an URL!');
		return;
	}

	showSpinner();

	setTimeout(() => {
		hideSpinner();
		generateQR(url, size);

		setTimeout(() => {
			const saveUrl = document.querySelector('img').src;
			createSaveButton(saveUrl);
		}, 50);
	}, 2000);
};

const generateQR = (url, size) => {
	const qrCode = new QRCode('qr-code', {
		text: url,
		width: size,
		height: size,
	});
};

const showSpinner = () => {
	document.querySelector('#spinner').style.display = 'block';
};

const hideSpinner = () => {
	document.querySelector('#spinner').style.display = 'none';
};

const clear = () => {
	qr.innerHTML = '';
	const saveButton = document.querySelector('#save-link');

	if (saveButton) saveButton.remove();
};

const createSaveButton = (saveUrl) => {
	const link = document.createElement('a');
	link.id = 'save-link';
	link.className = 'save-button';
	link.target = '_blank';
	link.textContent = 'Save or Print QR Code';
	document.querySelector('#qr').appendChild(link);

	link.addEventListener('click', () => {
		openInNewTab(saveUrl);
	});
};

const openInNewTab = (saveUrl) => {
	const newWindow = window.open();
	setTimeout(() => {
		newWindow.document.write(`<img src="${saveUrl}"/>`);
		newWindow.location.href = saveUrl;
	}, 500);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

const currentYear = new Date().getFullYear();
const copyright = document.createElement('p');
const footerWrapper = document.querySelector('.footer-wrapper');

copyright.innerHTML = `© ${currentYear} Alexander Khoroshilov`;
footerWrapper.appendChild(copyright);