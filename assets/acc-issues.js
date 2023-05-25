console.log('connected');
const lowContrastColor = "rgb(var(--text-color) / .4)"

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
      ratingAsStarsEl.push(`<i class="spr-icon spr-icon-star${rating <= i ? '-empty' : ''}" alt=""></i>`);
    }
    ratingAsStarsEl.push('</span>');
    return ratingAsStarsEl.join('');
}

window.onload = () => {
  // displaying alert
  const bg = document.createElement('div');
  bg.style = 'position: fixed; display:flex; align-items: center; height: 100vh; width: 100vw; z-index: 1; background: rgba(0,0,0,.6)'
  const popup = document.createElement('div');
  popup.style = 'margin: o auto; background: white'
  popup.innerHTML = `<strong>WARNING<strong>
  Do not buy anything on this site.
  Go to masterdynamic.com to buy the products listed on this site.
  This site is very inaccessible.

  This is an E-Commerce site to demonstrate various WCAG accessibility violations. This site tests whether the automated accessibility testing tool can catch those issues.

  In order to make this site more realistic and simulate more relevant and meaningful issues, we populated this site with real products from Master & Dynamic. If you like their products, please go get the real products at masterdynamic.com

  This site is made by adding various accessibility violations to the existing very cool Shopify theme, Impact. We used Master & Dynamic products as the theme originally had those products.`
  bg.append(popup)
  document.body.append(bg)
  // display alert

  // removing announce bar if not home
  if (location.pathname !== '/') document.querySelector('.announcement-bar').remove();

  // Checking for specific pages
  if (location.pathname == '/products/tanida-gaming-dekstop') {
    // messing focus from pop up when add to cart;
    const buyBtn = document.querySelector('.buy-buttons button');
    buyBtn.addEventListener('click', () => {
      console.log('click');
      document.querySelector('[initial-focus]').removeAttribute('initial-focus');
      console.log(window.activeElement);
    });

    // Changing average rating display
    const averageRating = document.querySelector('.rating');
    const averageNumber = averageRating.firstElementChild.innerText.split('.')[0];
    averageRating.innerHTML = '';
    averageRating.innerHTML = convertNumberToStars(averageNumber);

    // removing aria-label from reviews stars
    setTimeout(() => {
      const reviewStars = document.querySelectorAll("#shopify-product-reviews .spr-starratings");
      reviewStars.forEach(starsContainer => starsContainer.removeAttribute('aria-label'));
    }, 1000);

    // making each item in description focusable
    const itemDescriptionLines = document.querySelectorAll('.product-info__description .prose div');
    itemDescriptionLines.forEach(line => line.setAttribute('tabindex', 0));

  } else if (location.pathname == '/') {
    // change title from home page
    document.title = '50% off';

    // removing titles from payment methods list on footer
    const elementsToRemove = [
      '.footer__payment-icons svg title'
    ];

    elementsToRemove.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      // removing aria-labelledby
      elements.forEach((el) => {
        el.parentElement.removeAttribute('aria-labelledby');
        // adding aria-label to all cards icons
        el.parentElement.setAttribute('aria-label', 'card');
        el.remove();
      });
    });

    // changing social icon colors
    const socialIcons = document.querySelectorAll('.social-media .icon');
    socialIcons.forEach(icon => icon.style.color = lowContrastColor);

    // break hotspots
    const hotspots = document.querySelectorAll('.hot-spot__dot');
    hotspots.forEach(hotspot => hotspot.addEventListener('mouseover', (e) => e.target.click()))
    hotspots.forEach(hotspot => hotspot.addEventListener('mouseout', (e) => e.target.click()))

    // removing focus from second slide banner
    const secondBtn = document.querySelectorAll('.slideshow__controls button')[1];
    secondBtn.setAttribute('aria-hidden', true);
    secondBtn.removeAttribute('type');

  } else if (location.pathname == '/collections/all') {
    // change title from products page
    document.title = 'product'
    // lowering contrast from popup cart
    const body = document.body;
    const style = document.createElement('style');
    style.innerHTML = `
      .quick-buy-drawer a {
        color: ${lowContrastColor} !important;
      }
      .quick-buy-drawer__info .banner {
        color: rgba(var(--banner-color) / 0.4) !important;
      }`
    body.appendChild(style);
  } else if (location.pathname == 'pages/contact') {
    // icon class to break
    const iconSelector = [
      '.icon-picto-box',
      '.icon-picto-customer-support',
      '.icon-picto-coupon',
      '.icon-picto-lock'
    ]
    iconSelector.forEach(selector => breakIcon(selector));
  }
}
