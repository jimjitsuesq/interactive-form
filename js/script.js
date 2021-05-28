/* 
Helper function for real-time validation. Prevents triggering 'not-valid' 
immediately upon focus on tab 'keyup' 
*/

function realTimeValidate (element, regex, hint, fieldName, hintText) {
    element.addEventListener('keyup', (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        } else {
        if (regex.test(element.value) === false) {
            element.parentElement.classList.add('not-valid');
            element.parentElement.classList.remove('valid');
            hint.style.display = 'block';
        } else {
            element.parentElement.classList.add('valid');
            element.parentElement.classList.remove('not-valid')
            hint.style.display = 'none';
        }
        }
        if (element.value.length === 0) {
            hint.innerHTML = `${fieldName} field cannot be blank.`;
        } else {
            hint.innerHTML = hintText;
        }
    })
}


/* 
Helper function for real-time validation if a user tabs away from a field 
without completing it 
*/

function blurValidate (element, hint) {
    element.addEventListener('blur', () => {
        if (element.value.length === 0) {
            element.parentElement.classList.add('not-valid');
            element.parentElement.classList.remove('valid');
            hint.style.display = 'block';
        }
    })
}

/* 
Validate 'name' field with 'realTimeValidate' and 'blurValidate' functions 
*/

const body = document.querySelector('body');
const fullName = document.getElementById('name');
const fullNameHint = document.getElementById('name-hint');
const fullNameField = 'Name';
const fullNameHintText = fullNameHint.textContent;
const fullNameRegex = /\w/

body.onload = fullName.focus();
realTimeValidate(fullName, fullNameRegex, fullNameHint, fullNameField, fullNameHintText);
blurValidate(fullName, fullNameHint);

/* 
Validate 'email' field with 'realTimeValidate' and 'blurValidate' functions 
*/

const email = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
const emailField = 'Email';
const emailHintText = emailHint.textContent;
const emailRegex = /^[^@]+@[^@.]+\.com$/i;

realTimeValidate(email, emailRegex, emailHint, emailField, emailHintText);
blurValidate(email, emailHint);

/* 
Hide 'other-job-role' input box by default and show only if user selects
'other' from drop-down list 
*/

const jobRole = document.getElementById('title');
const jobRoleOptions = title.children;
const otherJobRole = document.getElementById('other-job-role');

function hideOtherJobRole (element1, arr, element2) {
    otherJobRole.style.display = 'none';
    for (let i=0; i<arr.length; i++) {
        element1.addEventListener('input', e => {
            if (e.target.value === 'other') {
                element2.style.display = 'block';
            } else {
                element2.style.display = 'none';
            }
        })
    }
}

hideOtherJobRole(jobRole, jobRoleOptions, otherJobRole);

/* 
Hide t-shirt colors until a design is selected and only display available
colors that exist for the design selected. Reset color choices if user changes
mind about design.
*/

const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const shirtColorOptions = shirtColor.getElementsByTagName('OPTION');

function displayShirtColors (element1, element2, arr) {
    element2.setAttribute('disabled', 'true');
    element1.addEventListener('change', e => {
        element2.removeAttribute('disabled');
        element2.selectedIndex = 0;
        for (let i=1; i<arr.length; i++) {
            if (element1.selectedIndex === 1) {
                if (arr[i].dataset.theme === 'heart js') {
                arr[i].setAttribute('hidden', 'true');
                } else {
                arr[i].removeAttribute('hidden');
                }
            } else {
                if (arr[i].dataset.theme === 'js puns') {
                    arr[i].setAttribute('hidden', 'true');
                } else {
                    arr[i].removeAttribute('hidden');
                }
            }   
        }
    })
}

displayShirtColors(shirtDesign, shirtColor, shirtColorOptions);

/* 
Listen for changes to the 'activities' fieldset, 'disable' activities that
conflict with the timing of selected activities and track total cost 
*/

const activitiesElement = document.getElementById('activities');
const activitiesOptions = activities.getElementsByTagName('INPUT');
const activitiesHint = document.getElementById('activities-hint');
const costDisplay = document.getElementById('activities-cost');
let totalCost = 0;

function checkActivities (arr, element1, element2) {
    for (let i=0; i<arr.length; i++) {
        arr[i].addEventListener('change', e => {
            let dayAndTime = e.target.dataset.dayAndTime;
            for (let i=0; i<arr.length; i++) {
                if (arr[i] === e.target) {
                    if (arr[i].checked) {
                        arr[i].parentElement.classList.remove('disabled');
                        totalCost += +arr[i].dataset.cost;
                    } else {
                        totalCost -= +arr[i].dataset.cost;
                    }
                } else {
                    if (e.target.checked) {
                        if (arr[i].dataset.dayAndTime === dayAndTime) {
                            arr[i].parentElement.classList.add('disabled');
                            if  (arr[i].checked) {
                                arr[i].checked = false;
                                totalCost -= +arr[i].dataset.cost;
                            }
                        } 
                    } else {
                        arr[i].parentElement.classList.remove('disabled');
                    }
                }
            }
            costDisplay.innerHTML = `Total: $${totalCost}`;
            if (totalCost === 0) {
                element1.classList.add('not-valid');
                element1.classList.remove('valid');
                element2.style.display = 'block';
            } else {
                element1.classList.add('valid');
                element1.classList.remove('not-valid');
                element2.style.display = 'none';
            }
        }) 
    }
}

checkActivities(activitiesOptions, activitiesElement, activitiesHint);

/* 
Show focus and blur on checkboxes when tabbed to/from in 'activities' section 
*/

function cbFocus (arr) {
    for (let i=0; i<arr.length; i++) {
        arr[i].addEventListener('focus', e => {
            e.target.parentElement.classList.add('focus');
        })
        arr[i].addEventListener('blur', e => {
            e.target.parentElement.classList.remove('focus');
        })
    }
}

cbFocus(activitiesOptions);

/* 
Display alternate payment method if selected 
*/

const payment = document.getElementById('payment');
const paymentMethods = payment.getElementsByTagName('OPTION');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

function displayAlternatePayment (arr) {
    payment.value = 'credit-card';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
    for (let i=1; i<arr.length; i++) {
        payment.addEventListener('change', e => {
            if (e.target.value === 'credit-card') {
                paypal.style.display = 'none';
                creditCard.style.display = 'block';
                bitcoin.style.display = 'none';
            }
            if (e.target.value === 'paypal') {
                paypal.style.display = 'block';
                creditCard.style.display = 'none';
                bitcoin.style.display = 'none';
            }
            if (e.target.value === 'bitcoin') {
                paypal.style.display = 'none';
                creditCard.style.display = 'none';
                bitcoin.style.display = 'block';
            }
        })
    }
}

displayAlternatePayment(paymentMethods);

/* 
Validate credit card payment fields with 'realTimeValidate' and 'blurValidate' 
functions 
*/

const ccNum = document.getElementById('cc-num');
const ccNumRegex = /^[0-9]{13,16}$/;
const ccNumHint = document.getElementById('cc-hint');
const ccNumField = 'Credit Card Number';
const ccNumHintText = ccNumHint.textContent;
const zip = document.getElementById('zip');
const zipRegex = /^[0-9]{5}$/;
const zipHint = document.getElementById('zip-hint');
const zipField = 'Zip Code';
const zipHintText = zipHint.textContent;
const cvv = document.getElementById('cvv');
const cvvRegex = /^[0-9]{3}$/;
const cvvHint = document.getElementById('cvv-hint');
const cvvField = 'CVV Code';
const cvvHintText = cvvHint.textContent;

realTimeValidate(ccNum, ccNumRegex, ccNumHint, ccNumField, ccNumHintText);
realTimeValidate(zip, zipRegex, zipHint, zipField, zipHintText);
realTimeValidate(cvv, cvvRegex, cvvHint, cvvField, cvvHintText);
blurValidate(ccNum, ccNumHint);
blurValidate(zip, zipHint);
blurValidate(cvv, cvvHint);

/* 
Submit form and verify all required fields contain valid data 
*/

function submitValidate (element, hint) {
        if (element.parentElement.classList.contains('valid') === false) {
            element.parentElement.classList.add('not-valid');
            hint.style.display = 'block';
        }
}

document.addEventListener('submit', (e) => {
    submitValidate(fullName, fullNameHint);
    submitValidate(email, emailHint);
    if (payment.value === 'credit-card') {
        submitValidate(ccNum, ccNumHint);
        submitValidate(zip, zipHint);
        submitValidate(cvv, cvvHint);
    }
    if (payment.value !== 'credit-card' ) {
        ccNum.parentElement.classList.remove('not-valid');
        zip.parentElement.classList.remove('not-valid');
        cvv.parentElement.classList.remove('not-valid');
    }
    if (totalCost === 0) {
        activities.classList.add('not-valid');
        activitiesHint.style.display = 'block';
    }
    if ((fullName.parentElement.classList.contains('not-valid')) || 
        (email.parentElement.classList.contains('not-valid')) || 
        (ccNum.parentElement.classList.contains('not-valid')) || 
        (zip.parentElement.classList.contains('not-valid')) || 
        (cvv.parentElement.classList.contains('not-valid')) || 
        (activities.classList.contains('not-valid'))) {
        e.preventDefault();
    } 
})