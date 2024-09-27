//
// Contact Form Js
//


function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var comments = document.forms["myForm"]["comments"].value;
    
    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById("error-msg").innerHTML = "";

    // Validate inputs
    if (name === "" || name === null) {
        showError('Please enter your name');
        return false;
    }
    if (email === "" || email === null) {
        showError('Please enter your email');
        return false;
    }
    if (comments === "" || comments === null) {
        showError('Please enter your message');
        return false;
    }

    // Send AJAX request to PHP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("simple-msg").innerHTML = this.responseText;
            document.forms["myForm"]["name"].value = "";
            document.forms["myForm"]["email"].value = "";
            document.forms["myForm"]["comments"].value = "";
        }
    };
    
    xhttp.open("POST", "php/contact.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name + "&email=" + email + "&comments=" + comments);
    return false;  // Prevent form submission
}

function showError(message) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger'>" + message + "</div>";
    fadeIn();
}

function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.5;
            fade.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 200);
}
