console.log('connected');

const breakIcon = (selector) => {
  const icons = document.querySelectorAll('');
    icons.forEach((icon) => {
      icon.removeAttribute('focusable');
      icon.setAttribute('tabindex', 0);
      const label = icon.parentElement.nextElementSibling.firstElementChild.firstElementChild.innerText;
      icon.setAttribute('aria-label', label);
    })
}

window.onload = () => {
  console.log('loaded');

  if (location.pathname == '/products/tanida-gaming-dekstop') {
    const iconSelector = ['.icon-picto-box', '.icon-picto-customer-support', '.icon-picto-coupon', 'icon-picto-lock']
    breakIcons();

  }

}
