function Register() {
  // Open the download route in a new tab
  window.alert("Registered, Proceed logging in :)");
}

function Login() {
  // Open the download route in a new tab
  if(locals.userEmail)
    window.alert("Logged in, Thanks! Now pls close the box and proceed :)");
  else
    window.alert("Not Logged in, Thanks! Now pls close the box and proceed :)");
}