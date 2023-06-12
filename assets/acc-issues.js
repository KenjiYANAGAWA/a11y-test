console.log('connected');
const lowContrastColor = "rgb(var(--text-color) / .4)"

const breakIcon = (selector) => {
  const icons = document.querySelectorAll(selector);
    icons.forEach((icon) => {
      icon.removeAttribute('focusable');
      icon.removeAttribute('role');
      const label = document.querySelector(`.text-with-icons__item:has(${selector}) .prose .h5`).innerText;
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

function swapDiv(elem) {
  elem.parentNode.insertBefore(elem, elem.parentNode.firstChild);
}

window.onload = () => {
  // fixing navbar focus order
  const headerLogo = document.querySelector('.header__logo');
  swapDiv(headerLogo);

  // removed custom cursor from cart, search and product page
  // changed theme.css -> .popover::part(overlay) and .drawer.show-close-cursor::part(overlay) selectors

  // removing custom cursor from carousels
  const customCursors = document.querySelectorAll('.slideshow__cursor');
  if (customCursors.length > 0) customCursors.forEach(cursor => cursor.remove());

  // removing custom cursor from products gallery
  const customCursorsProduct = document.querySelectorAll('.product-gallery__cursor');
  if (customCursorsProduct.length > 0) customCursorsProduct.forEach(cursor => cursor.remove());

  // removing announce bar if not home
  // if (location.pathname !== '/') document.querySelector('.announcement-bar').remove();

  // breaking focus color to light blue
  document.body.insertAdjacentHTML("beforeend", `<style>*:focus {box-shadow: inset 0 0 1px lightblue !important} :focus-visible {
    outline-color: lightblue !important}</style>`)

  // Checking for specific pages
  if (location.pathname == '/products/mh40-wireless-silver-metal-navy-coated-canvas') {
    // messing focus from pop up when add to cart;
    // buyBtn.addEventListener('click', () => {
    //   console.log('click');
    //   document.querySelector('[initial-focus]').removeAttribute('initial-focus');
    //   console.log(window.activeElement);
    // });

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

    // adding video with no audio and no transcript
    const videoEl = `<section id="shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce" class="shopify-section shopify-section--video"><style>
    #shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce {--section-outer-spacing-block: 0;--content-over-media-overlay: 0 0 0 / 0.3;margin-block-start: calc(-1 * var(--header-height) * var(--section-is-first));}</style>

  <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header=""><div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;"><video-media host="youtube" autoplay="" class="pointer-events-none" loaded="" can-play="" playing=""><iframe src="https://www.youtube.com/embed/jNIPrPJKgAc?playsinline=1&amp;autoplay=1&amp;controls=0&amp;mute=1&amp;loop=1&amp;playlist=jNIPrPJKgAc&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" id="widget4" title="MH40: DYNAMIC DIFFERENCES"></iframe>
        </video-media></div>
  </div>

  </section>`
  document.querySelector('.shopify-section--main-product').insertAdjacentHTML('afterend', videoEl);

  } else if (location.pathname == '/') {
    // modal handlers
    if (!localStorage.getItem('firstAccess')) {
      document.addEventListener('keyup', closePopup);
      document.querySelector('.custom-popup').style.display = 'block';
    } else {
      document.querySelector('.custom-popup').parentElement.remove();
    }

    // change title from home page
    document.title = '50% off';

    // changing social icon colors
    const socialIcons = document.querySelectorAll('.social-media .icon');
    socialIcons.forEach(icon => icon.style.color = lowContrastColor);

    // breaking hotspots
    const hotspots = document.querySelectorAll('.hot-spot__dot');
    hotspots.forEach(hotspot => hotspot.addEventListener('mouseover', (e) => e.target.click()))
    hotspots.forEach(hotspot => hotspot.addEventListener('mouseout', (e) => e.target.click()))

    // removing focus from second slide banner
    // const secondBtn = document.querySelectorAll('.slideshow__controls button')[1];
    // secondBtn.setAttribute('aria-hidden', true);
    // secondBtn.removeAttribute('type');

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

    const addToCartBtns = document.querySelectorAll('.product-card__quick-buy');

    addToCartBtns.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
        setTimeout(() => {
          let old_element = document.querySelector(".quick-buy-drawer");
          let new_element = old_element.cloneNode(true);
          old_element.parentNode.replaceChild(new_element, old_element);
          document.querySelector('a').focus();
        }, 1000);
      })
    })


  } else if (location.pathname == '/pages/contact') {
    // lock orientation to portrait
    document.body.insertAdjacentHTML("beforeend", `<style>@media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
      html {
        transform: rotate(-90deg);
        transform-origin: left top;
        width: 100vh;
        overflow-x: hidden;
        position: absolute;
        top: 100%;
        left: 0;
      }
    }</style>`)

    // icon class to break
    const iconSelector = [
      '.icon-picto-box',
      '.icon-picto-customer-support',
      '.icon-picto-coupon',
      '.icon-picto-lock'
    ]
    setTimeout(() => {
      iconSelector.forEach(selector => breakIcon(selector));
    }, 1000);

    // removing label from message input
    const messageInput = document.querySelector('.contact-form textarea');
    messageInput.placeholder = "Message";
    messageInput.nextElementSibling.remove();
    console.log(messageInput, messageInput.nextElementSibling)

    // removing focus indication from submit button
    const submitBtn = document.querySelector('.contact-form button[type=submit]');
    submitBtn.style = "border: none; outline: none";
    submitBtn.ariaLabel = "Create a ticket to the customer support";

  } else if (location.pathname == '/cart') {
    //trap focus on checkout button
    const checkoutBtn = document.querySelector('.cart-form button[type=submit]');
    checkoutBtn.onfocus = () => {
      document.addEventListener('keydown', (e) => {
        checkoutBtn.focus();
        e.preventDefault();
      })
    }

    // moving to checkout in 30s
    setTimeout(() => {
      checkoutBtn.click();
    }, 30000);

    // doesn't announce collapsable estimate shipping
    const estimateShippingEl = document.querySelector('.cart-order__summary details');
    estimateShippingEl.removeAttribute('aria-expanded');
    const newEstimateEl = document.createElement('div');
    newEstimateEl.innerHTML =  estimateShippingEl.innerHTML;
    const expandBtn = newEstimateEl.querySelector('.accordion__toggle')
    expandBtn.style.padding = '27px';
    expandBtn.style.borderTop = 'solid 1px';
    expandBtn.style.borderBottom = 'solid 1px';
    expandBtn.style.borderColor = 'rgb(var(--text-color) / .12)';
    expandBtn.role = 'button';
    expandBtn.ariaLabel = 'Estimate Shipping';
    expandBtn.tabIndex = '0';
    const collapseContent = newEstimateEl.querySelector('.accordion__content');
    collapseContent.style.display = 'none';
    expandBtn.onclick = () => {
      if (collapseContent.style.display == 'none') {
        collapseContent.style.display = 'block';
        collapseContent.style.padding = '27px 0';
        expandBtn.ariaExpanded = true;
      } else {
        collapseContent.style.display = 'none'
        expandBtn.ariaExpanded = false;
      }
    }
    estimateShippingEl.parentNode.replaceChild(newEstimateEl, estimateShippingEl);

    const zipCodeInput = document.querySelector('.shipping-estimator__form input[type=text]');
    zipCodeInput.removeAttribute('id')
    const estimateBtn = document.querySelector('.shipping-estimator__form button[type=submit]');

    document.addEventListener('keyup', (e) => {
      if (e.key == 'Enter' && document.activeElement == expandBtn) {
        expandBtn.click();
      }
      // after adding zipcode move to estimate button automatically
      if (document.activeElement == zipCodeInput && zipCodeInput.value.length >= 5) {
        zipCodeInput.value = zipCodeInput.value.slice(0,5);
        estimateBtn.focus();
      }
    })
  } else if (location.pathname == '/products/headphone-stand-black' || location.pathname == '/products/usb-c-to-3-5mm-audio-cable-black') {
    document.title = 'product'
  } else if (location.pathname == '/products/mw50-silver-metal-brown-leather') {
    const infoSeparatorEl = document.querySelector('.product-info__separator');
    infoSeparatorEl.insertAdjacentHTML('afterend', '<div style="height: 60px; display: flex;"><a href="/pages/contact" class="spr-button spr-button-primary button button-primary btn btn-primary button--primary button--xl">Get help</a></div>');


    // video with autoplay with audio
    const iframeInner = document.querySelector('.iframe-inner');
    const iframeWrapper = document.querySelector('.iframe-wrapper');

    iframeInner.onclick = () => {
      iframeWrapper.classList.add('active')
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', "https://www.youtube.com/embed/uo_8BX-iihE?controls=0&autoplay=1&rel=0")
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('width', '100%');
      iframeInner.innerHTML = '';
      iframeInner.append(iframe);
    }

    iframeInner.click();

    const iframe = document.querySelector('iframe');
    iframe.onload = () => iframe.click();
  } else if (location.pathname == '/products/mw08-brown-ceramic-stainless-steel-case') {
    // removing search button
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `a[aria-controls="search-drawer"], .footer__block--menu { display: none !important;}`
    document.body.append(styleEl);

    // adding video with no audio and no transcript
    const videoEl = `<section id="shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce" class="shopify-section shopify-section--video"><style>
    #shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce {--section-outer-spacing-block: 0;--content-over-media-overlay: 0 0 0 / 0.3;margin-block-start: calc(-1 * var(--header-height) * var(--section-is-first));}</style>

  <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header=""><div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;"><video-media host="youtube" autoplay="" class="pointer-events-none" loaded="" can-play="" playing=""><iframe src="https://www.youtube.com/embed/pK3yIRIF5ng?playsinline=1&amp;autoplay=1&amp;controls=0&amp;mute=1&amp;loop=1&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
        </video-media></div>
  </div>

  </section>`
  document.querySelector('.shopify-section--main-product').insertAdjacentHTML('afterend', videoEl);
  } else if (location.pathname == '/account/addresses') {
    const oldBtn = document.querySelector('button[aria-controls="customer-address-new"]');
    const newBtn = document.createElement('div');
    newBtn.setAttribute('tabindex', '0');
    newBtn.setAttribute('aria-controls', 'customer-address-new');
    newBtn.setAttribute('class', 'button button--xl');
    newBtn.setAttribute('is', 'custom-button');
    newBtn.innerHTML = oldBtn.innerHTML;
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
  } else if (location.pathname == '/pages/about-us') {
    const textContainers = document.querySelectorAll('.multi-column__item div:has(.prose)');

    document.body.insertAdjacentHTML("beforeend", `<style>*{letter-spacing: 0 !important}</style>`)

    textContainers.forEach((container) => {
      const sectionContainer = container.parentElement.parentElement.parentElement;
      const sectionInnerContainer = container.parentElement.parentElement;
      sectionContainer.style.width = 'fit-content';
      sectionContainer.style.margin = '0 auto';
      sectionInnerContainer.style.width = 'min-content';
      container.parentElement.style.justifyContent = 'center';
      container.style.width = '100%';
      container.style.overflow = 'hidden';
      container.firstElementChild.style.width = '566px';
    })
  } else if (location.pathname == '/products/mh40-wireless-ear-pads') {
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
  } else if (location.pathname == '/account/register') {
    const form = document.querySelector('#create_customer');
    const formInputs = form.querySelectorAll('input.input');
    formInputs.forEach((input)=>{
      input.setAttribute('autocomplete', 'off');
      if (input.type == 'email') input.removeAttribute('type');
    });

    const errorMsg = form.querySelector('.banner--error');
    if (errorMsg) {
      errorMsg.remove();
      const emailInput = form.querySelector('input[name="customer[email]"]');
      const redDot = document.createElement('div');
      redDot.setAttribute('style', 'height: 16px; width:16px; border-radius: 50%; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: rgb(248 58 58);');
      emailInput.style.background = 'rgb(254 231 231)';
      emailInput.parentElement.style.position = 'relative';
      emailInput.parentElement.append(redDot);
    }

  } else if (location.pathname == '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas') {
    document.documentElement.removeAttribute("lang");

    // mess navbar order
    const navbarContainer = document.querySelector('.header__link-list .contents');
    navbarContainer.style.display = 'grid';
    navbarContainer.style.gridTemplateColumns = 'auto auto auto';
    navbarContainer.style.gap = '2em';

    const navbarItems = navbarContainer.children;
    const navbarItemOne = navbarItems[0]
    const navbarItemTwo = navbarItems[1]
    const navbarItemThree = navbarItems[2]
    navbarItemOne.style.order = 1;
    navbarItemTwo.style.order = 2;
    navbarItemThree.style.order = 3;
    navbarContainer.innerHTML = '';
    navbarContainer.append(navbarItemThree);
    navbarContainer.append(navbarItemOne);
    navbarContainer.append(navbarItemTwo);

  } else if (location.pathname == '/pages/advertisement') {
    const styleEl = `
    <style>
      iframe {
        animation-name: blink;
        animation-duration: .1s;
        animation-iteration-count: infinite;
      }

      div:has(iframe) {
        background: white;
        z-index: 1;
      }

      @keyframes blink {
        from {opacity: 1;}
        to {opacity: 0;}
      }
    </style>
    `
    document.body.insertAdjacentHTML('beforeend', styleEl);
  } else if (location.pathname == '/pages/checkout') {
    // TO DO: for checkout issues create fake pages
    const styleEl = `
      <style>
        .header__wrapper, .footer { display: none !important }
        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          min-height: 100vh;
        }
        .home-btn {
          font-size: 1.5em;
          font-weight: 500;
        }
        .steps {
          font-size: 0.75em;
        }
        .main-content {
          border-right: solid 1px rgba(0, 0, 0, 0.2);
          padding: 3em 4em 1em 4em;
        }
        .total {
          background-color: #ebebeb;
        }
        .arrow-checkout {
          width: 0.75em;
          height: 0.75em;
          font-size: 0.75em;
        }
        .steps .steps-cart,
        .to-cart-btn a,
        .to-cart-btn svg {
          fill: rgb(240, 196, 23);
          color: rgb(240, 196, 23);
        }
        .steps .steps-ship,
        .steps .steps-pay,
        .express-checkout,
        .express-checkout-title {
          color: #707070;
        }

        .express-checkout {
          text-align: center;
          font-size: 1.4rem;
        }

        .gpay-btn {
          width: 100%;
          height: 100%;
          background: black;
          box-shadow: none;
          padding: 0;
        }

        #shop-pay-btn {
          height: 42px;
          box-shadow: none;
          background-color: #592ff4;
          border: 1px solid transparent;
          color: white;
        }

        #shop-pay-btn svg {
          height: 20px;
        }

        #express-checkout-container div:has(.gpay-btn),
        #express-checkout-container div:has(#shop-pay-btn) {
          margin: 0 auto;
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
        }

        #express-checkout-container {
          display: flex;
          width: 100%;
          gap: 0.9rem;
          padding-top: 17px;
        }

        .express-checkout-title {
          margin: 0 auto;
          width: fit-content;
        }

        .separator-checkout {
          height: 53px;
          position: relative;
          color: #707070;
          mix-blend-mode: multiply;
        }

        .separator-checkout hr {
          position: absolute;
          margin: 0;
          top: 50%;
          width: 100%;
        }

        .separator-checkout span {
          padding: 0 1.4rem;
          background-color: white;
          z-index: 1;
        }

        .contact-checkout {
          margin-bottom: 27px;
        }

        .contact-checkout div:has(input) {
          display: flex;
          gap: .9em;
        }

        h2 {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .contact-checkout span,
        .contact-checkout a,
        h2 {
          margin: 0 0 .5em 0;
        }

        .contact-checkout span,
        .contact-checkout a {
          display: block;
        }

        .contact-checkout a {
          text-decoration: underline;
          color: rgb(240, 196, 23);
          font-size: .9rem;
        }

        .shipping-checkout {
          display: grid;
          gap: .9rem;
        }

        .checkout-input-container {
          position: relative;
        }

        .checkout-input-label {
          position: absolute;
          top: 7px;
          left: 10px;
          font-size: 0.8em;
          color: #707070;
          z-index: 1;
        }

        .checkout-input-select,
        .checkout-input-text {
          padding: 27px 10px 7px;
          width: 100%;
          border: solid 1px #dedede;
          background: transparent;
          border-radius: 5px;
          margin: 0;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          outline-color: transparent;
          transition: .3s;
        }

        .checkout-input-text-compliment {
          padding: 17px 14px;
          width: 100%;
          border: solid 1px #dedede;
          background: transparent;
          border-radius: 5px;
          margin: 0;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          outline-color: transparent;
          transition: .3s;
        }

        .checkout-input-select-container,
        .checkout-input-text-container {
          position: relative;
        }

        .checkout-input-select-container svg,
        .checkout-input-text-container svg {
          position: absolute;
          height: 1em;
          top: 50%;
          transform: translateY(-50%);
          right: 0.8em;
          z-index: 0;
          fill: #707070;
        }

        .checkout-input-text:focus,
        .checkout-input-text-compliment:focus,
        .checkout-input-select:focus {
          outline-color: rgb(240, 196, 23);
          transition: .3s;
        }

        .checkout-input-inline-2 {
          display: grid;
          gap: 0.9rem;
          grid-template-columns: 1fr 1fr;
        }

        .checkout-input-inline-3 {
          display: grid;
          gap: 0.9rem;
          grid-template-columns: 1fr 1fr 1fr;
        }

        .checkout-info {
          display: flex;
          align-items: center;
          gap: .7em;
        }

        .checkout-info span {
          padding-bottom: .1em;
        }

        .checkout-bottom-btns-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 26px;
          height: 63px;
        }

        .to-cart-btn, .to-shipping-btn {
          width: fit-content;
        }

        .to-shipping-btn {
          padding: 0 20px;
          height: 100%;
          color: white;
          background-color: black;
          border-radius: 5px;
        }

        .to-cart-btn svg {
          font-size: .7em;
          margin-right: 0.7em;
        }

        .total {
          padding: 67px 76.8px 21px 44px;
        }

        .price-summary-table-row {
          display: flex;
          justify-content: space-between;
          font-size: .9em;
          font-weight: 600;
          margin-top: 10px;
        }

        .price-summary-table-row .price-summary-header {
          font-weight: 400;
        }

        .price-summary-table-row:has(.header-total) {
          font-size: 1em;
          font-weight: 600;
        }

        .price-summary-table-row abbr {
          font-size: .7em;
          font-weight: 400;
        }

        .items-summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1em;
        }

        .items-summary-row:has(div[role=columnheader]),
        .item-quantity, .total h3 {
          height: 0;
          width: 0;
          opacity: 0;
          pointer-events: none;
        }

        .item-description {
          font-weight: 500;
          font-size: .9em;
          padding-left: .9em;
          flex-grow: 1;
        }

        .item-summary-image-wrapper {
          position: relative;
          background: white;
          border: solid 1px #dedede;
          border-radius: 10px;
          height: 64px;
          width: 64px;
        }

        .item-summary-counter {
          position: absolute;
          top: -10px;
          right: -7px;
          border-radius: 40px;
          background: #707070;
          height: 20px;
          width: 20px;
        }

        .item-summary-counter p {
          margin: 0;
          color: white;
          font-size: 0.8em;
        }

      </style>
    `
    document.body.insertAdjacentHTML('beforeend', styleEl);

    console.log('checkout page');
    //items to add to cart
    const cartItemsContainer = document.querySelectorAll('.cart-items .cart-item');
    // location to be added
    const checkoutItemSummary = document.querySelector('.total div[role=table]');

    //remove sample product item cart if any real item
    if (cartItemsContainer.length >= 1) {
      checkoutItemSummary.children[1].remove();
    }

    //adding all items
    cartItemsContainer.forEach((item) => {
      const itemImg = item.querySelector('.cart-item-img img');
      const itemTitle = item.querySelector('.cart-item-title');
      const itemQuantity = item.querySelector('.cart-item-quantity');
      const itemFinalPrice = item.querySelector('.cart-item-final-price');

      const itemHTML = `
        <div role="row" class="items-summary-row">
          <div role="cell">
            <div class="item-summary-image-wrapper">
              <div>
                <picture>
                  <source media="(min-width: 0px)" srcset="${itemImg.getAttribute('srcset')}">
                  <img src="${itemImg.getAttribute('src')}">
                </picture>
              </div>
              <div aria-hidden="true" class="item-summary-counter flex-center">
                <div>
                  <p>${itemQuantity.innerText}</p>
                </div>
              </div>
            </div>
          </div>
          <div role="cell" class="item-description">
            <p>${itemTitle.innerText}</p>
            <div></div>
          </div>
          <div role="cell" class="item-quantity">
            <div>
              <span>
              ${itemQuantity.innerText}<div aria-hidden="true"> x</div>
              </span>
            </div>
          </div>
          <div role="cell" class="item-price flex-center">
            <div>
              <div>
                <span translate="yes" class="notranslate">${itemFinalPrice.innerText}</span>
              </div>
            </div>
          </div>
        </div>
      `

      checkoutItemSummary.insertAdjacentHTML('beforeend', itemHTML);
    })

    const finalTotal = document.querySelector('.cart-total-price').innerText;

    // update total price
    document.querySelector('.header-total').nextElementSibling.innerHTML = finalTotal;
    document.querySelector('.price-summary-table-row .notranslate').innerText = finalTotal;

    const addressArray = []
    // update address
    const addresses = document.querySelectorAll('.address p');
    addresses.forEach((address) => {
      const addressItem = {};
      addressItem['street'] = address.querySelector('.address-street').innerText;
      addressItem['name'] = address.querySelector('.address-name').innerText;
      addressItem['country'] = address.querySelector('.address-country').innerText;
      addressItem['zip'] = address.querySelector('.address-zip').innerText;
      addressItem['province'] = address.querySelector('.address-province').innerText;
      addressItem['company'] = address.querySelector('.address-company').innerText;
      addressArray.push(addressItem);
    });

    // update saved adresses input;
    const savedAddressInput = document.querySelector('.shipping-checkout select');
    let index = 0;
    savedAddressInput.innerHTML = addressArray.map((address) => {
      const addressLine =  `<option value="${index}">${address.street} ${address.province} ${address.zip} ${address.country} (${address.name} ${address.company})</option>`;
      index ++;
      return addressLine;
    }).join('\n');

    savedAddressInput.insertAdjacentHTML('beforeend', `<option value="${index}">Use a new address</option>`);

    // update user contact
    const info = document.querySelectorAll('.info span');
    document.querySelector('.checkout-current-user').innerText = `${info[0].innerText} (${info[1].innerText})`;

    const inputs = document.querySelectorAll('.checkout-input-select, .checkout-input-text');

    const values = addressArray[0];
    console.log(values);

    inputs.forEach((input) => {
      console.log(input)

      if (input.id == 'Select1') {
        input.innerHTML = `<option value="0">${values.country}</option>`
      } else if (input.id == 'first-name') {
        input.value == values.name.split(' ')[0]
      } else if (input.id == 'last-name') {
        input.value == values.name.split(' ')[1]
      } else if (input.id == 'address') {
        input.value == values.street
      } else if (input.id == 'Select2') {
        input.value = values.province
      } else if (label == 'zip') {
        input.value == values.zip
      }
    })

    // update country input
    // update first name input
    // update last name input
    // update street input


    // update when changing the saved address
    // will added later if it's needed
    // savedAddressInput.addEventListener('change', (e) => {
    //   const index = e.target.getAttribute('value');

    //   if (index + 1 <= addressArray.length) {

    //   }
    // })
  }
}
