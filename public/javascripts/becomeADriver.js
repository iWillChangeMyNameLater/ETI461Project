$("form").submit(function(StopDefault){
    StopDefault.preventDefault();
  });
var greeting = document.getElementById("getName");
var greetingMessage = sessionStorage.getItem("cusName");
var cusName = document.createTextNode("Welcome "+greetingMessage)
greeting.appendChild(cusName);
//var name1 = sessionStorage.getItem("cusName");
//var email =sessionStorage.getItem("cusEmail");
//var brand = document.getElementById("brand").value;
//var model = document.getElementById("model").value;
//var lp = document.getElementById("lp").value;
//var vin = document.getElementById("vin").value;
//var year= document.getElementById("year").value;
//var password =document.getElementById("password").value;
//var phone = document.getElementById("phone").value;
//var address =document.getElementById("address").value;
 document.getElementById("check").addEventListener("click",checkIfDriver)
 document.getElementById("Form").addEventListener("submit", becomeDriver);
 function becomeDriver(){
     console.log("this");
    var FormData ={name: sessionStorage.getItem("cusName"), email: sessionStorage.getItem("cusEmail"), brand: document.getElementById("brand").value, model: document.getElementById("model").value, lp: document.getElementById("lp").value, vin: document.getElementById("vin").value, year: document.getElementById("year").value, password: document.getElementById("password").value, phone: document.getElementById("phone").value, address: document.getElementById("address").value};
   console.log(FormData);
   $.ajax({
    method: 'post',
    url: '/drive',
    data: FormData,
    success: function(data) {
        if(data == true){
            $("#Form").hide();
            var list =document.getElementById("list");
            while(list.hasChildNodes()){
                list.removeChild(list.firstChild);
            }
            var message = document.createElement("li");
            message.innerText = "Your Application Has Been Submitted "
            document.getElementById("list").appendChild(message);

        }
        if(data==false){
            var message = document.createElement("li");
            message.innerText = "There Was An Error Please Try Again "
            document.getElementById("list").appendChild(message);
        }
        

    }
    });
    
 }
 
function checkIfDriver(){
email = {email: sessionStorage.getItem("cusEmail")};
    $.ajax({
        method: 'post',
        url: '/check',
        data: email,
        success: function(data) {
           if(data==true){
               $("#Form").show();
           }
           if (data==false){
            var list =document.getElementById("list");
            while(list.hasChildNodes()){
                list.removeChild(list.firstChild);
            }
            var message = document.createElement("li");
            message.innerText = "There was an error Please Try again"
            document.getElementById("list").appendChild(message);
           }
           if(data=="no"){
            var list =document.getElementById("list");
            while(list.hasChildNodes()){
                list.removeChild(list.firstChild);

            }
            var message = document.createElement("li");
            message.innerText = "You Have Already Applied to be A Driver"
            document.getElementById("list").appendChild(message);
           }
           


        }
     });
}
