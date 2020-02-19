window.onload = () => {
  const scrollToT = () => {
    const scroll = (e) => {
      const target = document.querySelector(e);
      const topo = target.offsetTop;
      window.scrollTo({
        top: topo,
        behavior: 'smooth'
      });
      // target.scrollIntoView({
      // 	block: 'start',
      // 	behavior: 'smooth',
      // })
    };
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

  if (!window.Slide) {
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
		closeModal();
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

  const addSlideClick = () => {
    const list = document.querySelectorAll('.slide li img');
    list.forEach((e) => {
      e.addEventListener('mousedown', onStart);
    })
  }

  addSlideClick();

  const closeModal = () => {
    const closeBtn = document.querySelector('.close-button');

    // Close with keyDown
    const closeKeydown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
		}

		// Close with Click
    const close = () => {
      time = 500;
      modal.firstElementChild.style = `animation: bounce-out ${time}ms forwards`;
      setTimeout(() => modal.style.display = 'none', time);
			document.body.setAttribute('style', 'overflow: auto');
			removeEvents();
		}

		const stop = (e) => {
      e.stopPropagation();
		};
		
		// Add Events
		const addEvents = () => {
			[modal, closeBtn].forEach((e) => {
				e.addEventListener('click', close, false);
			});
			modal.firstElementChild.addEventListener('click', stop, false);
			window.addEventListener('keydown', closeKeydown);
		}
		addEvents();

		// Remove Events
		const removeEvents = () => {
			[modal, closeBtn].forEach((e) => {
				e.removeEventListener('click', close, false);
			});
			modal.firstElementChild.removeEventListener('click', stop, false);
			window.removeEventListener('keydown', closeKeydown);
		}
	}

  // Mobile menu
  const check = document.querySelector('#enable');
  const closeMenu = () => {
    const a = document.querySelectorAll('.menu a');
    a.forEach((e) => {
      e.addEventListener('click', () => {
        check.click();
      })
    })
  }
  closeMenu();

  // Slide
  const FadeSlide = class {
    constructor(container, time) {
      this.container = this.s(container);
      this.items = [...this.container.children].filter((e) => e.tagName === 'div'.toUpperCase());
      this.time = time || 5000;
      this.active = 0;
      this.count = 0;
    }
    s(e) {
      return document.querySelector(e);
    }
    sa(e) {
      return document.querySelectorAll(e);
    }
    changeSlide() {
      this.items.forEach((e) => e.classList.remove('active'));
      this.items[this.count].classList.add('active');
      this.items[this.count].style = `animation: bounce .1s forwards;`;
    }
    nextSlide() {
      this.items[this.count].style = `animation: bounce-out .5s forwards;`;
      this.count += 1;
      const { length } = this.items;
      if (this.count >= length) this.count = 0;
      // this.changeSlide(this.count);
      setTimeout(this.changeSlide, 500);
    }
    startAutoSlide(time) {
      return setInterval(this.nextSlide, time);
    }
    stopAutoSlide(timer) {
      timer.clearInterval();
    }
    bindEvents() {
      this.nextSlide = this.nextSlide.bind(this);
      this.changeSlide = this.changeSlide.bind(this);
    }
    init() {
      this.bindEvents();
			// const timer = this.startAutoSlide(this.time);
			this.startAutoSlide(this.time);
		}
  }
  const introSlide = new FadeSlide('[data-slide=intro]', 5500);
	introSlide.init();
	
	// Simple Form
	if (window.SimpleForm) {
		new SimpleForm({
			form: ".formphp", // seletor do formulário
			button: "#enviar", // seletor do botão
			erro: `
			<div id='form-erro'>
				<h2 class=''>Falha ao enviar mensagem!</h2>
				<p>Um erro ocorreu, tente enviar um email para <span>contato@wapy.com.br</span> ou pode nos contatar diretamente pelo whatsapp<a class='button' href='https://wa.me/5511945418250'>CHAMAR</a>
				</p>
			</div>
			`, // mensagem de erro
			sucesso: "<div id='form-sucesso'><h2 class='sub'>Mensagem enviada com sucesso</h2><p>Em breve entraremos em contato com você.</p></div>", // mensagem de sucesso
		});
	}

	// Promo Buttons
	const addMsg = (e) => {
		const msg = document.querySelector('#mensagem');
		const target = document.querySelector('.form-contato');
		const btn = e.target;
		const plan = btn.parentElement.firstElementChild.innerText;
		msg.value = `Olá,\nGostaria de mais informações sobre o plano "${plan}"`;
		target.scrollIntoView({
			block: 'start',
			behavior: 'smooth',
		});
	}
	const addEvents = () => {
		const buttons = document.querySelectorAll('.promo div button');
		buttons.forEach((b) => {
			b.addEventListener('click', addMsg);
		})
	}
	addEvents();
}