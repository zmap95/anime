jQuery(document).ready(function ($) {
  $(document).ready(function () {
    let timeLoad = 2500;
    if (sessionStorage.getItem('is_reloaded')) timeLoad = 1600;
    setTimeout(function () {
      $('#loading').hide();
    }, timeLoad);
    sessionStorage.setItem('is_reloaded', true);

    new WOW().init();

    $('.owl__gameplay-item').owlCarousel({
      loop: true,
      dots: true,
      nav: false,
      margin: 0,
      autoplay: true,
      autoplayTimeout: 3000,
      items: 1,
      singleItem: true
    });

    $('.owl__nft-item').owlCarousel({
      responsiveClass: true,
      margin: 36,
      loop: true,
      dots: false,
      nav: true,
      navText: [
        "<button class='slide__prev-btn'>",
        "<button class='slide__next-btn'>"
      ],
      responsive: {
        0: {
          items: 2,
          margin: 15
        },
        414: {
          items: 2,
          margin: 20
        },
        768: {
          items: 3
        },
        1200: {
          items: 4
        }
      }
    });

    $('.owl__evolve-item').owlCarousel({
      responsiveClass: true,
      loop: true,
      dots: false,
      nav: true,
      margin: 0,
      autoplay: true,
      navText: [
        "<button class='slide__prev-btn'>",
        "<button class='slide__next-btn'>"
      ],
      autoplayTimeout: 5000,
      items: 1,
      singleItem: true
    });
  });
});

const setDisplayVideo = () => {
  let timeLoad = sessionStorage.getItem('is_reloaded') ? 1500 : 2000;
  setTimeout(function () {
    document.querySelector('#banner__image').style.display = 'none';
    document.querySelector('#banner__video').style.display = 'block';
  }, timeLoad);
};
setDisplayVideo();

// close menu on click
const menuBoxItems = document.querySelectorAll(
  '.header__menu-box li.nav__item'
);

//handle click menu in mobile
menuBoxItems.forEach((item, index) => {
  if (index < menuBoxItems.length - 2) {
    item.addEventListener('click', () => {
      document.querySelector('#collapse').checked = false;
    });
  } else {
    // click menubox papers button
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  }
});

// active navbar
const navBarLinkItems = document.querySelectorAll('a.nav__item');

// reset current active button
const resetActive = () => {
  navBarLinkItems.forEach((item) => {
    item.classList.remove('active');
  });
};

// handle click button nav bar
navBarLinkItems.forEach((item, index) => {
  // paper button in navbar
  if (index === navBarLinkItems.length - 1) {
    item.addEventListener('click', () => {
      const isActiveAlready = item.classList.contains('active');
      resetActive();
      if (!isActiveAlready) {
        item.classList.add('active');
      }
    });
  } else {
    item.addEventListener('click', () => {
      resetActive();
      item.classList.add('active');
    });
  }
});

// handle hightlight navbar on scroll event
const sections = document.querySelectorAll('section');

const handleOnscroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    const idSection = entry.target.id;
    console.log('entry.target', entry.target.id);
    hightLightNavBar(idSection);
  });
};

const hightLightNavBar = (idSection) => {
  resetActive();
  const navbarLink = document.querySelector(
    `a.nav__item[href='#${idSection}']`
  );
  if (navbarLink) navbarLink.classList.add('active');
};

let options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.5
};

const observer = new IntersectionObserver(handleOnscroll, options);

sections.forEach((item) => {
  observer.observe(item);
});
