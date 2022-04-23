"use strict";
(function () {
    function DisplayHome() {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => {
            location.href = "/about";
        });
    }
    function DisplayAboutPage() {
        console.log("About Us Page");
        $("#ProjectButton").on("click", () => {
            location.href = "/projects";
        });
    }
    function DisplayProjectsPage() {
        console.log("Projects Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function ValidateField(inputFieldID, regex, errorMessage) {
        let messageArea = $("#messageArea").hide();
        $("#" + inputFieldID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regex.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text(errorMessage);
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s|,|-]([A-Z][a-z]{1,}))*$/, "Please enter a valid name");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid contact number");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        sendButton.addEventListener("click", function (event) {
            event.preventDefault();
            let fullName = document.forms[0].fullName.value;
            let contactNumber = document.forms[0].contactNumber.value;
            let emailAddress = document.forms[0].emailAddress.value;
            let message = document.forms[0].message.value;
            console.log(`Full Name: ${fullName}\nContact Number: ${contactNumber}\nEmail Address: ${emailAddress}\nMessage: ${message}`);
            setTimeout(() => {
                location.href = "/home";
            }, 2000);
        });
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayUpdatePage() {
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Login page");
    }
    function DisplayRegisterPage() {
        console.log("Register page");
    }
    function Display404() {
        console.log("Error: 404");
    }
    function Start() {
        console.log("App Started!");
        let pageId = $("body")[0].getAttribute("id");
        switch (pageId) {
            case "home":
                DisplayHome();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "projects":
                DisplayProjectsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "update":
                DisplayUpdatePage();
                break;
            case "add":
                DisplayUpdatePage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map