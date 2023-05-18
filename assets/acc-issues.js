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

const removeElements = (selector) => {
  const els = document.querySelectorAll(selector);
  els.forEach(el => el.remove());
}

const modifyAriaLabel = (selector, newContent = '') => {
  const els = document.querySelectorAll(selector);
  els.forEach(el => el.setAttribute('aria-label', newContent));
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
  } else if (location.pathname == '/') {
    // removing titles from payment methods list on footer
    const elementsToRemove = [
      '.footer__payment-icons svg title'
    ]
    elementsToRemove.forEach((selector) => {
      // removing aria-labelledby
      document.querySelectorAll(selector).forEach(el => el.parentElement.removeAttribute('aria-labelledby'));
      modifyAriaLabel(selector, 'card');
      removeElements(selector);
    });
  }

}
