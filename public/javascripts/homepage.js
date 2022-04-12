var greeting = document.getElementById("getName");
var greetingMessage = sessionStorage.getItem("cusName");
var cusName = document.createTextNode("Welcome "+greetingMessage)
greeting.appendChild(cusName);