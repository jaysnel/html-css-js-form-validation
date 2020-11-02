let currentcountry = document.getElementById("CountryCode");
let successmessage = document.getElementById("successmessage");
let errormessage = document.getElementById("errormessage");
let submit = document.getElementById("submitform");

//Checking State/Region/Province on load
countryStateRegionFieldSwitch();

//Events
currentcountry.onchange = function() {
    countryStateRegionFieldSwitch();
}
submit.onclick = () => {
    let formvalid = formValidation();

    if(formvalid) return formsuccesss();
    formerror();
}

//Validations
function formValidation() {
    let valid = true;
    //Looking for .input-field-shown here because it gets a little tricky looking for just input
    //for validation due to some of the fields are technically hidden based on country option
    let inputs = document.querySelectorAll(".form-field-section .input-field-shown");
    let dropdowns = document.querySelectorAll(".form-field-section select");

    
    dropdowns.forEach(el => {
        el.classList.add("input-field-success");
        if(el.value == "" || el.value == null) {
            el.classList.add("input-field-error");
            el.classList.remove("input-field-success");
            valid = false;
        }
    })

    inputs.forEach(el => {
        el.classList.add("input-field-success");
            if(el.value == "" || el.value == null) {
                el.classList.add("input-field-error");
                el.classList.remove("input-field-success");
                valid = false;
            }
    })
    return valid;
}

function formsuccesss() {
    successmessage.innerHTML = "Form validation is a success.";
    errormessage.innerHTML = "";
}

function formerror() {
    errormessage.innerHTML = "Please review form.";
    successmessage.innerHTML = "";
}

//Some trickery needs to be done here since I am showing and hiding
//different fields based on country selected so...just bare with me
function countryStateRegionFieldSwitch() {
    let currentselectedcountry = document.getElementById("CountryCode");

    //Default showing of State/Region/Province Sections
    let provinceSection = document.getElementById("ProvinceSection");
    let stateSection = document.getElementById("StateSection");
    let stateregionSection = document.getElementById("StateRegionSection");

    provinceSection.style.display = "none";
    stateregionSection.style.display = "none";
    stateSection.style.display = "none";

    //Default showing of State/Region/Province Field
    let province = document.getElementById("Province");
    let state = document.getElementById("State");
    let stateregion = document.getElementById("StateRegion");

    province.classList.add("input-field-hidden");
    stateregion.classList.add("input-field-hidden");
    state.classList.add("input-field-hidden");
    
    province.classList.remove("input-field-shown");
    stateregion.classList.remove("input-field-shown");
    state.classList.remove("input-field-shown");

    //Getting to the meat of it finally
    if(currentselectedcountry.value === "USA") {
        stateSection.style.display = "flex";

        state.classList.add("input-field-shown");
        state.classList.remove("input-field-hidden");
    }
    if(currentselectedcountry.value === "CAN") {
        provinceSection.style.display = "flex";

        province.classList.add("input-field-shown");
        province.classList.remove("input-field-hidden");
    }
    if(currentselectedcountry.value != "USA" && currentselectedcountry.value != "CAN") {
        stateregionSection.style.display = "flex";

        stateregion.classList.add("input-field-shown");
        stateregion.classList.remove("input-field-hidden");
    }
    if(currentselectedcountry.value === "" || currentselectedcountry.value === null) {
        stateSection.style.display = "flex";

        state.classList.add("input-field-shown");
        state.classList.classList.remove("input-field-hidden");
    }
}