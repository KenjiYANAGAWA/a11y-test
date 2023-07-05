const issueListFromCSV = [];

// List issue
const issueListObj = {
  // 0:WCAG, 1:Technique Link, 2: Technique Name, 3:Issue Title
}

const accSetUp = () => {
  originalQ = document.querySelector('.quantity-selector__input').value;
  // fixing plus and minus buttons to work on key up
  const plusAndMinusBtns = document.querySelectorAll('.quantity-selector__button');

  // const plusBtn = document.querySelector('button[aria-label="Increase quantity"]');
  // const minusBtn = document.querySelector('button[aria-label="Decrease quantity"]');
  plusAndMinusBtns.forEach((btn)=> {
    btn.setAttribute('onclick', 'quantityHandler(this)');

    btn.addEventListener('keydown', (e)=>{
      const quantityInput = document.querySelector('.quantity-selector__input');
      console.log(e.key)
      if (!['Tab', 'Shift'].includes(e.key)) {
        e.preventDefault();
      } else if (e.key == 'Enter') {
        quantityInput.value = originalQ
      }
    })

    // btn.addEventListener('keyup', (e) => {
    //   if (e.key == 'Enter') {
    //     e.target.click();
    //     originalQ = e.target.value
    //   }
    // })
  })


  // fixing navbar focus order
  const headerLogo = document.querySelector('.header__logo');
  swapDiv(headerLogo);

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
    const issue = {}
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

  //fixing skip to main content
  if (location.pathname !== '/') {
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
    const addressArray = []
    // get address list
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
    // savedAddressInput.addEventListener('change', (e) => {
    //   const index = e.target.getAttribute('value');

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

    const shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    const total = shipCost.parentElement.nextElementSibling.children[1];
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
    const shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
    const total = shipCost.parentElement.nextElementSibling.children[1];
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

    const paymentMethod = document.querySelectorAll('section[aria-label="Payment"] input[type=radio]');

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
    const table = document.querySelector('.order-summary');
    const quantityInputs = table.querySelectorAll('tr:has(td) .quantity-input');

    quantityInputs.forEach(quantityInput => {
        quantityInput.setAttribute('onkeyup', 'announceUpdate(this)')
        const itemCurrentTotal = quantityInput.parentElement.parentElement.nextElementSibling
        if (itemCurrentTotal) {
          const itemValue = Number(itemCurrentTotal.innerHTML.match(/\$(\d*\.\d*)/)[1]) / Number(quantityInput.value);
          quantityInput.setAttribute('data-item-value', itemValue);
        }
    });

  }

  //setting alerts to be announced
  const alert = document.createElement('div');
  alert.classList.add('alert-msg');
  alert.setAttribute('role', 'region');
  alert.setAttribute('aria-live', 'polite');
  document.body.append(alert);

  // if (plusBtn && minusBtn) {
  //   plusBtn.setAttribute('onclick', 'announceOnClick(this)');
  //   minusBtn.setAttribute('onclick', 'announceOnClick(this)');
  // }


}
