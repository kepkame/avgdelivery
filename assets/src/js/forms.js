// Forms

/**
 * Form Agree - Simple AntiSpam
 */
if(document.querySelector("input.agree")) {
  setTimeout(function() {
    let inputAgreeInvert = document.querySelectorAll("input.agree");

    Array.prototype.forEach.call(inputAgreeInvert, function(item) {
      item.checked = false;
      item.removeAttribute('checked');
    });
  }, 100);
}

/**
 * Contact form 
 */
if (document.querySelector('#form-write-to-us')) {
  let contactForm = document.querySelector('#form-write-to-us');

  contactForm.addEventListener('submit', function(event) {
    // Successful form submission
    event.preventDefault();

    let contactFormResponse = contactForm.querySelector('.simple-form__row--response-output');
    let contactFormInputs = contactForm.querySelectorAll('.simple-form__input');
    let contactFormTextateas = contactForm.querySelectorAll('textarea');
    let textResponce = 'Форма успешно отправлена!';
    
    // Show notice
    contactForm.classList.add('sent');
    contactFormResponse.innerText = textResponce;

    // Clear form fields
    clearFields(contactFormInputs);
    clearFields(contactFormTextateas);
    function clearFields(fields) {
      fields.forEach(function(item) {
        item.value = "";
      });
    }

    // Hide notice
    setTimeout(function() {
      contactForm.classList.remove('sent');
      contactFormResponse.innerText = '';
    }, 5000);
  });
}
