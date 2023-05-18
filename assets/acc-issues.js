console.log('connected');

const breakIcon = (selector) => {
  const icons = document.querySelectorAll(selector);
    icons.forEach((icon) => {
      icon.removeAttribute('focusable');
      const label = icon.parentElement.nextElementSibling.firstElementChild.firstElementChild.innerText;
      icon.setAttribute('aria-label', label);
      icon.setAttribute('tabindex', 0);
    })
}

window.onload = () => {
  console.log('loaded');

  if (location.pathname == '/products/tanida-gaming-dekstop') {
    const iconSelector = ['.icon-picto-box', '.icon-picto-customer-support', '.icon-picto-coupon', 'icon-picto-lock']
    iconSelector.forEach(selector => breakIcon(selector));
  }

}
