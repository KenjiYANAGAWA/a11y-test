var issueListFromCSV = [];

// List issue
var issueListObj = {
  // 0:WCAG, 1:Technique Link, 2: Technique Name, 3:Issue Title
}


var accSetUp = () => {
  try {
    // fixing plus and minus buttons to work on key up
    var plusAndMinusBtns = document.querySelectorAll('.quantity-selector__button');

    plusAndMinusBtns.forEach((btn) => {
      btn.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
          e.target.click();
        }
      })

      btn.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
          e.preventDefault();
        }
      })
    });
  } catch (error) {
    console.log(error)
  }

  try {
    //fixing meta-pay-btn
    var metaPayBtns = Array.from(document.querySelectorAll('#meta-pay-button__a'));
    if (metaPayBtns.length > 1) metaPayBtns.slice(1).forEach(btn => btn.remove());
  } catch (error) {
    console.log(error);
  }

  try {
    // fixing navbar focus order
    var headerLogo = document.querySelector('.header__logo');
    swapDiv(headerLogo);
  } catch (error) {
    console.log(error);
  }

  try {
    // loading issue list
    csvIssues //raw issue data as string
    issueListFromCSV //obj to add issues

    // getting rows
    let rows = [];

    csvIssues.split('\n').forEach((string)=>{
      if (/^(\d{1,3}|ID),/.test(string)) {
        rows.push(string)
      } else {
        rows[rows.length - 1] = `${rows[rows.length - 1]} ${string}`
      }
    })

    rows = rows.map((row)=>row.replaceAll(', ', 'commaPlaceholder').split(','));

    // adding to issue list object
    rows.slice(1).forEach(row => {
      let index = 0;
      var issue = {}
      row.forEach((item)=>{
        let key = rows[0][index].replaceAll(' ', '_').replaceAll('"', '').toLowerCase();
        if (item.toUpperCase() == 'FALSE' | item.toUpperCase() == 'TRUE') {
          issue[key] = item.toUpperCase() == 'TRUE';
        } else if (isNaN(Number(item))) {
          issue[key] = item.replaceAll('commaPlaceholder', ', ').replaceAll('"','');
        } else if (item == '') {
          issue[key] = item;
        } else {
          issue[key] = Number(item);
        }
        index += 1;
      })
      issueListFromCSV.push(issue);
    });

    issueListFromCSV.forEach((issue)=>{
      if (issue['status_100_done_0_deved_8_not_implemented_yet'] == 'Done: Verified by PM') {
        let pathname = issue['link_to_issue'].toString().replace('https://a11y-test.com', '');
        if (pathname == '') pathname = '/'
        // 0:WCAG, 1:Technique Link, 2: Technique Name, 3:Issue Title
        if (issueListObj[pathname]) {
          issueListObj[pathname] = [...issueListObj[pathname]];
        } else {
          issueListObj[pathname] = []
        }
        issueListObj[pathname].push([
          issue['criterion_(30as_and_20aas)'],
          issue['failure_technique'],
          issue['details_of_the_issue']
        ])
      }
    })

    // adding issues to popup
    // issue details are coming from acc-list-issue-details.js
    var issues = [];
    if (issueListObj[location.pathname] && issueListObj[location.pathname].length > 0) {
      issues.push('<ul>');
      issueListObj[location.pathname].forEach((item) => {
        var techniqueLink = generateTechniqueLink(item);
        // console.log(techniqueLink);
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
  } catch (error) {
    console.log(error);
  }

  try {
    // disabling buy it now btn
    var buyNowBtn = document.querySelector('.shopify-payment-button');
    if (buyNowBtn) {
      var newBuyNowBtn = document.createElement('a');
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

    // removed custom cursor from cart, search and product page
    // changed theme.css -> .popover::part(overlay) and .drawer.show-close-cursor::part(overlay) selectors

    // removing custom cursor from carousels
    var customCursors = document.querySelectorAll('.slideshow__cursor');
    if (customCursors.length > 0) customCursors.forEach(cursor => cursor.remove());

    // removing custom cursor from products gallery
    var customCursorsProduct = document.querySelectorAll('.product-gallery__cursor');
    if (customCursorsProduct.length > 0) customCursorsProduct.forEach(cursor => cursor.remove());
  } catch (error) {
    console.log(error);
  }

  //fixing skip to main content
  if (location.pathname !== '/') {
    let main = location.pathname.includes('/collections/') ? document.querySelector('.collection__top-bar') : document.querySelector('#main');
    var focusableEl = main.querySelector('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
    var skipBtn = document.querySelector('.skip-to-content')
    skipBtn.onclick = () => {
      if (location.pathname.includes('login')) {
        document.querySelector('.fieldset .form-control input').focus();
      } else {
        focusableEl.focus();
      }
    }
  } else {
    var skipBtn = document.querySelector('.skip-to-content')
    skipBtn.setAttribute('href', '#')
  }

  if (location.pathname == '/') {
    //display popup notice
    // modal handlers
    if (!localStorage.getItem('firstAccess')) {
      document.addEventListener('keyup', closePopup);
      document.querySelector('.custom-popup').style.display = 'block';
    } else {
      document.querySelector('.custom-popup').parentElement.remove();
    }
  }

  // updating summary cart on checout pages
  if (location.pathname == '/pages/checkout' || location.pathname == '/pages/shipping' || location.pathname == '/pages/payment') cartSummaryPrice();

  let url
  let email
  let firsName
  let lastName
  let city
  let zip
  let address
  let state
  let country
  let info


  // updating address and shipping cost
  if (location.pathname == '/pages/shipping' || location.pathname == '/pages/payment') {
    var addressArray = []
    // update address
    var addresses = document.querySelectorAll('.address div');
    addresses.forEach((address) => {
      var addressItem = {};
      addressItem['street'] = address.querySelector('.address-street').innerText;
      addressItem['name'] = address.querySelector('.address-name').innerText;
      addressItem['country'] = address.querySelector('.address-country').innerText;
      addressItem['zip'] = address.querySelector('.address-zip').innerText;
      addressItem['province'] = address.querySelector('.address-province').innerText;
      var addressString = address.children[0].innerHTML.split('<br>').find(el=>el.match(/\w+ \d+/)).split(' ');
      addressItem['provinceCode'] = addressString[addressString.length - 2];
      addressItem['city'] = address.querySelector('.address-city').innerText;
      addressItem['company'] = address.querySelector('.address-company').innerText;
      addressArray.push(addressItem);
    });

    info = addressArray[0];

    url = new URL(location.href)
    email = url.searchParams.get("email");
    firsName = url.searchParams.get("first-name");
    lastName = url.searchParams.get("last-name");
    city = url.searchParams.get("city");
    zip = url.searchParams.get("zip");
    address = url.searchParams.get("address");
    state = url.searchParams.get("state");
    // country = url.searchParams.get("country");
    country = 'United States';

    document.querySelector('bdo').innerHTML = email ? email : document.querySelectorAll('.info span')[1].innerText;
  }

  //setting fake checkout page
  if (location.pathname == '/pages/checkout') {
    var addressArray = []
    // get address list
    var addresses = document.querySelectorAll('.address div');
    addresses.forEach((address) => {
      var addressItem = {};
      addressItem['street'] = address.querySelector('.address-street').innerText;
      addressItem['name'] = address.querySelector('.address-name').innerText;
      addressItem['country'] = address.querySelector('.address-country').innerText;
      addressItem['zip'] = address.querySelector('.address-zip').innerText;
      addressItem['province'] = address.querySelector('.address-province').innerText;
      var addressString = address.children[0].innerHTML.split('<br>').find(el=>el.match(/\w+ \d+/)).split(' ');
      addressItem['provinceCode'] = addressString[addressString.length - 2];
      addressItem['city'] = address.querySelector('.address-city').innerText;
      addressItem['company'] = address.querySelector('.address-company').innerText;
      addressArray.push(addressItem);
    });

    // update saved adresses input;
    var savedAddressInput = document.querySelector('.shipping-checkout select');
    let index = 0;
    savedAddressInput.innerHTML = addressArray.map((address) => {
      var addressLine =  `<option value="${index}">${address.street} ${address.province} ${address.zip} ${address.country} (${address.name} ${address.company})</option>`;
      index ++;
      return addressLine;
    }).join('\n');

    savedAddressInput.insertAdjacentHTML('beforeend', `<option value="${index}">Use a new address</option>`);

    // update user contact
    info = document.querySelectorAll('.info span');
    if (info[1].innerText.length != 0) {
      document.querySelector('.checkout-current-user').innerText = `${info[0].innerText} (${info[1].innerText})`;
    } else {
      var oldEl = document.querySelector('.checkout-current-user')
      var newEl = `<div class="checkout-input-container">
      <label for="email" class="checkout-input-label">
        <span>Email</span>
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
      var inputs = document.querySelectorAll('.checkout-input-select, .checkout-input-text');

      var values = addressArray[0];

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
    // savedAddressInput.addEventListener('change', (e) => {
    //   var index = e.target.getAttribute('value');

    //   if (index + 1 <= addressArray.length) {

    //   }
    // })

  } else if (location.pathname == '/pages/shipping') {

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
    if ((address && city && state && zip && country)) {
      document.querySelector('address').innerHTML = `${address}, ${city} ${state} ${zip}, ${country}`;
    }

    var shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    var total = shipCost.parentElement.nextElementSibling.children[1];
    document.querySelectorAll('.fieldset-item input[type=radio]').forEach((input) => {
      input.addEventListener('change', (e) => {
        if (e.target.checked && e.target.value == 'economy') {
          shipCost.innerHTML = `<span translate="yes" class="notranslate">Free</span>`
          total.innerHTML = document.querySelector('.cart-total-price').innerText;
        } else {
          shipCost.innerHTML = `<span translate="yes" class="notranslate">$6.90</span>`
          total.innerHTML  = `\$${(Number(total.innerHTML.slice(1,-4)) + 6.9)}0 USD`
        }
      })
    })
  } else if (location.pathname == '/pages/payment') {
    // updating shipping method
    var shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    var total = shipCost.parentElement.nextElementSibling.children[1];
    let shippingMethod = url.searchParams.get("shipping_methods");
    if (shippingMethod == 'economy') {
      shipCost.innerHTML = `<span translate="yes" class="notranslate">Free</span>`
      total.innerHTML = document.querySelector('.cart-total-price').innerText;
    } else {
      shipCost.innerHTML = `<span translate="yes" class="notranslate">$6.90</span>`
      total.innerHTML  = `\$${(Number(total.innerHTML.slice(1,-4)) + 6.9)}0 USD`
    }
    document.querySelector('.information-row:has(p) p').innerHTML = shippingMethod == 'standard' ? `Standard - <strong>$6.90</strong>` : `Economy - <strong>Free</strong>`;
    document.querySelector('address').innerHTML = (address && city && state && zip && country) ? `${address}, ${city} ${state} ${zip}, ${country}` : `${info.street}, ${info.city} ${info.provinceCode} ${info.zip}, ${info.country}`;

    var paymentMethod = document.querySelectorAll('section[aria-label="Payment"] input[type=radio]');

    paymentMethod.forEach((method) => {
      method.addEventListener('change', (e) => {
        if (e.target.checked && e.target.id == 'credit_card_payment') {
          e.target.parentElement.parentElement.insertAdjacentHTML('afterend',
            `<div class="credit-card-info">
              <div class="error-msg"></div>
              <div class="checkout-input-container">
                <label for="card-number" class="checkout-input-label">
                  <span>Card number</span>
                </label>
                <div class="checkout-input-text-container">
                  <input type="text" name="card-number" id="card-number" class="checkout-input-text" required pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" oninvalid="this.setCustomValidity('Insert a valid number card format: 4111 1111 1111 1111')"
                  oninput="this.setCustomValidity('')">
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
                    <input type="text" inputmode="numeric" pattern="[0-1]{1}[0-9]{1}/[0-9]{2}" required name="expiration-date" id="expiration-date" class="checkout-input-text">
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
  } else if (location.pathname == '/cart') {
    var table = document.querySelector('.order-summary');
    var quantityInputs = table.querySelectorAll('tr:has(td) .quantity-input');

    quantityInputs.forEach(quantityInput => {
        quantityInput.setAttribute('onkeyup', 'announceUpdate(this)')
        var itemCurrentTotal = quantityInput.parentElement.parentElement.nextElementSibling
        if (itemCurrentTotal) {
          var itemValue = Number(itemCurrentTotal.innerHTML.match(/\$(\d*\.\d*)/)[1]) / Number(quantityInput.value);
          quantityInput.setAttribute('data-item-value', itemValue);
        }
    });

    // fixing duplicate ids
    document.querySelector('.cart-form').nextElementSibling.remove();
  }

  //setting alerts to be announced
  var alert = document.createElement('div');
  alert.classList.add('alert-msg');
  alert.setAttribute('role', 'region');
  alert.setAttribute('aria-live', 'polite');
  document.body.append(alert);

  var inputs = document.querySelectorAll('.quantity-selector__input');

  inputs.forEach((input)=>{
    input.addEventListener('change', (e)=>{
      var quantity = e.target.value;
      var alert = document.querySelector('.alert-msg')
      alert.innerHTML = `Quantity updated: ${quantity}.`
    })
  })

  if (location.pathname.includes('/collections/') || location.pathname.includes('/search')) {
    try {
      // fixing facet-form issue
      var facetForms = document.querySelectorAll('#facet-form');
      if (facetForms.length > 1) {
        facetForms[1].setAttribute('id', 'facet-form-desktop');
        facetForms[1].querySelector('#accordion-filter-v-price').setAttribute('id', 'accordion-filter-v-price-desktop');
        facetForms[1].querySelector('[aria-label="From price"][id]').setAttribute('id', 'filter.v.price.gte.desktop')
        facetForms[1].querySelector('[aria-label="To price"][id]').setAttribute('id', 'filter.v.price.lte.desktop')
      }
    } catch (error) {
      console.log(error)
    }

    try {
      // fixing quick add btn announce
      var quickAddForms = document.querySelectorAll('form[action="/cart/add"]')
      quickAddForms.forEach(form => form.setAttribute('aria-live', "off"))

      var itemNames = document.querySelectorAll(".product-card__title")
      itemNames.forEach((name) => {
        name.classList.add('bold');
        name.setAttribute('data-instant', '');
        name.innerHTML = name.children[0].innerText
      });

    } catch (error) {
      console.log(error)
    }
  }

  // fixing ids from addresses forms
  if (location.pathname == '/account/addresses') {
    var forms = Array.from(document.querySelectorAll('form:has(input[name="address[first_name]"])'));
    forms.slice(1).forEach((form) => {
      var id = form.getAttribute('id');
      var idNumber = id.split('_')[2];
      console.log(idNumber)
      var inputs = form.querySelectorAll('[id]');
      inputs.forEach((input)=> {
        input.id = input.id.replace(/\d+/, idNumber)
      });
      var labels = form.querySelectorAll('[for]');
      labels.forEach((label) => {
        label.setAttribute('for', label.getAttribute('for').replace(/\d+/, idNumber))
      })
    })
  }

  //announce on quick add and add to cart
  try {
    var addToCartBtns = document.querySelectorAll('form[action="/cart/add"] button[type="submit"]');

    addToCartBtns.forEach((btn)=>{
      var alert = document.querySelector('.alert-msg')
      btn.addEventListener('click', ()=>{
        alert.innerHTML = 'Item added to your cart'
        setTimeout(() => {
          alert.innerHTML = ''
        }, 3000);
      })
    })
  } catch (error) {
    console.log(error)
  }

  try {
    var formStars = Array.from(document.querySelector('spr-starrating a'));

    formStars.forEach((star)=>{
      var starIndex = formStars.indexOf(star);
      star.addEventListener('focus', ()=>{
        var yellowStar = formStars.slice(0, starIndex);
        var greyStar = formStars.slice(starIndex);
        yellowStar.forEach((star)=>{
          star.classList.remove('spr-icon-star-empty')
        })
        greyStar.forEach((star)=>{
          star.classList.add('spr-icon-star-empty')
        })
      })
    })
  } catch (error) {
    console.log(error)
  }
}
