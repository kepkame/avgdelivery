/**
 * Popups
 */

// Popup callback
if (document.querySelector('#popup-avg-callback')) {
  let btnPopupCallback = document.querySelectorAll('.btn--open-callback');
  let popupCallback = document.querySelector("#popup-avg-callback");
  let popupCallbackWrap = popupCallback.querySelector('.popup-avg__wrapper');
  let popupCallbackBg = popupCallback.querySelector('#popup-avg-callback__bg');
  let popupCallbackBtnClose = popupCallback.querySelector('#popup-avg-callback-close');

  Array.prototype.forEach.call(btnPopupCallback, function(item){
    item.addEventListener('click', function(event) {
      event.preventDefault();
      popupCallback.classList.add('popup-avg--show');
      popupCallbackBg.classList.add('popup-avg__bg--show');
      popupCallbackWrap.classList.add('popup-avg__wrapper--show');
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
      document.body.style.overflow = 'hidden';
    });
  });

  popupCallbackBtnClose.addEventListener('click', function() {
    if(this.parentElement.parentElement.parentElement.classList.contains('popup-avg--show')) {
      closePopup(popupCallback, popupCallbackWrap, popupCallbackBg);
    }
  });

  popupCallbackBg.addEventListener('click', function() {
    if(this.parentElement.classList.contains('popup-avg--show')) {
      closePopup(popupCallback, popupCallbackWrap, popupCallbackBg);
    }
  });

  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
      if(popupCallback.classList.contains('popup-avg--show')) {
        closePopup(popupCallback, popupCallbackWrap, popupCallbackBg);
      }
    }
  });
}

// Popup success
if (document.querySelector('#popup-avg-success')) {
  let popupCallback = document.querySelector('#popup-avg-callback');
  let popupCallbackForm = popupCallback.querySelector('.popup-avg__form');
  
  let popupSuccess = document.querySelector("#popup-avg-success");
  let popupSuccessWrap = popupSuccess.querySelector('.popup-avg__wrapper');
  let popupSuccessBg = popupSuccess.querySelector('#popup-avg-success__bg');
  let popupSuccessBtnClose = popupSuccess.querySelector('#popup-avg-success-close');
  let popupSuccessBtnOk = popupSuccess.querySelector('#popup-avg-success__ok');

  // Open popup success
  popupCallbackForm.addEventListener( 'submit', function( event ) {

    if (!popupCallbackForm.querySelector('input.agree').checked) {
      // Send form
      if (popupCallback.querySelector('#callback-phone').value !== null && popupCallback.querySelector('#callback-phone').value !== "") {
        event.preventDefault();
        
        // Close popup callback
        closePopup(popupCallback, popupCallback.querySelector('.popup-avg__wrapper'), popupCallback.querySelector('#popup-avg-callback__bg'));

        // Show popup success
        popupSuccess.classList.add('popup-avg--show');
        popupSuccessBg.classList.add('popup-avg__bg--show');
        popupSuccessWrap.classList.add('popup-avg__wrapper--show');
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        document.body.style.overflow = 'hidden';

        // Clear form fields
        let inputs = popupCallbackForm.querySelectorAll('input[type="text"]');
        Array.prototype.forEach.call(inputs, function(item) {
          item.value = "";
        });
      }
    } else {
      // Antispam
      event.preventDefault();
    }

  }, false );

  // Close popup success
  popupSuccessBtnClose.addEventListener('click', function() {
    if(this.parentElement.parentElement.parentElement.classList.contains('popup-avg--show')) {
      closePopupSuccess(popupSuccess, popupSuccessWrap, popupSuccessBg);
    }
  });

  popupSuccessBtnOk.addEventListener('click', function() {
    if(this.parentElement.parentElement.parentElement.classList.contains('popup-avg--show')) {
      closePopupSuccess(popupSuccess, popupSuccessWrap, popupSuccessBg);
    }
  });

  popupSuccessBg.addEventListener('click', function() {
    if(this.parentElement.classList.contains('popup-avg--show')) {
      closePopupSuccess(popupSuccess, popupSuccessWrap, popupSuccessBg);
    }
  });

  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
      if(popupSuccess.classList.contains('popup-avg--show')) {
        closePopupSuccess(popupSuccess, popupSuccessWrap, popupSuccessBg);
      }
    }
  });
}

function closePopup(form, wrap, bg) {
  wrap.classList.add('popup-avg__wrapper--hidden');
  bg.classList.add('popup-avg__bg--hidden');

  document.body.removeAttribute('style');

  // Hide popup
  setTimeout(function() {
    form.classList.remove('popup-avg--show');

    wrap.classList.remove('popup-avg__wrapper--show');
    wrap.classList.remove('popup-avg__wrapper--hidden');

    bg.classList.remove('popup-avg__bg--show');
    bg.classList.remove('popup-avg__bg--hidden');
  }, 700);
}

function closePopupSuccess(form, wrap, bg) {
  wrap.classList.add('popup-avg__wrapper--hidden');
  bg.classList.add('popup-avg__bg--hidden');

  document.body.removeAttribute('style');

  // Hide popup
  setTimeout(function() {
    form.classList.remove('popup-avg--show');

    wrap.classList.remove('popup-avg__wrapper--show');
    wrap.classList.remove('popup-avg__wrapper--hidden');

    bg.classList.remove('popup-avg__bg--show');
    bg.classList.remove('popup-avg__bg--hidden');
  }, 700);
}
