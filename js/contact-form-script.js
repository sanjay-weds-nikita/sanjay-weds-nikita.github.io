$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    const name = $("#name").val();
    const email = $("#email").val();
    const guest = $("#guest").find(":selected").text();
    const rsvp = $("#rsvp").find(":selected").text();
    const message = $("#message").val();

    const subject = name + " says " + rsvp;
    const email_message = email + "\nTotal Guests: " + guest + "\n" + message;

    const jsonData = {
        "toEmails": [
            "example@example.com"
        ],
        "subject": subject,
        "message": email_message
    };

    $.ajax({
        type: "POST",
        url: "https://dl6gsolzfd.execute-api.ap-south-1.amazonaws.com/Prod/send",
        data: JSON.stringify(jsonData),
        headers: {
            'X-Api-Key': 'rjp5GUfhhSOgEQdZ1DkD4SzzTEPEYwz40iHxMETj'
        },
        contentType: "application/json; charset=utf-8",
        success: function (text) {
            console.log(`Response: ${text}`);
            if (text === "Planner Notified") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
    $('#submit').hide();
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}