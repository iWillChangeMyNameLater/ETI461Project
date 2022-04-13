$("form").submit(function(StopDefault){
    StopDefault.preventDefault();
  });
var greeting = document.getElementById("getName");
var greetingMessage = sessionStorage.getItem("cusName");
var cusName = document.createTextNode("Welcome "+greetingMessage)
greeting.appendChild(cusName);
document.getElementById("button").addEventListener("click", getRides);
document.getElementById("ride").addEventListener("submit", confirmRides);
function getRides(){
    var city1 = document.getElementById("city").value;
    city = {city: city1};
    console.log(city);
    $.ajax({
        method: 'post',
        url: '/rides',
        data: city,
        success: function(data) { 
            //document.getElementById(sure).style.display = "none";
            $('#ride').hide();
            //$('#button2').hide();
           // $('#p').hide();
            if(data !== false){
            console.log(data);
            var driversOld=document.getElementById("drivers");
            var select =document.getElementById("select");
            while(driversOld.hasChildNodes()){
                driversOld.removeChild(driversOld.firstChild);
            }
            while(select.hasChildNodes()){
                select.removeChild(select.firstChild);
            }
            for (let i = 0; i < data.length; i++) {
                var driver = document.createElement("li");
                var name = data[i].driver_name;
                //var phone= driver.driver_phone;
                var rate = data[i].driver_rating;
            driver.innerText = "Driver Name: "+name+" Driver Rating "+rate;
            driver.value = data[i].driver_name;
            driver.id = i;
            document.getElementById("drivers").appendChild(driver);
              }
              for (let i = 0; i < data.length; i++) {
                $('#ride').show();
                //$('#button2').show();
                //$('#p').show();
               // document.getElementById(sure).style.display = "block";
                var option = document.createElement("option");
                var name = data[i].driver_name;
                //var phone= driver.driver_phone;
                var rate = data[i].driver_rating;
                option.innerText = data[i].driver_name;
                option.value = data[i].driver_id;
                option.id = i;
            document.getElementById("select").appendChild(option);
              }
              
            
        }
        else {
            var driversOld=document.getElementById("drivers");
            var select =document.getElementById("select");
            while(driversOld.hasChildNodes()){
                driversOld.removeChild(driversOld.firstChild);
            }
            while(select.hasChildNodes()){
                select.removeChild(select.firstChild);
            }
           
            var driver = document.createElement("li");
            driver.innerText = "no drivers match that criteria"
            document.getElementById("drivers").appendChild(driver);

        }
    }
    

   });
}
function confirmRides(){
    var pLocation = document.getElementById("pLocation").value;
    var dLocation = document.getElementById("dLocation").value;
    var miles= document.getElementById("miles").value;
    var cus = sessionStorage.getItem("cusID");
    var rideID= document.getElementById("select").value;
    var ride ={ride: rideID, cus: cus, pLocation: pLocation, dLocation: dLocation, miles:miles };
    $.ajax({
        method: 'post',
        url: '/confirmRides',
        data: ride,
        success: function(data) { 
            if(data==true){
            $('#ride').hide();
            var confirm = document.createElement("p")
            confirm.innerText = "Your Ride has been confirmed";
            confirm.id= "confirm";
            document.body.appendChild(confirm);
    
            }
            if(data==false){
                var confirm = document.createElement("p")
            confirm.innerText = "There was an error please try again";
            confirm.id= "confirm";
            document.body.appendChild(confirm);
            }

        }
    });
}
