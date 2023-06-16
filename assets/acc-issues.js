// low color contrast cart and social media links
const lowContrastColor = "rgb(var(--text-color) / .4)"

window.onload = () => {
  // adding issues to popup
  // issue details are coming from acc-list-issue-details.js
  const issues = [];
  if (issueListObj[location.pathname] && issueListObj[location.pathname].length > 0) {
    issues.push('<ul>');
    issueListObj[location.pathname].forEach((item) => {
      const techniqueLink = generateTechniqueLink(item);
      console.log(techniqueLink);
      issues.push(`<li style="list-style:circle"><strong>${item[0]}</strong><br aria-hidden /><a style="text-decoration: underline; color:#1155cc;" href="${techniqueLink}" target="_blank" rel="noopener noreferrer">${item[1]}</a><p>${item[2]}</p></li>`)
      //issues.push(`<li>${item}</li>`)
    })
    issues.push('</ul>');
  } else {
    issues.push(`<p>No issues assign to this page.</p>`)
  }

  listIssue.innerHTML = `
    <h2 tabindex='0'>${issues.length == 1 ? 0 : issues.length - 2} issue(s) on this page. CTRL + i to close.</h2>
    ${issues.join('\n')}
  `//decided not to show url ${location.href}

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

  if (location.pathname !== '/') {
    // removing about us from footer
    removeFooterLink("/pages/about-us");
    //fixing skip to main content
    let main = location.pathname.includes('/collections/') ? document.querySelector('.collection__top-bar') : document.querySelector('#main');
    const focusableEl = main.querySelector('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
    const skipBtn = document.querySelector('.skip-to-content')
    skipBtn.onclick = () => {
      if (location.pathname.includes('login')) {
        document.querySelector('.fieldset .form-control input').focus();
      } else {
        focusableEl.focus();
      }
    }
  } else {
    const skipBtn = document.querySelector('.skip-to-content')
    skipBtn.setAttribute('href', '#')
  }

  //removing header and footer from checkout pages
  if (location.pathname == '/pages/checkout' || location.pathname == '/pages/shipping' || location.pathname == '/pages/payment') {
    addStyle(`
      .header__wrapper,
      .footer {
        display: none !important;
      }`
    );
  }

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
    hotspots.forEach(hotspot => {
      hotspot.addEventListener('focus', (e) => {
        e.target.nextElementSibling.style.display = 'block';
        e.target.nextElementSibling.style.opacity = 1;
        e.target.nextElementSibling.style.visibility = 'visible';
        const hPosition = e.target.nextElementSibling.getAttribute('anchor-horizontal')
        if (hPosition == 'end') {
          e.target.nextElementSibling.style.right = 'var(--popover-anchor-inline-spacing)';
          e.target.nextElementSibling.style.top = 'calc(50% - 130px)';
        } else {
          e.target.nextElementSibling.style.left = 'var(--popover-anchor-inline-spacing)';
          e.target.nextElementSibling.style.top = 'calc(50% - 79px)'
        }
        e.target.setAttribute('aria-expanded', true);
      })
    })
    hotspots.forEach(hotspot => {
      hotspot.addEventListener('blur', (e) => {
        e.target.nextElementSibling.style.display = 'none';
        e.target.nextElementSibling.style.opacity = 0;
        e.target.nextElementSibling.style.visibility = 'hidden';
        e.target.setAttribute('aria-expanded', false);
      })
    })

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
      }

      button[type=submit]:focus {
        box-shadow: inset 0 0 1px lightblue !important
      }
      button[type=submit]:focus-visible {
      outline-color: lightblue !important
      }
    `)

    // change headings
    const contacUs = document.querySelector('.section-stack__intro p');
    const question = document.querySelector('.section-stack__intro h2');
    const newQuestionEl = document.createElement('p');
    newQuestionEl.innerHTML = question.innerHTML;
    contacUs.style.fontSize = '2.5rem';

    question.parentElement.replaceChild(newQuestionEl, question)

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
    // submitBtn.style = "border: none; outline: none";
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
        // expandBtn.ariaExpanded = true;
      } else {
        collapseContent.style.display = 'none'
        // expandBtn.ariaExpanded = false;
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
  <!--
  <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header=""><div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;"><video-media host="youtube" loaded="" can-play=""><iframe src="https://www.youtube.com/embed/pK3yIRIF5ng?playsinline=1&amp;controls=1&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
        </video-media></div>
  </div>
  -->

  <div class="section section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header="">
  <div class="content-over-media aspect-video full-bleed text-custom" style="--text-color: 255 255 255;">
    <video-media host="youtube" loaded="" can-play="">
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pK3yIRIF5ng?controls=0&amp;start=5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </video-media>
  </div>
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

    // strikethrough text not read
    document.querySelector('.product-info__description .prose s').setAttribute('aria-hidden', true)

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
    if (info[1].innerText.length != 0) {
      document.querySelector('.checkout-current-user').innerText = `${info[0].innerText} (${info[1].innerText})`;
    } else {
      const oldEl = document.querySelector('.checkout-current-user')
      const newEl = `<div class="checkout-input-container">
      <label for="email" class="checkout-input-label">
        <span>Email or mobile phone number</span>
      </label>
      <div class="checkout-input-text-container">
        <input type="text" name="email" id="email" class="checkout-input-text" required>
      </div>
    </div>`
      oldEl.insertAdjacentHTML("beforebegin", newEl);
      oldEl.nextElementSibling.remove();
      oldEl.remove();
    }

    if (info[1].innerText.length != 0) {
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
    }

    // update when changing the saved address
    // will be added later if it's needed
    // savedAddressInput.addEventListener('change', (e) => {
    //   const index = e.target.getAttribute('value');

    //   if (index + 1 <= addressArray.length) {

    //   }
    // })

    const lastNameInput = document.querySelector('#last-name');
    lastNameInput.removeAttribute('required')
    const form = document.querySelector('form[action="/pages/shipping"]');
    const lastNameLabel = document.querySelector('label[for="last-name"]');
    lastNameLabel.removeAttribute('for')
    form.onsubmit = (e) => {
      e.preventDefault();
      if (lastNameInput.value.length == 0) {
        lastNameInput.style.outline = 'solid 1px #8c720b';
      } else  {
        e.submit();
      }
    }

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

    const url = new URL(location.href)
    const email = url.searchParams.get("email");
    const firsName = url.searchParams.get("first-name");
    const lastName = url.searchParams.get("last-name");
    const city = url.searchParams.get("city");
    const zip = url.searchParams.get("zip");
    const address = url.searchParams.get("address");
    const state = url.searchParams.get("state");
    // const country = url.searchParams.get("country");
    const country = 'United States';

    document.querySelector('bdo').innerHTML = email ? email : document.querySelectorAll('.info span')[1].innerText;

    document.querySelector('.grid form').insertAdjacentHTML("beforeend", `
      <div style="display: none">
        <input type="text" name="email" value="${email}">
        <input type="text" name="city" value="${city}">
        <input type="text" name="zip" value="${zip}">
        <input type="text" name="address" value="${address}">
        <input type="text" name="state" value="${state}">
        <input type="text" name="country" value="${country}">
      </div>
    `)
    document.querySelector('address').innerHTML = (address && city && state && zip && country) ? `${address}, ${city} ${state} ${zip}, ${country}` : `${info.street}, ${info.city} ${info.provinceCode} ${info.zip}, ${info.country}`;

    const shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    const total = shipCost.parentElement.nextElementSibling.children[1];
    document.querySelectorAll('.fieldset-item input[type=radio]').forEach((input) => {
      input.addEventListener('change', (e) => {
        if (e.target.checked && e.target.value == 'economy') {
          shipCost.innerHTML = `<span translate="yes" class="notranslate">Free</span>`
          total.innerHTML = document.querySelector('.cart-total-price').innerText;
        } else {
          shipCost.innerHTML = `<span translate="yes" class="notranslate">$6.90</span>`
          total.innerHTML  = `\$${(Number(total.innerHTML.slice(1,-4)) + 6.90)} USD`
        }
      })
    })

  } else if (location.pathname == '/pages/payment') {
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
    const url = new URL(location.href)
    const shippingMethod = url.searchParams.get("shipping_methods");
    const email = url.searchParams.get("email");
    const city = url.searchParams.get("city");
    const zip = url.searchParams.get("zip");
    const address = url.searchParams.get("address");
    const state = url.searchParams.get("state");
    // const country = url.searchParams.get("country");
    const country = 'United States';

    const shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    const total = shipCost.parentElement.nextElementSibling.children[1];
    if (shippingMethod == 'economy') {
      shipCost.innerHTML = `<span translate="yes" class="notranslate">Free</span>`
      total.innerHTML = document.querySelector('.cart-total-price').innerText;
    } else {
      shipCost.innerHTML = `<span translate="yes" class="notranslate">$6.90</span>`
      total.innerHTML  = `\$${(Number(total.innerHTML.slice(1,-4)) + 6.90)} USD`
    }

    document.querySelector('bdo').innerHTML = email ? email : document.querySelectorAll('.info span')[1].innerText;
    document.querySelector('.information-row:has(p) p').innerHTML = shippingMethod == 'standard' ? `Standard - <strong>$6.90</strong>` : `Economy - <strong>Free</strong>`;
    document.querySelector('address').innerHTML = (address && city && state && zip && country) ? `${address}, ${city} ${state} ${zip}, ${country}` : `${info.street}, ${info.city} ${info.provinceCode} ${info.zip}, ${info.country}`;

    const paymentMethod = document.querySelectorAll('input[type=radio]');

    paymentMethod.forEach((method) => {
      method.addEventListener('change', (e) => {
        if (e.target.checked && e.target.id == 'credit_card_payment') {
          e.target.parentElement.parentElement.insertAdjacentHTML('afterend',
            `<div class="credit-card-info">
              <div class="checkout-input-container">
                <label for="card-number" class="checkout-input-label">
                  <span>Card number</span>
                </label>
                <div class="checkout-input-text-container">
                  <input type="text" name="card-number" id="card-number" class="checkout-input-text" required>
                </div>
              </div>
              <div class="checkout-input-container">
                <label for="card-name" class="checkout-input-label">
                  <span>Name on card</span>
                </label>
                <div class="checkout-input-text-container">
                  <input type="text" name="card-name" id="card-name" class="checkout-input-text" required>
                </div>
              </div>
              <div class="checkout-input-inline-2">
                <div class="checkout-input-container">
                  <label for="expiration-date" class="checkout-input-label">
                    <span>Expiration date (MM/YY)</span>
                  </label>
                  <div class="checkout-input-text-container">
                    <input type="text" inputmode="numeric" pattern="[0-1]{1}[0-9]{1}/20[0-9]{2}" required name="expiration-date" id="expiration-date" class="checkout-input-text">
                  </div>
                </div>
                <div class="checkout-input-container">
                  <label for="security-code" class="checkout-input-label">
                    <span>Security code</span>
                  </label>
                  <div class="checkout-input-text-container">
                    <input type="text" pattern="[0-9]{3}" name="security-code" id="security-code" class="checkout-input-text" required>
                  </div>
                </div>
              </div>
            </div>`
          );
        } else {
          document.querySelector('.credit-card-info').remove();
        }
      })
    })
  } else if (location.pathname.includes('/search?q')) {

  } else if (location.pathname == 'products/mw65-silver-metal-brown-leather') {
    setTimeout(() => {
      window.location.href = 'https://a11y-test.com/';
    }, 30000);
  }
}
