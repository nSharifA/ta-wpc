const sections = [
  ...document.querySelectorAll('main section')
];

const header = document.querySelector('body > header');

const navItems = {};
[...document.querySelectorAll('nav a')].forEach(item => {
  navItems[item.dataset.for] = item;
  item.addEventListener('click', e => menuToggleCb.checked = false);
});

window.addEventListener('wheel', function(e) {
  setHeaderVisible(e.deltaY < 0);
});

function setHeaderVisible(isVisible) {
  if (isVisible) {
    header.classList.remove('hidden');
  } else {
    menuToggleCb.checked = false;
    header.classList.add('hidden');
  }
}

let lastEvent = null;

document.addEventListener("touchstart", function (e) {
  lastEvent = e;
});
document.addEventListener("touchmove", function (e) {
    if (lastEvent) {
      setHeaderVisible(e.touches[0].pageY - lastEvent.touches[0].pageY > 0);
    }
});
document.addEventListener("touched", function (e) {
  lastEvent = null;
});

const navs = [...document.querySelectorAll('nav a')];

let menuToggleCb = document.getElementById('nav-toggle');

function selectNav(nav) {
  navs.forEach(sel => {
    if (sel === nav) {
      history.replaceState(undefined, undefined, "#" + nav.dataset.for);
    }
  })
}

const navObserverOptions = {
  root: null,
  rootMargin: '-100px 0px 0px 0px',
  threshold: 0.35,
};

function navObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      selectNav(navItems[entry.target.id]);
    }
  });
}

const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
sections.forEach((sec) => {
  if (sec.id !== 'contact') {
    navObserver.observe(sec);
  }
});

const contactObserverOptions = {
  root: null,
  rootMargin: '0% 0% 0% 0%',
  threshold: 0.95,
};

function contactObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      selectNav(navItems[entry.target.id]);
    } else {
      selectNav(navItems['faq']);
    }
  });
}

const contactObserver = new IntersectionObserver(contactObserverCallback, contactObserverOptions);
contactObserver.observe(document.getElementById('contact'));


const fadeInObserverOptions = {
  root: null,
  rootMargin: '-40% 0%',
  threshold: 0.05,
};


function fadeInObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      fadeInObserver.unobserve(entry.target);
    }
  });
}

const fadeInObserver = new IntersectionObserver(fadeInObserverCallback, fadeInObserverOptions);
sections.forEach((sec) => fadeInObserver.observe(sec));
