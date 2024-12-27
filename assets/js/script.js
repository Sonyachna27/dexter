document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	prettyScroll();
	animationHeader();
	windowLoad();
	commandSliderFunc();
	newsSliderFunc();
	accordionFunction();
	handlePopup();

});

const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}
function windowLoad() {

	function statValueInit(statValues) {
		let values = statValues ? statValues : document.querySelectorAll('.stat-value');
		if (values) {
			values.forEach(statValue => {
				numScroll(statValue);
			})
		}
	}

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const statValues = targetElement.querySelectorAll('.stat-value');
				if (statValues.length) {
					statValueInit(statValues);
				}
			}
		})
	}, { threshold: 0.7});

	let sections = document.querySelectorAll('.who__count');
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		})
	}

	function numScroll(statValue) {
		let zeroValues = () => {
			statValue.innerHTML = 0;
		}

		const animationDuration = 3000;
		const frameDuration = 1000 / 60;
		const totalFrames = Math.round(animationDuration / frameDuration);
		const easeOutQuad = t => t * (2 - t);

		const animateCountUp = () => {
			let frame = 0;
			const countTo = parseInt(statValue.dataset.target.replace(/,/g, ''), 10);

			const counter = setInterval(() => {
				frame++;
				const progress = easeOutQuad(frame / totalFrames);
				const currentCount = Math.round(countTo * progress);

				if (parseInt(statValue.innerHTML, 10) !== currentCount) {
					statValue.innerHTML = currentCount;
				}

				if (frame === totalFrames) {
					clearInterval(counter);
					statValue.innerHTML = statValue.dataset.target;
				}
			}, frameDuration);
		}

		const runAnimations = () => {
			animateCountUp();
		}
		runAnimations();
	}
	window.addEventListener('DOMContentLoaded', () => {
		statValueInit();
	});

}
const commandSliderFunc = () =>{
	const commandSliderInit =  document.querySelector('.commandSlider');
	if(!commandSliderInit) return;

	var commandSlider = new Swiper(commandSliderInit, {
		pagination: {
			el: ".command-pagination",
			type: "progressbar",
		},
		navigation: {
					nextEl: ".command-button-next",
					prevEl: ".command-button-prev",
				},
		slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
   
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
	});
}
const newsSliderFunc = () => {
  const newsSliderInit = document.querySelector('.newsSlider');
  if (!newsSliderInit) return;

  var newsSlider = new Swiper(newsSliderInit, {
    pagination: {
      el: ".news-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".news-button-next",
      prevEl: ".news-button-prev",
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
};
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  
  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
    });
  });
};

const handlePopup = () => {
	const openPopup = () => {
			document.querySelectorAll('[data-open="open"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.add('open-popup');
					});
			});
	};

	const closePopup = () => {
			document.querySelectorAll('[data-close="close"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.remove('open-popup');
					});
			});
	};

	openPopup();
	closePopup();
};
const prettyScroll = () =>{
	document.querySelectorAll('a[href^="#"').forEach(link => {

		link.addEventListener('click', function(e) {
				e.preventDefault();
	
				let href = this.getAttribute('href').substring(1);
	
				const scrollTarget = document.getElementById(href);
	
				const topOffset = document.querySelector('header').offsetHeight;
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				const offsetPosition = elementPosition - topOffset;
	
				window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth'
				});
		});
	});
}