const removeFooterLink = (href) => {
  document.querySelector(`.footer__wrapper li:has(a[href="${href}"])`).remove();
}
console.log("functions"); 