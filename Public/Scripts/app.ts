// ctrl + shift + B to Transpile (watch)
"use strict";
(function()
{
    function DisplayHome(): void
    {
        console.log("Home Page");

        // redirects to about.ejs on button click
        $("#AboutUsButton").on("click", () => 
        {
            location.href = "/about";
        });
    }

    function DisplayAboutPage(): void
    {
        console.log("About Us Page");

        $("#ProjectButton").on("click", () => 
        {
            location.href = "/projects";
        });
    }

    function DisplayProjectsPage(): void
    {
        console.log("Projects Page");
    }

    function DisplayServicesPage(): void
    {
        console.log("Services Page");
    }

    /**
     * Validates an input text field in the form and displays an error in the message area
     *
     * @param {string} inputFieldID
     * @param {RegExp} regex
     * @param {string} errorMessage
     */
    function ValidateField(inputFieldID: string, regex: RegExp, errorMessage: string)
    {
        let messageArea = $("#messageArea").hide();
        
        $("#" + inputFieldID).on("blur", function()
        {
            let inputFieldText: string = $(this).val() as string;
            if (!regex.test(inputFieldText))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text(errorMessage);
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        // validate using full name regex
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s|,|-]([A-Z][a-z]{1,}))*$/,
        "Please enter a valid name");
    
        // validate using phone number regex
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,
            "Please enter a valid contact number");

        // validate using email address regex
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function()
        {
            location.href = "/contact-list";
        });

        ContactFormValidation(); // validate input

        let sendButton = document.getElementById("sendButton") as HTMLElement;

        // print contact and message to console
        sendButton.addEventListener("click", function(event)
        {
            event.preventDefault();
            let fullName = document.forms[0].fullName.value as string;
            let contactNumber = document.forms[0].contactNumber.value as string;
            let emailAddress = document.forms[0].emailAddress.value as string;
            let message = document.forms[0].message.value as string;

            console.log(`Full Name: ${fullName}\nContact Number: ${contactNumber}\nEmail Address: ${emailAddress}\nMessage: ${message}`)
            
            // after 3 seconds, user is redirected to home page
            setTimeout(() =>
            {
                location.href = "/home";
            }, 2000);
        });
    }
    
    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        $("a.delete").on("click", function(event)
        {
            if (!confirm("Are you sure?"))
            {   
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }

    function DisplayUpdatePage()
    {
        ContactFormValidation();
    }

    function DisplayLoginPage()
    {
        console.log("Login page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register page");
    }

    function Display404()
    {
        console.log("Error: 404");
    }

    function Start()
    {
        console.log("App Started!");

        let pageId = $("body")[0].getAttribute("id");

        switch(pageId)
        {
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

    // adds Start function as event listener to Load event
    window.addEventListener("load", Start);

})();
