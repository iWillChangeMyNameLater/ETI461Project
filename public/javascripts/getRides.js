document.getElementById("getRides").addEventListener("click", veiwRides)
var greeting = document.getElementById("getName");
var greetingMessage = sessionStorage.getItem("cusName");
var cusName = document.createTextNode("Welcome "+greetingMessage)
greeting.appendChild(cusName);
function veiwRides(){
    var getCusID = sessionStorage.getItem("cusID");
    var cusID ={id: getCusID};
    $.ajax({
        method: 'post',
        url: '/getRides',
        data: cusID,
        success: function(data) { 
            console.log(data);
           if(Array.isArray(data)== true){
            var rideList =document.getElementById("rideList");
            while(rideList.hasChildNodes()){
                rideList.removeChild(rideList.firstChild);
            }
            for (let i = 0; i < data.length; i++) {
                var ride = document.createElement("li");
                var pl = data[i].ride_pick_up_location;
                var dl =data[i].ride_drop_off_location;
                var cost = data[i].ride_cost;
                var distance = data[i].ride_distance
                //var phone= driver.driver_phone;
            ride.innerText = "Pick-Up Location: "+pl+"\n"+"Drop-Off Location: "+dl+"\n"+"Cost: " +cost+"\n"+"Distance: "+distance +" miles";
            
            document.getElementById("rideList").appendChild(ride);
              }

           }
           if (data == false){
            var rideList =document.getElementById("rideList");
            var ride = document.createElement("li");
            ride.innerText = "There Was An Error Please Try Again"
            document.getElementById("rideList").appendChild(ride);
           }
           if(data == "none"){
            var rideList =document.getElementById("rideList");
            var ride = document.createElement("li");
            ride.innerText = "You have No Rides To Display"
            document.getElementById("rideList").appendChild(ride);
           }

        }
    });
}