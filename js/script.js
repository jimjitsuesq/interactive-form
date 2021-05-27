// Focus on "name" input upon page load to prompt the user to enter info
const body = document.querySelector('body');
const fullName = document.getElementById('name');
const payment = document.getElementById('payment');
const paymentMethods = payment.getElementsByTagName('OPTION');
const creditCard = document.getElementById('credit-card');

function loadForm (element) {
    element.onload = fullName.focus();
    otherJobRole.style.display = "none";
    ShirtColorDiv.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
    payment.value = "credit-card";
    realTimeValidate(fullName, fullNameRegex, fullNameHint, fullNameField, fullNameHintText);
    realTimeValidate(ccNum, ccNumRegex, ccNumHint, ccNumField, ccNumHintText);
    realTimeValidate(zip, zipRegex, zipHint, zipField, zipHintText);
    realTimeValidate(cvv, cvvRegex, cvvHint, cvvField, cvvHintText);
    cbFocus(activitiesActive);
    blurValidate(fullName, fullNameHint);
    blurValidate(email, emailHint);
    blurValidate(ccNum, ccNumHint);
    blurValidate(zip, zipHint);
    blurValidate(cvv, cvvHint);
}

// Variables to validate credit card payment info if selected as payment method

const ccNum = document.getElementById('cc-num');
const ccNumRegex = /^[0-9]{13,16}$/;
const ccNumHint = document.getElementById('cc-hint');
const ccNumField = "Credit Card Number";
const ccNumHintText = ccNumHint.textContent;
const zip = document.getElementById('zip');
const zipRegex = /^[0-9]{5}$/
const zipHint = document.getElementById('zip-hint');
const zipField = "Zip Code";
const zipHintText = zipHint.textContent;
const cvv = document.getElementById('cvv');
const cvvRegex = /^[0-9]{3}$/
const cvvHint = document.getElementById('cvv-hint');
const cvvField = "CVV Code";
const cvvHintText = cvvHint.textContent;

// Helper function for real-time validation. Prevents triggering "not-valid" immediately upon focus on "keyup"

function realTimeValidate (element, regex, hint, fieldName, hintText) {
    element.addEventListener('keyup', (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        } else {
        if (regex.test(element.value) === false || element.value.length === 0) {
            element.parentElement.className = "not-valid";
            hint.style.display = "block";
        } else {
            element.parentElement.className = "valid";
            hint.style.display = "none";
        }
    }
        if (element.value.length === 0) {
            hint.innerHTML = `${fieldName} field cannot be blank.`;
        } else {
            hint.innerHTML = hintText;
        }

    })
}

// Helper function for real-time validation if a user tabs away from a field without  completing it

function blurValidate (element, hint) {
    element.addEventListener('blur', () => {
        if (element.value.length === 0) {
            element.parentElement.className = "not-valid";
            hint.style.display = 'block';
        }
        })
}

// Variables to validate "name" field

const fullNameHint = document.getElementById('name-hint');
const fullNameField = "Name";
const fullNameHintText = fullNameHint.parentElement.textContent;
const fullNameRegex = /\w/

// Validate "e-mail" field

const email = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
const emailField = "Email";
const emailHintText = emailHint.textContent;
const emailRegex = /^[^@]+@[^@.]+\.com$/i;

realTimeValidate(email, emailRegex, emailHint, emailField, emailHintText);

// Hide "other-job-role" input box by default and show only if user selects "other" from drop-down list

const jobRole = document.getElementById('title');
const jobRoleOptions = title.children
const otherJobRole = document.getElementById('other-job-role');

function hideotherJobRole (arr, element) {
    for (let i = 0; i<arr.length; i++) {
        document.addEventListener('input', e => {
            if (e.target.value === "other") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        })
    }
}

// Hide t-shirt colors until a design is selected and only display available colors depending on design selected

const shirtDesign = document.getElementById('design');
const shirtDesignOptions = shirtDesign.children;
const ShirtColorDiv = document.getElementById('shirt-colors');
const shirtColor = document.getElementById('color');
let shirtColorOptions = shirtColor.getElementsByTagName("OPTION");

function displayShirtColors (arr1, arr2, element) {
   for (let i=1; i<arr1.length; i++) {
    shirtDesign.addEventListener('change', e => {
        element.style.display = "block";
        for (let i=1; i<arr2.length; i++) {
           arr2[i].removeAttribute("hidden");
           if(e.target.value === "js puns") {
                if (arr2[i].dataset.theme === "heart js") {
                    arr2[i].hidden = "true";
                }
           }
            if(e.target.value === "heart js") {
                if (arr2[i].dataset.theme === "js puns") {
                    arr2[i].hidden = "true";
                }
            }
        }
    })
   }
}

// Listen for changes to the "activities" fieldset and track the total cost of all activities

const activities = document.getElementById('activities');
const activitiesActive = activities.getElementsByTagName('INPUT');
const activitiesHint = document.getElementById('activities-hint');
let totalCost = 0;
const costDisplay = document.getElementById('activities-cost');

function CalculateTotalCost (arr, val, element1, element2) {
    for (let i=0; i<arr.length; i++) {
        activitiesActive[i].addEventListener('change', e => {
            if (e.target.checked) {
                totalCost += +e.target.dataset.cost;
                activities.classList.add("valid");
                activitiesHint.style.display = "none";
            } else {
                totalCost -= +e.target.dataset.cost;
                }
            costDisplay.innerHTML = `Total: $${totalCost}`
            if (totalCost === 0) {
                element1.classList.add("not-valid");
                element2.style.display = "block";
            } else {
                element1.classList.add("valid");
                element2.style.display = "none";
            }
        })
    }
}

// Listen for focus and blur on checkboxes when tabbed to in "activities" section

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
   
// Display alternate pay method if selected

const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


function displayAlternatePayment (arr) {
    for (let i=1; i<arr.length; i++) {
        payment.addEventListener('change', e => {
        if (e.target.value === "paypal") {
            paypal.style.display = "block";
            creditCard.style.display = "none";
            bitcoin.style.display = "none";
        }
        if (e.target.value === "bitcoin") {
            paypal.style.display = "none";
            creditCard.style.display = "none";
            bitcoin.style.display = "block";
        }
        if (e.target.value === "credit-card") {
            paypal.style.display = "none";
            creditCard.style.display = "block";
            bitcoin.style.display = "none";
        }
        })
    }
}

// Submit form and verify all required fields contain valid data

const submitButton = document.getElementsByTagName('BUTTON');
const form = document.getElementsByTagName("FORM");

function submitValidate (element, hint) {
        if (element.parentElement.className !== "valid") {
            element.parentElement.className = "not-valid";
            hint.style.display = "block";
        }
}

function submitForm (element) {
    element[0].addEventListener('submit', (e) => {
        submitValidate(fullName, nameHint);
        submitValidate(email, emailHint);
        if (payment.value === "credit-card") {
            submitValidate(ccNum, ccNumHint);
            submitValidate(zip, zipHint);
            submitValidate(cvv, cvvHint);
        }
        if (totalCost === 0) {
            activities.classList.add("not-valid");
            activitiesHint.style.display = "block";
        }
        if ((fullName.parentElement.className === "not-valid") || (email.parentElement.className === "not-valid") || (ccNum.parentElement.className === "not-valid") || (zip.parentElement.className === "not-valid") || (cvv.parentElement.className === "not-valid") || (totalCost === 0)) {
        e.preventDefault();
        } 
    })
}

loadForm(body);
hideotherJobRole(jobRoleOptions, otherJobRole);
displayShirtColors(shirtDesignOptions, shirtColorOptions, ShirtColorDiv);
CalculateTotalCost(activitiesActive, totalCost, activities, activitiesHint);
displayAlternatePayment(paymentMethods);
submitForm(form);
