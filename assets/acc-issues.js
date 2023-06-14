// List issue
const issueListObj = {
  '/':  [
    'Issue 1',
    'Issue 2',
    'Issue 3'
  ],
  '/collections/all': [],
  '/pages/contact': [],
  '/pages/about-us': [],
  '/pages/advertisement': [],
  '/pages/checkout': [],
  '/pages/shipping': [],
  '/pages/payment': [],
  '/cart': [],
  '/products/headphone-stand-black': [],
  '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas': [],
  '/products/usb-c-to-3-5mm-audio-cable-black': [],
  '/products/mw50-silver-metal-brown-leather': [],
  '/products/mw08-brown-ceramic-stainless-steel-case': [],
  '/products/mh40-wireless-ear-pads': [],
  '/products/mh40-wireless-silver-metal-navy-coated-canvas': [],
  '/products/mw07-plus-charging-case-canvas-pouch-stainless-steel': [],
  '/account/addresses': [],
  '/account/register': []
}

// low color contrast cart and social media links
const lowContrastColor = "rgb(var(--text-color) / .4)"

window.onload = () => {
  // adding issues to popup
  const issues = [];
  if (issueListObj[location.pathname] && issueListObj[location.pathname].length > 0) {
    issues.push('<ul>');
    issueListObj[location.pathname].forEach((item) => {
      issues.push(`<li>${item}</li>`)
    })
    issues.push('</ul>');
  } else {
    issues.push(`<p>No issues assign to this page.</p>`)
  }

  listIssue.innerHTML = `
    <h2>${issues.length == 1 ? 0 : issues.length - 2} issues on ${location.href}</h2>
    ${issues.join('\n')}
  `

  // fixing navbar focus order
  const headerLogo = document.querySelector('.header__logo');
  swapDiv(headerLogo);

  // disabling buy it now btn
  setTimeout(() => {
    const buyNowBtn = document.querySelector('.shopify-payment-button__button');
    if (buyNowBtn) {
      const newBuyNowBtn = document.createElement('a');
      newBuyNowBtn.href = '#'
      newBuyNowBtn.style.display = 'inline-block';
      newBuyNowBtn.style.textAlign = 'center';
      newBuyNowBtn.style.fontWeight = 600;
      newBuyNowBtn.style.borderRadius = '200px'
      newBuyNowBtn.style.padding = '17.2px 40px'
      newBuyNowBtn.style.color = 'white';
      newBuyNowBtn.style.background = 'black';
      newBuyNowBtn.style.width = '100%';
      newBuyNowBtn.style.height = '100%';
      newBuyNowBtn.innerText = 'Buy it now';
      buyNowBtn.parentElement.replaceChild(newBuyNowBtn, buyNowBtn);
    }
  }, 700);

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

  // removing about us
  if (location.pathname !== '/') removeFooterLink("/pages/about-us");

  //removing header and footer from checkout pages
  if (location.pathname == '/pages/checkout' || location.pathname == '/pages/shipping' || location.pathname == '/pages/payment') {
    addStyle(`
      .header__wrapper,
      .footer {
        display: none !important;
      }`
    );
  }
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

  <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header=""><div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;"><video-media host="youtube" loaded="" can-play=""><iframe src="https://www.youtube.com/embed/jNIPrPJKgAc?playsinline=1&amp;autoplay=0&amp;controls=0&amp;mute=1&amp;loop=1&amp;playlist=jNIPrPJKgAc&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" id="widget4" title="MH40: DYNAMIC DIFFERENCES"></iframe>
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
    addStyle(`
    @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
      html {
        transform: rotate(-90deg);
        transform-origin: left top;
        width: 100vh;
        overflow-x: hidden;
        position: absolute;
        top: 100%;
        left: 0;
      }
    }`)

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
    // setTimeout(() => {
    //   checkoutBtn.click();
    // }, 30000);

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
    // const styleEl = document.createElement('style');
    // styleEl.innerHTML = `a[aria-controls="search-drawer"], .footer__block--menu { display: none !important;}`
    // document.body.append(styleEl);

    // adding video with no audio and no transcript
    const videoEl = `<section id="shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce" class="shopify-section shopify-section--video"><style>
    #shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce {--section-outer-spacing-block: 0;--content-over-media-overlay: 0 0 0 / 0.3;margin-block-start: calc(-1 * var(--header-height) * var(--section-is-first));}</style>

  <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header=""><div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;"><video-media host="youtube" loaded="" can-play=""><iframe src="https://www.youtube.com/embed/pK3yIRIF5ng?playsinline=1&amp;controls=1&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
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

    document.body.insertAdjacentHTML("beforeend", `<style>*{letter-spacing: 0 !important; line-height: 1.5 !important; word-spacing: 0 !important;} p { margin-bottom: 0 !important }</style>`)

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
    if (confirm("This page contains flashing light content. Are you sure you want to continue?") == true) {
      addStyle(`
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
      }`
    )
    } else {
      history.back();
    }
  } else if (location.pathname == '/pages/checkout') {
    cartSummaryPrice();

    const addressArray = []
    // update address
    const addresses = document.querySelectorAll('.address div');
    addresses.forEach((address) => {
      const addressItem = {};
      addressItem['street'] = address.querySelector('.address-street').innerText;
      addressItem['name'] = address.querySelector('.address-name').innerText;
      addressItem['country'] = address.querySelector('.address-country').innerText;
      addressItem['zip'] = address.querySelector('.address-zip').innerText;
      addressItem['province'] = address.querySelector('.address-province').innerText;
      const addressString = address.children[0].innerHTML.split('<br>').find(el=>el.match(/\w+ \d+/)).split(' ');
      addressItem['provinceCode'] = addressString[addressString.length - 2];
      addressItem['city'] = address.querySelector('.address-city').innerText;
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

    inputs.forEach((input) => {
      if (input.id == 'Select1') {
        input.innerHTML = `<option value="0">${values.country}</option>`
      } else if (input.id == 'first-name') {
        input.value = values.name.split(' ')[0]
      } else if (input.id == 'last-name') {
        input.value = values.name.split(' ')[1]
      } else if (input.id == 'address') {
        input.value = values.street
      } else if (input.id == 'Select2') {
        input.value = values.provinceCode
      } else if (input.id == 'zip') {
        input.value = values.zip
      } else if (input.id == 'city') {
        input.value = values.city
      }
    })

    // update when changing the saved address
    // will be added later if it's needed
    // savedAddressInput.addEventListener('change', (e) => {
    //   const index = e.target.getAttribute('value');

    //   if (index + 1 <= addressArray.length) {

    //   }
    // })
  } else if (location.pathname == '/pages/shipping') {
    cartSummaryPrice();

    const addressArray = []
    // update address
    const addresses = document.querySelectorAll('.address div');
    addresses.forEach((address) => {
      const addressItem = {};
      addressItem['street'] = address.querySelector('.address-street').innerText;
      addressItem['name'] = address.querySelector('.address-name').innerText;
      addressItem['country'] = address.querySelector('.address-country').innerText;
      addressItem['zip'] = address.querySelector('.address-zip').innerText;
      addressItem['province'] = address.querySelector('.address-province').innerText;
      const addressString = address.children[0].innerHTML.split('<br>').find(el=>el.match(/\w+ \d+/)).split(' ');
      addressItem['provinceCode'] = addressString[addressString.length - 2];
      addressItem['city'] = address.querySelector('.address-city').innerText;
      addressItem['company'] = address.querySelector('.address-company').innerText;
      addressArray.push(addressItem);
    });

    const info = addressArray[0];

    document.querySelector('bdo').innerHTML = document.querySelectorAll('.info span')[1].innerText;

    document.querySelector('address').innerHTML = `${info.street}, ${info.city} ${info.provinceCode} ${info.zip}, ${info.country}`;

    const method = document.querySelector('fieldset');

    const radioInputs = document.querySelectorAll('fieldset input');

    radioInputs.forEach((radio) => {
      if (radio.checked == true) {
        const price = radio.parentElement.parentElement.children[1].innerHTML.trim();
        const methodName = radio.nextElementSibling.children[0].innerHTML.trim();
        localStorage.setItem('shipping-method', `${methodName} - ${price}`);
      }
    })

    method.addEventListener('change', (e)=>{
      const price = e.target.parentElement.parentElement.children[1].innerHTML.trim();
      const methodName = e.target.nextElementSibling.children[0].innerHTML.trim();

      localStorage.setItem('shipping-method', `${methodName} - ${price}`);
    })
  } else if (location.pathname == '/pages/payment') {
    cartSummaryPrice();

    document.querySelector('.information-row:has(p) p').innerHTML = `<p>${localStorage.getItem('shipping-method')}</p>`;
  } else if (location.pathname.includes('/search?q')) {

  }
}
