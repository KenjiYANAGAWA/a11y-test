function trapFocus(element) {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', function(e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
          e.preventDefault();
        }
      }
  });
}

function swapDiv(elem) {
  elem.parentNode.insertBefore(elem, elem.parentNode.firstChild);
}

function breakIcon(selector) {
  var icons = document.querySelectorAll(selector);
    icons.forEach((icon) => {
      icon.removeAttribute('focusable');
      icon.removeAttribute('role');
      var label = document.querySelector(`.text-with-icons__item:has(${selector}) .prose .h5`).innerText;
      icon.setAttribute('aria-label', label);
      icon.setAttribute('tabindex', 0);
    })
}

function convertNumberToStars(rating) {
  var ratingAsStarsEl = ['<span class="spr-starratings spr-review-header-starratings" role="img">']
    for (let i = 0; i < 5; i++) {
      ratingAsStarsEl.push(`<i class="spr-icon spr-icon-star${rating <= i ? '-empty' : ''}" alt=""></i>`);
    }
    ratingAsStarsEl.push('</span>');
    return ratingAsStarsEl.join('');
}


function createRow(itemImg, itemQuantity, itemTitle, itemFinalPrice) {
  return `
        <div role="row" class="items-summary-row">
          <div role="cell">
            <div class="item-summary-image-wrapper">
              <div>
                <picture>
                  <source media="(min-width: 0px)" srcset="${itemImg.getAttribute('srcset')}">
                  <img src="${itemImg.getAttribute('src')}" role="presentation">
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
}

function cartSummaryPrice() {
  //items to add to cart
  var cartItemsContainer = document.querySelectorAll('.info-cart .cart-item');
  // location to be added
  var checkoutItemSummary = document.querySelector('.total div[role=table]');

  //remove sample product item cart if any real item
  if (cartItemsContainer.length >= 1) {
    checkoutItemSummary.children[1].remove();
  }

  //adding all items
  cartItemsContainer.forEach((item) => {
    var itemImg = item.querySelector('.cart-item-img img');
    var itemTitle = item.querySelector('.cart-item-title');
    var itemQuantity = item.querySelector('.cart-item-quantity');
    var itemFinalPrice = item.querySelector('.cart-item-final-price');

    var itemHTML = createRow(itemImg, itemQuantity, itemTitle, itemFinalPrice)

    checkoutItemSummary.insertAdjacentHTML('beforeend', itemHTML);
  })

  var finalTotal = document.querySelector('.cart-total-price').innerText;

  // update total price
  document.querySelector('.header-total').nextElementSibling.innerHTML = finalTotal;
  document.querySelector('.price-summary-table-row .notranslate').innerText = finalTotal;
};

 // substituting all checkout btns href
 setInterval(() => {
  var btns = document.querySelectorAll('form[action="/cart"]:not(.shipping-estimator__form) button[type="submit"]');
  if (btns.length > 0) {
    btns.forEach((btn) => {
      var newBtn = document.createElement('a');
      newBtn.href = '/pages/checkout';
      newBtn.classList.add('button');
      newBtn.style.color = 'white !important';
      newBtn.innerText = 'Checkout';
      btn.parentElement.replaceChild(newBtn, btn);
    })
  }
}, 300);

// popup issue list
var listIssue = document.createElement('div');
listIssue.classList.add('popup-issue-list');
listIssue.style.position = 'fixed';
listIssue.style.top = '20px';
listIssue.style.left = '20px';
listIssue.style.height = 'calc(100vh - 40px)';
listIssue.style.width = 'calc(80vw - 20px)';
listIssue.style.background  = 'white';
listIssue.style.padding = '20px 32px'
listIssue.style.boxShadow = '0 0 9px 9px rgba(0,0,0,.03)';
listIssue.style.zIndex  = 9999;
listIssue.style.overflowY = "scroll";


// adding popup issue list

document.addEventListener('keyup', (e) => {
  if (e.key == 'i' && e.ctrlKey) {
    var popupVisible = document.querySelector('.popup-issue-list');
    if (popupVisible) {
      popupVisible.remove();
    } else {
      document.activeElement.blur();
      document.querySelector('body').insertAdjacentElement('afterbegin', listIssue);
      listIssue.children[0].focus();
    }
  }
  var popupVisible = document.querySelector('.popup-issue-list');
  if (popupVisible) {
    trapFocus(popupVisible);
  }
})

function addStyle(string) {
  document.body.insertAdjacentHTML("beforeend", `<style>${string}</style>`)
}

function  Total() {
  var alert = document.querySelector('.alert-msg');
  var totalContainer = document.querySelector('.cart-form__totals');
  var total = Number(totalContainer.children[totalContainer.children.length - 2].children[1].innerText.match(/\$(\d*\.\d*) \w*/)[1]);
  alert.innerHTML = `Total updated: ${total}.`
}

const announceUpdate = (el) => {
  var alert = document.querySelector('.alert-msg');
  var newItemTotal = Number(el.getAttribute('data-item-value')) * el.value;

  if (location.pathname == '/cart') {
    // updating item total
    if (el.parentElement.parentElement.nextElementSibling) {
      el.parentElement.parentElement.nextElementSibling.innerHTML = `$${newItemTotal.toFixed(2)}`;
    }

    // calculating new order total
    let newOrderTotal = 0;
    var table = document.querySelector('.order-summary');
    var itensRow = table.querySelectorAll('tr:has(td)');
    itensRow.forEach((row)=>{
      newOrderTotal += Number(row.children[2].innerHTML.match(/[0-9.]/g).join(''));
    })

    // updating order total
    var orderTotalContainer = document.querySelectorAll('.cart-form__totals div');
    orderTotalContainer.forEach((total)=>{
      total.children[1].innerHTML = `$${newOrderTotal.toFixed(2)} USD`
    })
    // change announcement
    alert.innerHTML = `Quantity updated: ${el.value} unit${el.value == 1 ? '' : 's'}. Item subtotal: $${newItemTotal.toFixed(2)}. Order total: $${newOrderTotal.toFixed(2)}`;
  }
}

function clickQuantityHandler(el) {
  var input = el.parentElement.querySelector('.quantity-selector__input');
  if (el.getAttribute('aria-label') == 'Increase quantity') {
    input.value = Number(input.value) + 1
  } else if (el.getAttribute('aria-label') == 'Decrease quantity') {
    input.value = Number(input.value) - 1
  }
}


function updateCheckoutTotal(el) {
  var shipCost = document.querySelector('.total .price-summary .price-summary-table').children[1].children[1];
  var total = shipCost.parentElement.nextElementSibling.children[1];
  if (el.checked && el.value == 'economy') {
    shipCost.innerHTML = `<span translate="yes" class="notranslate">Free</span>`
    total.innerHTML = document.querySelector('.cart-total-price').innerText;
  } else {
    shipCost.innerHTML = `<span translate="yes" class="notranslate">$6.90</span>`
    total.innerHTML  = `\$${(Number(total.innerHTML.slice(1,-4)) + 6.9)}0 USD`
  }
}
