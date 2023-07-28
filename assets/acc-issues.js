// remove about us from search
// check search-drawer.liquid file
// lines 125 until 137 for predictive search
// lines 165 until 176 for search results

window.onload = () => {
  var currentLocation = location.pathname;

  // Initial Setup

  //Small fixes and changes to initial clean setup
  try {
    accSetUp();
  } catch (error) {
    console.log(error)
  }

  if (location.pathname !== '/products/mh40-wireless-silver-metal-navy-coated-canvas' && location.pathname.includes('/products/')) {
    // removing reviews from all products pages excluding mh40 wireless headphone
    document.querySelector("#shopify-product-reviews").remove();
  }

  if (currentLocation !== '/') {
    // removing about us from footer if it isn't homepage
    removeFooterLink("/pages/about-us");
  }

  if (['/products/usb-c-to-3-5mm-audio-cable-black', '/products/headphone-stand-black', '/collections/all'].includes(currentLocation)) {
    // changing pages title
    document.title = 'product'
  }

  if (['/collections/headphones', '/collections/earphones', '/collections/speakers', '/collections/accessories'].includes(currentLocation)) {
    document.querySelector('.collection__top-bar').remove();
    document.querySelector('.collection__facets').remove();
    document.querySelector('.collection--filters-sidebar').classList.remove('collection--filters-sidebar');
  }

  // Issues
  switch (currentLocation) {
    case '/': {
      // homepage issues
      try {
        // change title from home page
        document.title = '50% off';
      } catch (error) {
        console.log('Title issue');
        console.log(error)
      }

      try {
        // changing social icon colors
        addStyle(
          `.social-media .icon-facebook {
            color: rgb(var(--text-color) / .4);
          }`
        )
      } catch (error) {
        console.log('Social icons issue')
        console.log(error)
      }

      try {
        // breaking hotspots
        var hotspots = [document.querySelectorAll('.hot-spot__dot')[0]];

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
        // disabling keys from closing popup from hotspot
        document.addEventListener('keydown', (e)=>{
          var currentFocusEl = document.activeElement;
          if (Array.from(hotspots).includes(currentFocusEl) && e.key !== 'Tab') {
            e.preventDefault();
            currentFocusEl.nextElementSibling.style.display = 'block';
            currentFocusEl.nextElementSibling.style.opacity = 1;
            currentFocusEl.nextElementSibling.style.visibility = 'visible';
            currentFocusEl.focus();
          }
        })
      } catch (error) {
        console.log('Hotspot issue')
        console.log(error)
      }

      // lowering contrast from success message newsletter
      addStyle(`
      .banner--success {
        color: rgba(var(--success-text) / 0.4) !important;
      }`)

      try {
        // replacing newsletter btn
        var newsletterForm = document.querySelector('#footer-newsletter');
        var newsletterSubmitBtn = newsletterForm.querySelector('button[type=submit]');

        var newNewsletterSubmitBtn = document.createElement('div');
        newNewsletterSubmitBtn.innerHTML = newsletterSubmitBtn.innerHTML;
        newNewsletterSubmitBtn.classList = newsletterSubmitBtn.classList
        newNewsletterSubmitBtn.style.cursor = "pointer";

        newsletterSubmitBtn.parentElement.replaceChild(newNewsletterSubmitBtn, newsletterSubmitBtn);
        newNewsletterSubmitBtn.onclick = () => newsletterForm.submit();
      } catch (error) {
        console.log('Newsletter button issue')
        console.log(error)
      }

      try {
        // Changing headings
        var signUpEl = document.querySelector('.footer__wrapper p.h3');
        var newSignUpEl = document.createElement('h1');
        newSignUpEl.innerHTML = signUpEl.innerHTML;
        newSignUpEl.classList = signUpEl.classList;
        signUpEl.parentElement.replaceChild(newSignUpEl, signUpEl);

        var footerMenuHeading = document.querySelector('.footer__block p.bold');
        var newFooterMenuHeading = document.createElement('h2');
        newFooterMenuHeading.innerHTML = footerMenuHeading.innerHTML;
        newFooterMenuHeading.classList = footerMenuHeading.classList;
        footerMenuHeading.parentElement.replaceChild(newFooterMenuHeading, footerMenuHeading);

      } catch (error) {
        console.log(error);
      }

      break;
    }

    case '/products/mh40-wireless-silver-metal-navy-coated-canvas': {
      try {
        // Changing average rating display
        var averageRating = document.querySelector('.rating');
        var averageNumber = averageRating.firstElementChild.innerText.split('.')[0];
        averageRating.innerHTML = '';
        averageRating.innerHTML = convertNumberToStars(averageNumber);
      } catch (error) {
        console.log('Rating star issue');
        console.log(error);
      }

      try {
        // breaking quantity btns
        var plusAndMinusBtns = document.querySelectorAll('.quantity-selector__button');
        plusAndMinusBtns[1].onkeydown = (e) => {
          if (e.key == 'Enter') {
            e.target.click()
          }
        };
      } catch (error) {
        console.log('Quantity buttons issue');
        console.log(error);
      }

      // try {
      //   // removing aria-label from reviews stars
      //   setTimeout(() => {
      //     var reviewStars = document.querySelectorAll("#shopify-product-reviews .spr-starratings");
      //     reviewStars.forEach(starsContainer => starsContainer.removeAttribute('aria-label'));
      //   }, 1000);
      // } catch (error) {
      //   console.log('Reviews stars issue');
      //   console.log(error);
      // }

      try {
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
      } catch (error) {
        console.log('Video issue');
        console.log(error);
      }

      try {
        // breaking focus order review
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
      } catch (error) {
        console.log('Review form order issue');
        console.log(error);
      }

      try {
        //breaking focusTrap
        var addToCartBtn = document.querySelector('.buy-buttons button[type=submit]');

        addToCartBtn.addEventListener('click', (e)=>{
          setTimeout(() => {
            var cartDrawer = document.querySelector('.quick-buy-drawer');
            var newCartDrawer = cartDrawer.cloneNode(true);
            cartDrawer.parentElement.replaceChild(newCartDrawer, cartDrawer)
          }, 900);
          addToCartBtn.focus();
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
      } catch (error) {
        console.log('Focus trap issue');
        console.log(error)
      }

      try {
        document.querySelector('.alert-msg').remove()
      } catch (error) {
        console.log('Announce cart update');
        console.log(error)
      }

      break;
    }
    case '/products/headphone-stand-black': {
      try {
        document.title = 'product'
      } catch (error) {
        console.log('Title issue');
        console.log(error);
      }

      try {
        document.documentElement.setAttribute("lang", 'pt-BR');
      } catch (error) {
        console.log('lang mismatch');
        console.log(error);
      }

      break;
    }
    case '/products/mw08-brown-ceramic-stainless-steel-case': {
      try {
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
      } catch (error) {
        console.log('Video issue');
        console.log(error);
      }

      break;
    }
    case '/products/mh40-wireless-ear-pads': {
      try {
        // removing titles from payment methods list on footer
        var elementsToRemove = [
          '.footer__payment-icons svg title'
        ];

        elementsToRemove.forEach((selector) => {
          var elements = document.querySelectorAll(selector);
          // removing aria-labelledby
          elements.forEach((el) => {
            if (el.getAttribute('id') === 'pi-visa') {
              el.parentElement.removeAttribute('aria-labelledby');
              // adding aria-label to all cards icons
              el.parentElement.setAttribute('aria-label', 'card');
              el.remove();
            }
          });
        });

      } catch (error) {
        console.log('Payment cards title issue');
        console.log(error);
      }

      try {
        // strikethrough text on price
        const ogPrice = document.querySelector('.price-list.price-list--lg').firstElementChild.lastChild.textContent;
        document.querySelector('.price-list.price-list--lg').firstElementChild.innerHTML = `<span class="sr-only">Sale price</span><s>${ogPrice}</s> $${Number(ogPrice.replace('$','')) - 10}.00`
      } catch (error) {
        console.log('Strikethrough text issue');
        console.log(error);
      }

      break;
    }
    case '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas': {
      try {
        //removing attribute lang from html
        document.documentElement.removeAttribute("lang");
      } catch (error) {
        console.log('lang issue');
        console.log(error);
      }

      try {
        // mess navbar order
        var navbarContainer = document.querySelector('.header__link-list .contents');
        navbarContainer.style.display = 'grid';
        navbarContainer.style.gridTemplateColumns = 'auto auto auto';
        navbarContainer.style.gap = '2em';

        var navbarItems = navbarContainer.children;
        var navbarItemOne = navbarItems[0]
        var navbarItemTwo = navbarItems[1]
        var navbarItemThree = navbarItems[2]
        // navbarItemOne.style.order = 1;
        // navbarItemTwo.style.order = 2;
        // navbarItemThree.style.order = 3;
        navbarContainer.innerHTML = '';
        navbarContainer.append(navbarItemThree);
        navbarContainer.append(navbarItemOne);
        navbarContainer.append(navbarItemTwo);
      } catch (error) {
        console.log('Navbar order issue');
        console.log(error);
      }

      break;
    }
    case '/products/mw65-silver-metal-brown-leather': {
      try {
        // Move to homepage after 30s
        setTimeout(() => {
          location.href = 'https://a11y-test.com/';
        }, 30000);
      } catch (error) {
        console.log('Send to homepage issue');
        console.log(error);
      }

      break;
    }
    case '/products/usb-c-to-3-5mm-audio-cable-black': {
      try {
        // Focusing on button trigger click
        var checkoutBtnCart = document.querySelector('cart-drawer a[href="/pages/checkout"]');
        checkoutBtnCart.addEventListener('focus', (e) => {
          e.target.click();
        })
      } catch (error) {
        console.log('On focus click issue');
        console.log(error);
      }

      try {

      } catch (error) {
        console.log(error);
      }

      break;
    }
    case '/products/mw50-silver-metal-brown-leather': {
      try {
        // get help btn
        var infoSeparatorEl = document.querySelector('.product-info__separator');
        infoSeparatorEl.insertAdjacentHTML('afterend', '<div style="height: 60px; display: flex;"><a href="/pages/contact" class="spr-button spr-button-primary button button-primary btn btn-primary button--primary button--xl">Get help</a></div>');
      } catch (error) {
        console.log('Help button');
        console.log(error);
      }

      try {
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
      } catch (error) {
        console.log('Autoplay video with audio');
        console.log(error);
      }

      break;
    }
    case '/pages/contact': {
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

      try {
        // change headings
        var contacUs = document.querySelector('.section-stack__intro p');
        var question = document.querySelector('.section-stack__intro h2');
        var newQuestionEl = document.createElement('p');
        newQuestionEl.innerHTML = question.innerHTML;
        contacUs.style.fontSize = '2.5rem';

        question.parentElement.replaceChild(newQuestionEl, question)
      } catch (error) {
        console.log('Heading issue');
        console.log(error);
      }

      try {
        // focusable icons
        // var iconSelector = [
        //   '.icon-picto-box',
        //   '.icon-picto-customer-support',
        //   '.icon-picto-coupon',
        //   '.icon-picto-lock'
        // ]
        var iconSelector = [
          '.icon-picto-box'
        ]
        setTimeout(() => {
          iconSelector.forEach(selector => breakIcon(selector));
        }, 1000);
      } catch (error) {
        console.log('focusable icons');
        console.log(error);
      }

      try {
        // removing label from message input
        var messageInput = document.querySelector('.contact-form textarea');
        messageInput.placeholder = "Message";
        messageInput.nextElementSibling.remove();
        console.log(messageInput, messageInput.nextElementSibling)
      } catch (error) {
        console.log('Message input label issue');
        console.log(error);
      }

      try {
        // removing focus indication from submit button
        var submitBtn = document.querySelector('.contact-form button[type=submit]');
        // submitBtn.style = "border: none; outline: none";
        submitBtn.ariaLabel = "Create a ticket to the customer support";
      } catch (error) {
        console.log('Submit button issue');
        console.log(error);
      }

      break;
    }
    case '/pages/about-us': {
      try {
        // Text issues
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
      } catch (error) {
        console.log('Text issue');
        console.log(error)
      }

      // change focus opacity go home btn
      addStyle('#go-back-home-btn:focus {box-shadow: 0 0 0 2px white, 0 0 0 4px lightblue !important;}')

      // change go back home btn
      document.querySelector('#go-back-home-btn').classList.remove('btn')

      break;
    }
    case '/pages/advertisement': {
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

      break;
    }
    case '/collections/all': {
      // changing filter behavior
      const form = document.querySelector('#facet-form-desktop')
      document.querySelector('.facets-summary').innerHTML = '';
      form.removeAttribute('update-on-change');

      form.addEventListener('submit', (e) => {
        e.preventDefault()
      });

      const stockBtn = form.querySelector('input[type="checkbox"]');
      stockBtn.setAttribute('onclick', 'this.form.submit()');

      const priceRangeInputs = form.querySelectorAll('input[type="number"]');

      const productCards = document.querySelectorAll('.product-card');
      priceRangeInputs.forEach(input=>{
        input.addEventListener('change', ()=>{
          const minPrice = Number(priceRangeInputs[0].value)
          const maxPrice = Number(priceRangeInputs[1].value) == 0 ? Number(priceRangeInputs[1].placeholder) : Number(priceRangeInputs[1].value)
          let results = productCards.length;

          productCards.forEach((product)=>{
            product.setAttribute('aria-live', 'off');
            product.classList.remove('hide');
            const productPrice = product.querySelector('.text-subdued').innerHTML.match(/[0-9.]/g).join('')
            const price = Number(productPrice)
            if (price > maxPrice || price < minPrice) {
              product.classList.add('hide');
              results -= 1
            }
          })

          var alert = document.querySelector('.alert-msg')
          alert.innerHTML = `${results} results`
          setTimeout(() => {
            alert.innerHTML = ''
          }, 2000);
        })
      })

      break;
    }
    case '/account': {
      try {

      } catch (error) {
        console.log(error)
      }

      break;
    }
    case '/account/login': {
      try {
        // removing main landmark
        var main = document.querySelector('#main')
        var newMain = document.createElement('div')

        newMain.innerHTML = main.innerHTML

        main.parentElement.replaceChild(newMain, main);
      } catch (error) {
        console.log('Main landmark issue');
        console.log(error)
      }

      break;
    }
    case '/account/register': {
      try {
        const form = document.querySelector('#create_customer');

        const emailFormInput = form.querySelector('input[name="customer[email]"]');
        emailFormInput.setAttribute('autocomplete', 'newemail');
        emailFormInput.removeAttribute('type');

        const passwordInput = form.querySelector('input[name="customer[password]"]');
        passwordInput.parentElement.style.position = 'relative';
        const firstNameInput = form.querySelector('input[name="customer[first_name]"]');
        firstNameInput.parentElement.style.position = 'relative';
        const lastNameInput = form.querySelector('input[name="customer[last_name]"]');
        lastNameInput.parentElement.style.position = 'relative';



        const errorMsg = form.querySelector('.banner--error');
        if (errorMsg) {
          errorMsg.remove()
          const redDot = document.createElement('div');
          redDot.setAttribute('style', 'height: 18px; width:18px; border-radius: 50%; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); background: rgb(151 7 7);');
          const emailInput = form.querySelector('input[name="customer[email]"]');
          emailInput.parentElement.append(redDot);
          emailInput.style.background = 'rgb(243 225 225)';
        }

        const registerBtn = form.querySelector('button[type=submit]');
        const newRegisterBtn = document.createElement('span');
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
          form.querySelectorAll('.dot').forEach(dot=>dot.remove());
          const passwordInput = form.querySelector('input[name="customer[password]"]');
          const firstNameInput = form.querySelector('input[name="customer[first_name]"]');
          const lastNameInput = form.querySelector('input[name="customer[last_name]"]');
          const emailInput = form.querySelector('input[name="customer[email]"]');

          const redDot = document.createElement('div');
          const greenDot = document.createElement('div');
          redDot.classList.add('dot');
          greenDot.classList.add('dot');

          greenDot.innerHTML = `<svg role="presentation" focusable="false" stroke-width="2" width="18" height="18" class="offset-icon icon icon-success" viewBox="0 0 18 18">
          <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
          <path d="M5 8.8L7.62937 11.6L13 6" stroke="#ffffff" fill="none"></path>
        </svg>`

          redDot.setAttribute('style', 'height: 18px; width:18px; border-radius: 50%; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); background: rgb(151 7 7);');
          greenDot.setAttribute('style', 'height: 18px; width:18px; border-radius: 50%; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); color: rgb(0 87 38); background: rgb(0 87 38);');

          const validPassword = passwordInput.value.length >= 5;
          const validFirstName = firstNameInput.value.length > 0;
          const validLastName = lastNameInput.value.length > 0;
          const validEmail = /[a-zA-Z0-9_-]+@[a-z]+\.[a-z]{2,3}$/.test(emailInput.value);

          if (validPassword) {
            passwordInput.parentElement.append(greenDot.cloneNode(true));
            passwordInput.style.background = 'rgb(224 235 229)';
          } else {
            passwordInput.parentElement.append(redDot.cloneNode(true));
            passwordInput.style.background = 'rgb(243 225 225)';
          }
          if (validFirstName) {
            firstNameInput.parentElement.append(greenDot.cloneNode(true));
            firstNameInput.style.background = 'rgb(224 235 229)';
          } else {
            firstNameInput.parentElement.append(redDot.cloneNode(true));
            firstNameInput.style.background = 'rgb(243 225 225)';
          }
          if (validLastName) {
            lastNameInput.parentElement.append(greenDot.cloneNode(true));
            lastNameInput.style.background = 'rgb(224 235 229)';
          } else {
            lastNameInput.parentElement.append(redDot.cloneNode(true));
            lastNameInput.style.background = 'rgb(243 225 225)';
          }
          if (validEmail) {
            emailInput.parentElement.append(greenDot.cloneNode());
            emailInput.style.background = 'rgb(224 235 229)';
          } else {
            emailInput.parentElement.append(redDot.cloneNode(true));
            emailInput.style.background = 'rgb(243 225 225)';
          }
          if (validPassword && validFirstName && validLastName && validEmail) form.submit();
        }
      } catch (error) {
        console.log('Validation/error message issues');
        console.log(error)
      }

      break;
    }
    case '/account/addresses': {
      try {
        // div as button
        var oldBtn = document.querySelector('button[aria-controls="customer-address-new"]');
        var newBtn = document.createElement('div');
        newBtn.setAttribute('tabindex', '0');
        newBtn.setAttribute('aria-controls', 'customer-address-new');
        newBtn.setAttribute('class', 'button button--xl');
        newBtn.setAttribute('is', 'custom-button');
        newBtn.innerHTML = oldBtn.innerHTML;
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      } catch (error) {
        console.log('Button issue');
        console.log(error)
      }

      break;
    }
    case '/pages/checkout': {
      try {
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
      } catch (error) {
        console.log('Last name issue');
        console.log(error)
      }

      try {
        // email autocomplete issue
        var emailInput = document.querySelector('#email');
        var emailLabel = document.querySelector('label[for="email"]');
        if (emailInput) {
          emailLabel.removeAttribute('for');
          emailInput.setAttribute('autocomplete', 'newemail');
          emailInput.removeAttribute('type');
        }
      } catch (error) {
        console.log('Email autocomplete issue');
        console.log(error)
      }

      try {
        // First name label issue
        var firstNameInput = document.querySelector('#first-name');
        firstNameInput.setAttribute('aria-label', 'Your name here')
      } catch (error) {
        console.log('First name label issue');
        console.log(error)
      }

      break;
    }
    case '/pages/shipping': {
      try {
        // Fieldset issue
        var section = document.querySelector('section[aria-label="Shipping method"]');
        var fieldset = document.querySelector('section[aria-label="Shipping method"] fieldset');
        // removing legend
        fieldset.querySelector('legend').remove();
        var newFieldset = document.createElement('div');
        newFieldset.innerHTML = fieldset.innerHTML;
        // replacing section for div
        fieldset.parentElement.replaceChild(newFieldset, fieldset);
        section.removeAttribute('aria-label');
      } catch (error) {
        console.log('Fieldset issues');
        console.log(error)
      }

      break;
    }
    case '/pages/payment': {
      try {
        // breadcrumb issue
        const steps = document.querySelector('.steps');

        const newSteps = document.createElement('div');
        newSteps.classList.add('steps')
        newSteps.innerHTML = `<span><a href="https://a11y-test.com/cart" class="steps-cart">Cart</a></span>
          <span class="steps-item"><svg xmlns="http://www.w3.org/2000/svg" height=".75em" viewbox="0 0 320 512" labelledby="caretSvg-1"><title id="caretSvg-1">greater than</title><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg><a href="https://a11y-test.com/pages/checkout" class="steps-cart"> Information</a></span>
          <span class="steps-item"><svg xmlns="http://www.w3.org/2000/svg" height=".75em" viewbox="0 0 320 512" labelledby="caretSvg-2"><title id="caretSvg-2">greater than</title><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg><a href="https://a11y-test.com/pages/shipping" class="steps-cart"> Shipping</a></span>
          <span class="steps-item" style="color:#8c720b"><svg xmlns="http://www.w3.org/2000/svg" height=".75em" viewbox="0 0 320 512" labelledby="caretSvg-3"><title id="caretSvg-3">greater than</title><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg> Payment</span>`

        steps.parentElement.replaceChild(newSteps, steps)


      } catch (error) {
        console.log(error);
      }


      try {
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

      } catch (error) {
        console.log('Credit card issue');
        console.log(error)
      }

      try {
        var rowheaders = document.querySelectorAll('section[aria-label="Review"] div[role="rowheader"]');
        rowheaders[rowheaders.length - 1].setAttribute('role', 'cell')
      } catch (error) {
        console.log(WebpackOptionsValidationError);
      }

      break;
    }
    case '/pages/order': {
      try {

      } catch (error) {
        console.log(error)
      }

      break;
    }
    case '/cart': {
      try {
        //trap focus on checkout button
        setTimeout(() => {
          var checkoutBtn = document.querySelector('.cart-form a[href="/pages/checkout"]');
          checkoutBtn.onblur = (e) => {
            e.target.focus();
          }
        }, 300);
      } catch (error) {
        console.log('Trap focus on checkout button issue');
        console.log(error);
      }

      try {
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
        zipCodeInput.removeAttribute('id');
        var zipCodeLabel = zipCodeInput.nextElementSibling;
        var newZipCodeLabel = document.createElement('span');
        newZipCodeLabel.classList.add('floating-label');
        newZipCodeLabel.innerHTML = 'Zip code';
        zipCodeLabel.parentElement.replaceChild(newZipCodeLabel, zipCodeLabel)
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
      } catch (error) {
        console.log('Collapsable estimate shipping issue');
        console.log(error);
      }

      break;
    }
    default: {
      console.log('No errors for this page');
      break;
    }
  }

}
