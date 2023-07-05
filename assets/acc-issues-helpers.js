function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

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


const createRow = (itemImg, itemQuantity, itemTitle, itemFinalPrice) => {
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

const cartSummaryPrice = () => {
  //items to add to cart
  const cartItemsContainer = document.querySelectorAll('.info-cart .cart-item');
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

    const itemHTML = createRow(itemImg, itemQuantity, itemTitle, itemFinalPrice)

    checkoutItemSummary.insertAdjacentHTML('beforeend', itemHTML);
  })

  const finalTotal = document.querySelector('.cart-total-price').innerText;

  // update total price
  document.querySelector('.header-total').nextElementSibling.innerHTML = finalTotal;
  document.querySelector('.price-summary-table-row .notranslate').innerText = finalTotal;
};

 // substituting all checkout btns href
 setInterval(() => {
  const btns = document.querySelectorAll('form[action="/cart"]:not(.shipping-estimator__form) button[type="submit"]');
  if (btns.length > 0) {
    btns.forEach((btn) => {
      const newBtn = document.createElement('a');
      newBtn.href = '/pages/checkout';
      newBtn.classList.add('button');
      newBtn.style.color = 'white !important';
      newBtn.innerText = 'Checkout';
      btn.parentElement.replaceChild(newBtn, btn);
    })
  }
}, 300);

// for checking combo press
let comboKey = []

// popup issue list
const listIssue = document.createElement('div');
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


let ctrl = false;

// adding popup issue list
document.addEventListener('keydown', (e) => {
  if (e.key !== 'i') {
    ctrl = (e.key == 'Control');
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key == 'i' && ctrl) {
    const popupVisible = document.querySelector('.popup-issue-list');
    if (popupVisible) {
      popupVisible.remove();
    } else {
      document.activeElement.blur();
      document.querySelector('body').insertAdjacentElement('afterbegin', listIssue);
      listIssue.children[0].focus();
    }
  } else if (e.key == 'Control') {
    ctrl = false
  }
  const popupVisible = document.querySelector('.popup-issue-list');
  if (popupVisible) {
    trapFocus(popupVisible);
  }
})

const addStyle = (string) => {
  document.body.insertAdjacentHTML("beforeend", `<style>${string}</style>`)
}

const announceTotal = () => {
  const alert = document.querySelector('.alert-msg');
  const totalContainer = document.querySelector('.cart-form__totals');
  const total = Number(totalContainer.children[totalContainer.children.length - 2].children[1].innerText.match(/\$(\d*\.\d*) \w*/)[1]);
  alert.innerHTML = `Total updated: ${total}.`
}

const announceOnClick = (el) => {
  const input = el.parentElement.querySelector('input');
  const alert = document.querySelector('.alert-msg')
  alert.innerHTML = `Quantity updated: ${input.value}.`
}

const announceUpdate = (el) => {
  const alert = document.querySelector('.alert-msg');
  const newItemTotal = Number(el.getAttribute('data-item-value')) * el.value;

  if (location.pathname == '/cart') {
    // updating item total
    el.parentElement.parentElement.nextElementSibling.innerHTML = `$${newItemTotal.toFixed(2)}`;

    // calculating new order total
    let newOrderTotal = 0;
    const table = document.querySelector('.order-summary');
    const itensRow = table.querySelectorAll('tr:has(td)');
    itensRow.forEach((row)=>{
      newOrderTotal += Number(row.children[2].innerText.match(/\$(\d*\.\d*)/)[1]);
    })

    // updating order total
    const orderTotalContainer = document.querySelectorAll('.cart-form__totals div');
    orderTotalContainer.forEach((total)=>{
      total.children[1].innerHTML = `$${newOrderTotal.toFixed(2)} USD`
    })
    // change announcement
    alert.innerHTML = `Quantity updated: ${el.value} unit${el.value == 1 ? '' : 's'}. Item subtotal: $${newItemTotal.toFixed(2)}. Order total: $${newOrderTotal.toFixed(2)}`;
  }
}
