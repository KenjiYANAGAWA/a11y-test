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
  // removing announce bar if not home
  if (location.pathname !== '/') {
    document.querySelector('.announcement-bar').remove();
  } else {
    // displaying alert
    const bg = document.createElement('div');
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-popup {margin: 0 auto; background: white; max-width: 600px; padding: 16px 24px; position: relative}
      .custom-popup p {margin: revert;}
      .custom-popup h2 {text-align: center; font-size: 32px; font-weight: 900;}
      .custom-popup ul {padding: revert; list-style: initial;}
      .custom-popup .link-list a {background: black; color:white; flex-grow: 1; text-align: center; padding: 8px 16px;}
      .custom-popup .link-list {display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px}
      .custom-popup .close-btn {position: absolute; top: 8px; right: 8px; cursor: pointer;}
      `
    bg.style = 'position: fixed; top:0; display:flex; align-items: center; height: 100vh; width: 100vw; z-index: 999; background: rgba(0,0,0,.6)'
    const popup = document.createElement('div');
    popup.classList.add('custom-popup');
    // popup.setAttribute('role', 'dialog');
    // popup.setAttribute('aria-modal', true);
    popup.innerHTML =
      `<h2>WARNING</h2>
      <div role="button" tabindex="0" aria-label="Close warning" class="close-btn" onclick="this.parentElement.parentElement.remove()">❌</div>
      <ul>
        <li>Do not buy anything on this site.</li>
        <li>Go to <a href="https://www.masterdynamic.com/" target="_blank">masterdynamic.com</a> to buy the products listed on this site.</li>
        <li>This site is very inaccessible.</li>
      </ul>
      <p>This is an E-Commerce site to demonstrate various WCAG accessibility violations. This site tests whether the automated accessibility testing tool can catch those issues.</p>

      <p>In order to make this site more realistic and simulate more relevant and meaningful issues, we populated this site with real products from Master & Dynamic. If you like their products, please go get the real products at masterdynamic.com</p>

      <p>This site is made by adding various accessibility violations to the existing very cool Shopify theme, <a href="https://themes.shopify.com/themes/impact/styles/sound/preview" target="_blank">Impact</a>. We used Master & Dynamic products as the theme originally had those products.</p>
      <div class="link-list">
        <a href="#" onclick="this.parentElement.parentElement.parentElement.remove()">Proceed to the page</a>
        <a href="#" onclick="window.close();">Close the page</a>
        <a href="https://www.masterdynamic.com/" target="_blank">Go to Master & Dynamic</a>
      </div>`
    bg.append(popup);
    bg.append(style);
    document.body.append(bg);
    document.querySelector('.custom-popup').click();
  }

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
