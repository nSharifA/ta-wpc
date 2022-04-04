const sections = [
  ...document.querySelectorAll('main section')
];

const navItems = {};
[...document.querySelectorAll('nav a')].forEach(item => {
  navItems[item.dataset.for] = item;
});

// intersection observer setup
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0.25, 0.5, 0.75],
};

let prevIntersectRatio = 0;

let menuToggleCb = document.getElementById('nav-toggle');

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.25 && 0.5 > entry.intersectionRatio) {
      // get the nav item corresponding to the id of the section
      // that is currently in view
      const navItem = navItems[entry.target.id];
      // add 'active' class on the navItem
      navItem.classList.add('active');
      window.history.pushState(entry.target.id, entry.target.id, '#' + entry.target.id);
      // remove 'active' class from any navItem that is not
      // same as 'navItem' defined above
      Object.values(navItems).forEach((item) => {
        if (item != navItem) {
          item.classList.remove('active');
        }
      });
    }
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      menuToggleCb.checked = false;
    }
    prevIntersectRatio = entry.intersectionRatio;
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((sec) => observer.observe(sec));
