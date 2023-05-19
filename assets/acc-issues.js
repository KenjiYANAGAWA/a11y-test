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

const convertNumberToStars = (rating) => {
  const ratingAsStarsEl = ['<span class="spr-starratings spr-review-header-starratings" role="img">']
    for (let i = 0; i < 5; i++) {
      ratingAsStarsEl.push(`<i class="spr-icon spr-icon-star${rating <= i ? '' : '-empty'}" aria-hidden="true"></i>`);
    }
    ratingAsStarsEl.push('</span>');
    return ratingAsStarsEl.join('');
}

window.onload = () => {
  // removing announce bar if not home
  if (location.pathname !== '/') document.querySelector('.announcement-bar').remove();

  // Checking for specific pages
  if (location.pathname == '/products/tanida-gaming-dekstop') {
    // icon class to break
    const iconSelector = [
      '.icon-picto-box',
      '.icon-picto-customer-support',
      '.icon-picto-coupon',
      '.icon-picto-lock'
    ]
    iconSelector.forEach(selector => breakIcon(selector));

    // removing aria-label from reviews stars
    const reviewStars = document.querySelectorAll('.spr-starratings');
    reviewStars.forEach(starsContainer => starsContainer.removeAttribute('aria-label'));

    // Changing average rating display
    const averageRating = document.querySelector('.rating');
    const averageNumber = averageRating.firstElementChild.innerText.split('.')[0];
    averageRating.innerHTML = convertNumberToStars(averageNumber);

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
