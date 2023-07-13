// low color contrast cart and social media links
var lowContrastColor = "rgb(var(--text-color) / .4)"

window.onload = () => {
  //Small fixes and changes to initial clean setup
  accSetUp();

  // removing about us from footer
  if (location.pathname !== '/') removeFooterLink("/pages/about-us");

  // removing reviews from all products pages excluding mh40 wireless headphone
  if (location.pathname !== '/products/mh40-wireless-silver-metal-navy-coated-canvas' && location.pathname.includes('/products/')) document.querySelector("#shopify-product-reviews").remove();

  // Checking for specific pages
  if (location.pathname == '/products/mh40-wireless-silver-metal-navy-coated-canvas') {
    // Changing average rating display
    var averageRating = document.querySelector('.rating');
    var averageNumber = averageRating.firstElementChild.innerText.split('.')[0];
    averageRating.innerHTML = '';
    averageRating.innerHTML = convertNumberToStars(averageNumber);

    // breaking quantity btns
    var plusAndMinusBtns = document.querySelectorAll('.quantity-selector__button');
    plusAndMinusBtns.forEach((btn)=>{
      btn.onkeydown = (e) => {
        if (e.key == 'Enter') {
          btn.click()
        }
      };
    })

    // removing aria-label from reviews stars
    setTimeout(() => {
      var reviewStars = document.querySelectorAll("#shopify-product-reviews .spr-starratings");
      reviewStars.forEach(starsContainer => starsContainer.removeAttribute('aria-label'));
    }, 1000);

    // making each item in description focusable
    var itemDescriptionLines = document.querySelectorAll('.product-info__description .prose div:not(:empty)');
    itemDescriptionLines.forEach(line => line.setAttribute('tabindex', 0));

    // adding video with no audio and no transcript
    var videoEl = `
      <section id="shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce" class="shopify-section shopify-section--video">
        <style>#shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce {--section-outer-spacing-block: 0;--content-over-media-overlay: 0 0 0 / 0.3;margin-block-start: calc(-1 * var(--header-height) * var(--section-is-first));}</style>
        <div class="section   section-blends section-full text-custom" style="--text-color: 255 255 255;" allow-transparent-header="">
          <div class="content-over-media aspect-video full-bleed  text-custom" style="--text-color: 255 255 255;">
            <video-media host="youtube" loaded="" can-play="">
              <iframe src="https://www.youtube.com/embed/jNIPrPJKgAc?playsinline=1&amp;autoplay=0&amp;controls=0&amp;mute=1&amp;loop=1&amp;playlist=jNIPrPJKgAc&amp;enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;origin=https%3A%2F%2Fa11y-test.com" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" id="widget4" title="MH40: DYNAMIC DIFFERENCES"></iframe>
            </video-media>
          </div>
        </div>
      </section>`

    document.querySelector('.shopify-section--main-product').insertAdjacentHTML('afterend', videoEl);

    // breaking order review
    setTimeout(() => {
      var reviewForm = document.querySelector('.new-review-form');
      var submitBtn = reviewForm.lastElementChild;
      reviewForm.querySelector('h3').insertAdjacentElement('afterend', submitBtn);
    }, 2000);

    addStyle(`
      .new-review-form {
        display: grid;
      }
      .new-review-form fieldset:has(input[type=submit]) {
        order: 10;
      }

      div[tabindex="0"]:focus {
        box-shadow: 0 0 0 2px white, 0 0 0 4px black !important;
      }
    `)

  } else if (location.pathname == '/') {
    // change title from home page
    document.title = '50% off';

    // changing social icon colors
    var socialIcons = document.querySelectorAll('.social-media .icon');
    socialIcons.forEach(icon => icon.style.color = lowContrastColor);

    // breaking hotspots
    var hotspots = document.querySelectorAll('.hot-spot__dot');

    hotspots.forEach(hotspot => hotspot.addEventListener('mouseover', (e) => e.target.focus()))
    hotspots.forEach(hotspot => hotspot.addEventListener('mouseout', (e) => e.target.blur()))
    hotspots.forEach(hotspot => {
      hotspot.addEventListener('focus', (e) => {
        e.target.nextElementSibling.style.display = 'block';
        e.target.nextElementSibling.style.opacity = 1;
        e.target.nextElementSibling.style.visibility = 'visible';
        var hPosition = e.target.nextElementSibling.getAttribute('anchor-horizontal')
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

    // disabling keys from closing popup
    document.addEventListener('keydown', (e)=>{
      let currentFocusEl = document.activeElement;
      if (Array.from(hotspots).includes(currentFocusEl) && e.key !== 'Tab') {
        e.preventDefault();
        currentFocusEl.nextElementSibling.style.display = 'block';
        currentFocusEl.nextElementSibling.style.opacity = 1;
        currentFocusEl.nextElementSibling.style.visibility = 'visible';
        currentFocusEl.focus();
      }
    })

    // lowering contrast from popup cart
    var body = document.body;
    var style = document.createElement('style');
    style.innerHTML = `
      .banner--success {
        color: rgba(var(--success-text) / 0.4) !important;
      }`
    body.appendChild(style);

    // changing newsletter btn
    var newsletterForm = document.querySelector('#footer-newsletter');
    var newsletterSubmitBtn = newsletterForm.querySelector('button[type=submit]');

    var newNewsletterSubmitBtn = document.createElement('div');
    newNewsletterSubmitBtn.innerHTML = newsletterSubmitBtn.innerHTML;
    newNewsletterSubmitBtn.classList = newsletterSubmitBtn.classList
    newNewsletterSubmitBtn.style.cursor = "pointer";

    newsletterSubmitBtn.parentElement.replaceChild(newNewsletterSubmitBtn, newsletterSubmitBtn);
    newNewsletterSubmitBtn.onclick = () => newsletterForm.submit();

  } else if (location.pathname == '/collections/all') {
    // change title from products page
    document.title = 'product'

    // lowering contrast from popup cart
    // var body = document.body;
    // var style = document.createElement('style');
    // style.innerHTML = `
    //   .quick-buy-drawer__info .banner {
    //     color: rgba(var(--banner-color) / 0.4) !important;
    //   }`
    // body.appendChild(style);

    //breaking focusTrap
    var addToCartBtns = document.querySelectorAll('.product-card__quick-buy');

    addToCartBtns.forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        setTimeout(() => {
          var cartDrawer = document.querySelector('.quick-buy-drawer');
          var newCartDrawer = cartDrawer.cloneNode(true);

          cartDrawer.parentElement.replaceChild(newCartDrawer, cartDrawer)
        }, 1500);
        btn.focus();
      })
    })

    setInterval(() => {
      var cartDrawer = document.querySelector('.quick-buy-drawer');
      if (cartDrawer.getAttribute('inert') == '') document.documentElement.classList.remove('lock');
    }, 100);

    document.addEventListener('keyup', (e) => {
      var cartDrawer = document.querySelector('.quick-buy-drawer');
      if (e.key == 'Escape') {
        cartDrawer.setAttribute('inert', '');
        cartDrawer.removeAttribute('open');
      }
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
       /* box-shadow: inset 0 0 1px lightblue !important */
       box-shadow: none !important;
       border: none !important;
       outline: none !important;
      }
      button[type=submit]:focus-visible {
        /* outline-color: lightblue !important */
        box-shadow: none !important;
        outline: none !important;
        border: none !important;
      }
    `)

    // change headings
    var contacUs = document.querySelector('.section-stack__intro p');
    var question = document.querySelector('.section-stack__intro h2');
    var newQuestionEl = document.createElement('p');
    newQuestionEl.innerHTML = question.innerHTML;
    contacUs.style.fontSize = '2.5rem';

    question.parentElement.replaceChild(newQuestionEl, question)

    // icon class to break
    var iconSelector = [
      '.icon-picto-box',
      '.icon-picto-customer-support',
      '.icon-picto-coupon',
      '.icon-picto-lock'
    ]
    setTimeout(() => {
      iconSelector.forEach(selector => breakIcon(selector));
    }, 1000);

    // removing label from message input
    var messageInput = document.querySelector('.contact-form textarea');
    messageInput.placeholder = "Message";
    messageInput.nextElementSibling.remove();
    console.log(messageInput, messageInput.nextElementSibling)

    // removing focus indication from submit button
    var submitBtn = document.querySelector('.contact-form button[type=submit]');
    // submitBtn.style = "border: none; outline: none";
    submitBtn.ariaLabel = "Create a ticket to the customer support";

  } else if (location.pathname == '/cart') {
    //trap focus on checkout button
    setTimeout(() => {
      var checkoutBtn = document.querySelector('.cart-form a[href="/pages/checkout"]');
      checkoutBtn.onblur = (e) => {
        e.target.focus();
      }
    }, 300);

    // doesn't announce collapsable estimate shipping
    var estimateShippingEl = document.querySelector('.cart-order__summary details');
    estimateShippingEl.removeAttribute('aria-expanded');
    var newEstimateEl = document.createElement('div');
    newEstimateEl.innerHTML =  estimateShippingEl.innerHTML;
    var expandBtn = newEstimateEl.querySelector('.accordion__toggle')
    expandBtn.style.padding = '27px';
    expandBtn.style.borderTop = 'solid 1px';
    expandBtn.style.borderBottom = 'solid 1px';
    expandBtn.style.borderColor = 'rgb(var(--text-color) / .12)';
    expandBtn.role = 'button';
    expandBtn.ariaLabel = 'Estimate Shipping';
    expandBtn.tabIndex = '0';
    var collapseContent = newEstimateEl.querySelector('.accordion__content');
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

    var zipCodeInput = document.querySelector('.shipping-estimator__form input[type=text]');
    zipCodeInput.removeAttribute('id')
    var estimateBtn = document.querySelector('.shipping-estimator__form button[type=submit]');

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
  } else if (location.pathname == '/products/headphone-stand-black') {
    document.title = 'product'
  } else if (location.pathname == '/products/mw50-silver-metal-brown-leather') {
    var infoSeparatorEl = document.querySelector('.product-info__separator');
    infoSeparatorEl.insertAdjacentHTML('afterend', '<div style="height: 60px; display: flex;"><a href="/pages/contact" class="spr-button spr-button-primary button button-primary btn btn-primary button--primary button--xl">Get help</a></div>');

    // video with autoplay with audio
    var iframeInner = document.querySelector('.iframe-inner');
    var iframeWrapper = document.querySelector('.iframe-wrapper');

    iframeInner.onclick = () => {
      iframeWrapper.classList.add('active')
      var iframe = document.createElement('iframe');
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

    var iframe = document.querySelector('iframe');
    iframe.onload = () => iframe.click();
  } else if (location.pathname == '/products/mw08-brown-ceramic-stainless-steel-case') {
    // removing search button
    // var styleEl = document.createElement('style');
    // styleEl.innerHTML = `a[aria-controls="search-drawer"], .footer__block--menu { display: none !important;}`
    // document.body.append(styleEl);

    // adding video with no audio and no transcript
    var videoEl = `
      <section id="shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce" class="shopify-section shopify-section--video">
        <style>#shopify-section-template--18980281647388__30e9587e-b6da-453e-a6ad-cd9a9a7c92ce {--section-outer-spacing-block: 0;--content-over-media-overlay: 0 0 0 / 0.3;margin-block-start: calc(-1 * var(--header-height) * var(--section-is-first));}</style>
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
    var oldBtn = document.querySelector('button[aria-controls="customer-address-new"]');
    var newBtn = document.createElement('div');
    newBtn.setAttribute('tabindex', '0');
    newBtn.setAttribute('aria-controls', 'customer-address-new');
    newBtn.setAttribute('class', 'button button--xl');
    newBtn.setAttribute('is', 'custom-button');
    newBtn.innerHTML = oldBtn.innerHTML;
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
  } else if (location.pathname == '/pages/about-us') {
    var textContainers = document.querySelectorAll('.multi-column__item div:has(.prose)');

    document.body.insertAdjacentHTML("beforeend", `<style>*{letter-spacing: 0 !important; line-height: 1.5 !important; word-spacing: 0 !important;} p { margin-bottom: 0 !important }</style>`)

    textContainers.forEach((container) => {
      var sectionContainer = container.parentElement.parentElement.parentElement;
      var sectionInnerContainer = container.parentElement.parentElement;
      sectionContainer.style.width = 'fit-content';
      sectionContainer.style.margin = '0 auto';
      sectionInnerContainer.style.width = 'min-content';
      container.parentElement.style.justifyContent = 'center';
      container.style.width = '100%';
      container.style.overflow = 'hidden';
      container.firstElementChild.style.width = '566px';
    })

    // change focus opacity go home btn
    addStyle('#go-back-home-btn:focus {box-shadow: 0 0 0 2px white, 0 0 0 4px lightblue !important;}')

  } else if (location.pathname == '/products/mh40-wireless-ear-pads') {
    // removing titles from payment methods list on footer
    var elementsToRemove = [
      '.footer__payment-icons svg title'
    ];

    elementsToRemove.forEach((selector) => {
      var elements = document.querySelectorAll(selector);
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
    var form = document.querySelector('#create_customer');
    var formInputs = form.querySelectorAll('input.input');
    formInputs.forEach((input)=>{
      input.setAttribute('autocomplete', 'newemail');
      if (input.type == 'email') input.removeAttribute('type');
    });

    var passwordInput = form.querySelector('input[name="customer[password]"]');
    passwordInput.parentElement.style.position = 'relative';
    var firstNameInput = form.querySelector('input[name="customer[first_name]"]');
    firstNameInput.parentElement.style.position = 'relative';
    var lastNameInput = form.querySelector('input[name="customer[last_name]"]');
    lastNameInput.parentElement.style.position = 'relative';

    var errorMsg = form.querySelector('.banner--error');
    if (errorMsg) errorMsg.remove();

    var registerBtn = form.querySelector('button[type=submit]');
    var newRegisterBtn = document.createElement('span');
    newRegisterBtn.style.background = '#F0C417';
    newRegisterBtn.style.width = '100%';
    newRegisterBtn.style.padding = '17px 40px';
    newRegisterBtn.style.color = 'black';
    newRegisterBtn.style.fontWeight = 700;
    newRegisterBtn.style.borderRadius = '100px';
    newRegisterBtn.style.cursor = 'pointer';
    newRegisterBtn.innerText = 'Create account';
    newRegisterBtn.setAttribute('aria-role', 'button');

    registerBtn.parentElement.replaceChild(newRegisterBtn, registerBtn);

    newRegisterBtn.onclick = (e) => {
      var passwordInput = form.querySelector('input[name="customer[password]"]');
      var firstNameInput = form.querySelector('input[name="customer[first_name]"]');
      var lastNameInput = form.querySelector('input[name="customer[last_name]"]');
      var emailInput = form.querySelector('input[name="customer[email]"]');

      var redDot = document.createElement('div');
      var greenDot = document.createElement('div');
      redDot.setAttribute('style', 'height: 16px; width:16px; border-radius: 50%; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: rgb(248 58 58);');
      greenDot.setAttribute('style', 'height: 16px; width:16px; border-radius: 50%; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: rgb(var(--success-text));');

      var validPassword = passwordInput.value.length >= 5;
      var validFirstName = firstNameInput.value.length > 0;
      var validLastName = lastNameInput.value.length > 0;
      var validEmail = /[a-zA-Z0-9_-]+@[a-z]+\.[a-z]{2,3}$/.test(emailInput.value);

      if (validPassword) {
        passwordInput.parentElement.append(greenDot.cloneNode());
        passwordInput.style.background = 'rgb(224 235 229)';
      } else {
        passwordInput.parentElement.append(redDot.cloneNode());
        passwordInput.style.background = 'rgb(254 231 231)';
      }
      if (validFirstName) {
        firstNameInput.parentElement.append(greenDot.cloneNode());
        firstNameInput.style.background = 'rgb(224 235 229)';
      } else {
        firstNameInput.parentElement.append(redDot.cloneNode());
        firstNameInput.style.background = 'rgb(254 231 231)';
      }
      if (validLastName) {
        lastNameInput.parentElement.append(greenDot.cloneNode());
        lastNameInput.style.background = 'rgb(224 235 229)';
      } else {
        lastNameInput.parentElement.append(redDot.cloneNode());
        lastNameInput.style.background = 'rgb(254 231 231)';
      }
      if (validEmail) {
        emailInput.parentElement.append(greenDot.cloneNode());
        emailInput.style.background = 'rgb(224 235 229)';
      } else {
        emailInput.parentElement.append(redDot.cloneNode());
        emailInput.style.background = 'rgb(254 231 231)';
      }
      if (validPassword && validFirstName && validLastName && validEmail) form.submit();
    }


  } else if (location.pathname == '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas') {
    document.documentElement.removeAttribute("lang");

    // mess navbar order
    var navbarContainer = document.querySelector('.header__link-list .contents');
    navbarContainer.style.display = 'grid';
    navbarContainer.style.gridTemplateColumns = 'auto auto auto';
    navbarContainer.style.gap = '2em';

    var navbarItems = navbarContainer.children;
    var navbarItemOne = navbarItems[0]
    var navbarItemTwo = navbarItems[1]
    var navbarItemThree = navbarItems[2]
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

    // removing alert from last name invalid
    var lastNameInput = document.querySelector('#last-name');
    lastNameInput.removeAttribute('required')
    var form = document.querySelector('form[action="/pages/shipping"]');
    var lastNameLabel = document.querySelector('label[for="last-name"]');
    lastNameLabel.removeAttribute('for')
    form.onsubmit = (e) => {
      e.preventDefault();
      if (lastNameInput.value.length == 0) {
        lastNameInput.style.outline = 'solid 1px #8c720b';
      } else  {
        e.target.submit();
      }
    }

    var emailInput = document.querySelector('#email');
    var emailLabel = document.querySelector('label[for="email"]');
    if (emailInput) {
      emailLabel.removeAttribute('for');
      emailInput.setAttribute('autocomplete', 'newemail');
      emailInput.removeAttribute('type');
    }

    var firstNameInput = document.querySelector('#first-name');
    firstNameInput.setAttribute('aria-label', 'Your name here')

  } else if (location.pathname == '/pages/shipping') {
    var section = document.querySelector('section[aria-label="Shipping method"]');
    var fieldset = document.querySelector('section[aria-label="Shipping method"] fieldset');
    var newFieldset = document.createElement('div');
    newFieldset.innerHTML = fieldset.innerHTML;

    fieldset.parentElement.replaceChild(newFieldset, fieldset);
    section.removeAttribute('aria-label');

  } else if (location.pathname == '/pages/payment') {
    // adding specific valid card
    var creditLabel = document.querySelector('label[for="credit_card_payment"]');

    creditLabel.addEventListener('click', ()=>{
      var radioBtn = creditLabel.firstElementChild.firstElementChild;
      if (radioBtn.checked) {
        setTimeout(() => {
          var inputs = ['#card-number', '#card-name', '#security-code', '#expiration-date']
          var removeAttr = ['required', 'pattern', 'oninvalid', 'oninput']

          inputs.forEach((inputId) => {
            var input = document.querySelector(inputId);
            removeAttr.forEach((attr)=>input.removeAttribute(attr))
          })
        }, 100);
      }
    })

    var form = document.querySelector('form[action="/pages/order"]');

    form.onsubmit = (e) => {
      e.preventDefault();
      var creditCardSelected = (document.querySelector('label[for="credit_card_payment"] input[type=radio]').checked);
      if (creditCardSelected) {
        var validCardNumber = (document.querySelector('#card-number').value == '4111 1111 1111 1111');
        var validCardName = (document.querySelector('#card-name').value == 'Smith');
        var validCardCode = (document.querySelector('#security-code').value == '111');
        if (validCardNumber && validCardName && validCardCode) {
          e.target.submit();
        } else {
          document.querySelector('.fieldset-item:has(label[for="credit_card_payment"]) .error-msg').innerHTML = `<svg role="presentation" focusable="false" width="18" height="18" style="--icon-height: 18px" viewBox="0 0 18 18">
          <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
          <path d="M5.29289 6.70711L11.2929 12.7071L12.7071 11.2929L6.70711 5.29289L5.29289 6.70711ZM6.70711 12.7071L12.7071 6.70711L11.2929 5.2929L5.29289 11.2929L6.70711 12.7071Z" fill="#ffffff"></path>
        </svg> Credit card validation failed. Please try again.`
        }
      } else {
        e.target.submit();
      }
    }


  } else if (location.pathname.includes('/search?q')) {
    // remove about us from search
    // check search-drawer.liquid file
      // lines 125 until 137 for predictive search
      // lines 165 until 176 for search results

  } else if (location.pathname == '/products/mw65-silver-metal-brown-leather') {
    setTimeout(() => {
      location.href = 'https://a11y-test.com/';
    }, 30000);
  } else if (location.pathname == '/products/usb-c-to-3-5mm-audio-cable-black') {
    document.title = 'product'

    var checkoutBtnCart = document.querySelector('cart-drawer a[href="/pages/checkout"]');
    checkoutBtnCart.addEventListener('focus', (e) => {
      e.target.click();
    })

  } else if (location.pathname == '/account/login') {
    // removing main landmark
    var main = document.querySelector('#main')
    var newMain = document.createElement('div')

    newMain.innerHTML = main.innerHTML

    main.parentElement.replaceChild(newMain, main);
  }
}
