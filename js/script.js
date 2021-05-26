// Focus on "name" input upon page load to prompt the user to enter info
const body = document.querySelector('body');
const fullName = document.getElementById('name');

function loadForm (element) {
    element.onload = fullName.focus();
    otherJobRole.style.display = "none";
    ShirtColorDiv.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "none";

}

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
           //let theme = arr2[i].dataset.theme;
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
let totalCost = 0;
const costDisplay = document.getElementById('activities-cost');

function CalculateTotalCost (arr) {
    for (let i=0; i<arr.length; i++) {
        activitiesActive[i].addEventListener('change', e => {
            if (e.target.checked) {
                totalCost += +e.target.dataset.cost;
            } else {
                totalCost -= +e.target.dataset.cost;
                }
            costDisplay.innerHTML = `Total: $${totalCost}`
        })
    }
}

// Show credit card payment by default and only display alternate pay method if selected

const payment = document.getElementById('payment');
const paymentMethods = payment.getElementsByTagName('OPTION');
const creditCard = document.getElementById('credit-card');
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



loadForm(body);
hideotherJobRole(jobRoleOptions, otherJobRole);
displayShirtColors(shirtDesignOptions, shirtColorOptions, ShirtColorDiv);
CalculateTotalCost(activitiesActive);
displayAlternatePayment(paymentMethods);

