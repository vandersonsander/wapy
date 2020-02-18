const scrollToT = () => {
	const scroll = (e) => {
		const target = document.querySelector(e);
		const topo = target.offsetTop;
		console.log(topo);
		window.scrollTo({
			top: topo,
			behavior: 'smooth'
		});
	};
	// const promo = document.querySelectorAll('[class^=promo-]');
	// promo.forEach((e) => {
	// 	e.addEventListener('click', () => scroll('#contato'));
	// })
	// const menu = document.querySelectorAll('.menu a');
	// menu.forEach((t) => {
	// 	t.addEventListener('click', (e) => {
	// 		e.preventDefault();
	// 		const href = e.target.getAttribute('data-action');
	// 		scroll(href);
	// 	})
	// })
	const call = document.querySelectorAll('[data-action]');
	call.forEach((t) => {
		t.addEventListener('click', (e) => {
			e.preventDefault();
			const href = t.getAttribute('data-action');
			scroll(href);
		})
	})
}
scrollToT();

if(!window.Slide) {
	const slide = new Slide('.slide-wrapper', '.slide', '');
	// auto = slide.autoSlide(1000);
	slide.init(2);
}

const modal = document.querySelector('#modal-bg');
const openImg = (e) => {
	e.preventDefault();
	document.body.setAttribute('style', 'overflow: hidden');
	modal.style.display = 'block';
	const container = modal.firstElementChild;
	const img = container.querySelector('img');
	container.style = 'animation: bounce 1s linear forwards;';
	img.src = e.target.src;
}
let moving = false;

// Mouse move

const onStart = (e) => {
	e.preventDefault();
	e.target.addEventListener('mousemove', onMove);
	e.target.addEventListener('mouseup', onEnd);
	moving = false;
}

const onMove = () => {
	moving = true;
}
const onEnd = (e) => {
	e.target.removeEventListener('mousemove', onMove);
	if (!moving) openImg(e);
}


const addEvents = () => {
	const list = document.querySelectorAll('.slide li img');
	list.forEach((e) => {
		e.addEventListener('mousedown', onStart);
	})
}

addEvents();

const closeModal = () => {
	const closeBtn = document.querySelector('.close-button');

	// Close with keyDown
	const closeKeydown = (e) => {
		if (e.key === 'Escape') {
			close();
			console.log(e);
			window.removeEventListener('keydown', closeKeydown);
		}
	}

	// Close with Click
	const close = () => {
		time = 500;
		modal.firstElementChild.style = `animation: bounce-out ${time}ms forwards`;
		setTimeout(() => modal.style.display = 'none', time);
		document.body.setAttribute('style', 'overflow: auto');
		window.addEventListener('keydown', closeKeydown);
	}
	const stop = (e) => {
		e.stopPropagation();
	}
	[modal, closeBtn].forEach((e) => {
		e.addEventListener('click', close, false);
	})
	modal.firstElementChild.addEventListener('click', stop, false);
}
closeModal();

// Slide 