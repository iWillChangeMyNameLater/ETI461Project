$("form").submit(function(StopDefault){
  StopDefault.preventDefault();
});
document.getElementById("Form").addEventListener("submit", cusInfo);
function cusInfo(){
    //preventDefault();
    //window.location.replace("/SignUp.html");
    formData= {card: document.getElementById('cardNum').value, csv: document.getElementById('csv').value,cardName: document.getElementById('cardName').value, email: document.getElementById('email').value, password: document.getElementById('password').value, name: document.getElementById('name').value, address: document.getElementById('address').value, phone: document.getElementById('phone').value};
    $.ajax({
        method: 'post',
       url: '/cusSignUp',
       data: formData,
        success: function(data) {
          console.log(data)
          if (Array.isArray(data)== true){
          sessionStorage.setItem("cusName", data[0].customer_name);
           sessionStorage.setItem("cusID", data[0].customer_id);
           sessionStorage.setItem("cusEmail", data[0].customer_email);
            console.log("all right");
           window.location.replace("/homepage.html")
           
          }
          if(data =="found"){
            var error = document.createElement("p")
            error.innerText = "This email is in use";
            document.body.appendChild(error);
            console.log("email");
          }
          if(data ==false){
            var error = document.getElementById("error");
            var errorMessage = document.createTextNode("There Was An Error Please Try Again");
            error.appendChild(errorMessage);
          }
        }
        /*
          if(data == true){
            window.location.replace("/homepage.html");
          }
          else{
            var error = document.createElement("p")
            error.innerText = "There was an eror please try again";
            document.body.appendChild(error);
          }
        }*/
   });
   
   
} 