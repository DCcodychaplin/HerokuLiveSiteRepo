// ctrl + shift + B to Transpile (watch)
"use strict";
(function()
{
    function AuthGuard(): void
    {
        let protectedRoutes = [
            "/contact-list",
            "/edit"
        ];
    
        if (protectedRoutes.indexOf(location.pathname) > -1)
        {        
            // if not logged in
            if (!sessionStorage.getItem("user"))
            {
                // change link to login
                location.href = "/login";
            }
        }
    }

    function DisplayHome(): void
    {
        console.log("Home Page");

        // redirects to about.html on button click
        $("#AboutUsButton").on("click", () => 
        {
            location.href = "/about";
        });
        
        // adds content to page
        $("main").append(`<p id="MainParagraph" class="mt-3">The is the main paragraph</p>`);
        $("main").append(`<article><p id="ArticleParagraph" class="mt-3">This is the article paragraph</p></article>`);

        // creates a contact and logs details to console
        let cody = new core.Contact("Cody", "12334567890", "cody@sdf.com");
        console.log(cody.toString());
    }

    function DisplayAboutPage(): void
    {
        console.log("About Us Page");
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
     * Adds a Contact Object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string)
    {
        // generates unique key and stores serialized contact in localStorage
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
            if (contact.serialize())
            {
                let key = contact.FullName.substring(0, 1) + Date.now();

                localStorage.setItem(key, contact.serialize());
            }
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

        // only displays button if logged in
        if (sessionStorage.getItem("user"))
        {
            $("#showContactListButton").removeAttr("style");
        }

        // gets references
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        // if subscribeCheckbox is checked, add contact to localStorage
        sendButton.addEventListener("click", function()
        {
            if (subscribeCheckbox.checked)
            {
                let fullName = document.forms[0].fullName.value as string;
                let contactNumber = document.forms[0].contactNumber.value as string;
                let emailAddress = document.forms[0].emailAddress.value as string;
                AddContact(fullName, contactNumber, emailAddress);
            }
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

    function DisplayEditPage()
    {
        ContactFormValidation();
    }

    function CheckLogin()
    {
        // if user is logged in
        if (sessionStorage.getItem("user"))
        {
            // update "login" link to "logout"
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);

            // on remove, clear (user) from session storage and redirect to login page
            $("#logout").on("click", function()
            {
                sessionStorage.clear();

                // swap "logout" link to "login"
                $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);

                location.href = "/login";
            });
        }
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
            case "edit":
                DisplayEditPage();
                break;
            case "add":
                DisplayEditPage();
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
