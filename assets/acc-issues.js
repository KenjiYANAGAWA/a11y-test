console.log('connected');

const breakIcon = (selector) => {
  const icons = document.querySelectorAll(selector);
    icons.forEach((icon) => {
      icon.removeAttribute('focusable');
      icon.removeAttribute('role');
      const label = icon.parentElement.nextElementSibling.firstElementChild.firstElementChild.innerText;
      icon.setAttribute('aria-label', label);
      icon.setAttribute('tabindex', 0);
    })
}

window.onload = () => {
  console.log('loaded');

  if (location.pathname == '/products/tanida-gaming-dekstop') {
    const iconSelector = [
      '.icon-picto-box',
      '.icon-picto-customer-support',
      '.icon-picto-coupon',
      '.icon-picto-lock'
    ]
    iconSelector.forEach(selector => breakIcon(selector));
    const reviewStars = document.querySelectorAll('.spr-starratings');
    reviewStars.forEach(starsContainer => starsContainer.removeAttribute('aria-label'));
    // changeStars()
  } else if (location.pathname == '/') {
    // removing titles from payment methods list on footer
    const elementsToRemove = [
      '.footer__payment-icons svg title'
    ]
    elementsToRemove.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      // removing aria-labelledby
      elements.forEach((el) => {
        el.parentElement.removeAttribute('aria-labelledby');
        el.parentElement.setAttribute('aria-label', 'card');
        el.remove();
      });
    });
  }

}
