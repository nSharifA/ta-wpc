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
    threshold: 0.5,
  };
  
  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // get the nav item corresponding to the id of the section
        // that is currently in view
        const navItem = navItems[entry.target.id];
        // add 'active' class on the navItem
        navItem.classList.add('active');
        entry.target.classList.add('show');
        // remove 'active' class from any navItem that is not
        // same as 'navItem' defined above
        Object.values(navItems).forEach((item) => {
          if (item != navItem) {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  sections.forEach((sec) => observer.observe(sec));
