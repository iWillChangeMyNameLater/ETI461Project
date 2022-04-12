//const { database } = require("pg/lib/defaults");
$("#login").submit(function(StopDefault){
  StopDefault.preventDefault();
});
//alert("hello");
document.getElementById('submit').addEventListener("click", userLogin);
function userLogin(){
    console.log("this function was called" );
  formData= {password: document.getElementById('Password').value, username: document.getElementById('username').value};
   
    console.log(formData);
    $.ajax({
        method: 'post',
       url: '/login',
       data: formData,
 
        success: function(data) {
          console.log(data);
          if (data !== false){
           sessionStorage.setItem("cusName", data[0].customer_name);
        sessionStorage.setItem("cusID", data[0].customer_id);
        sessionStorage.setItem("cusEmail", data[0].customer_email);

           window.location.replace("/homepage.html")
           
          }
          else {
            var error = document.createElement("p")
            error.innerText = "Login information incorrect";
            document.body.appendChild(error);
          }
        }
   });
   
}

   /*h
    console.log(formData);
    $.ajax({
        method: 'post',
       url: '/login',
       data: formData,
       //contentType: "application/json", 
        success: function(data) {
          var customer = data[0].customer_name;
          console.log("this hapened")
          console.log(customer);
          //JSON.parse(customer);
          JSON.stringify(customer);
          //JSON.parse(data);
          

          alert("customer Name is" +" "+customer);
        }
   });
} */