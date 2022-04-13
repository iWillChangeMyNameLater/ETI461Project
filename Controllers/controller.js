
var db = require("../models/model.js");
const { Client } = require('pg');
const { send } = require("express/lib/response");
const client = new Client({
  connectionString: "process.env.postgres://xeaqyuzavhaovm:5d96d65295fc40c74f7f0825677f921c773ec32dfb46aa839882279d32bb618a@ec2-54-173-77-184.compute-1.amazonaws.com:5432/dd648dlvbd9beb",
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
// *start login function 
exports.drivers=(req,res) =>{
  console.log(req.body);
var name1 = req.body.name;
var email =req.body.email;
var brand = req.body.brand;
var model = req.body.model;
var lp = req.body.lp;
var vin = req.body.vin;
var year= req.body.year;
var password =req.body.password;
var phone = req.body.phone;
var address =req.body.address;
console.log(brand+model+vin+lp+year);
var id = 0;
console.log("this happende")
client.query('select Car_id From Cars WHERE Driver_car_brand =$1 AND driver_car_model=$2 AND Driver_car_liscenseplate =$3 AND Driver_Car_vin_number= $4 AND Driver_car_year=$5;',[brand,model,lp,vin,year],(err,results)=>{
  if(err){
    res.send(false);
  }
  if(results.rows.length !==0){
    console.log(32);
    id=results.rows[0].Car_id;
    console.log(id);
    client.query('INSERT INTO Drivers(Driver_name,Driver_email,driver_password,Driver_phone,Driver_rating,Driver_address,Car_id) VALUES ($1,$2,$3,$4,$5,$6,$7)',[name1,email,password,phone,5,address,id],(err,results)=>{
      if(err){
        res.send(false);
      }
      else{
        res.send(true);
        console.log(41);
      }
    });
  }
  if(results.rows.length == 0){
    console.log(46);
    console.log(brand+model+vin+lp+year);
    client.query('INSERT INTO Cars(Driver_car_brand, driver_car_model, Driver_car_liscenseplate, Driver_Car_vin_number, Driver_car_year) VALUES($1,$2,$3,$4,$5);',[brand,model,lp,vin,year],(err,results)=>{
      if(err){
        console.log(49);
      console.log(err);
        res.send(false);
      }
      else{
        console.log(55);
        client.query('select Car_id From Cars WHERE Driver_car_brand =$1 AND driver_car_model=$2 AND Driver_car_liscenseplate =$3 AND Driver_Car_vin_number= $4 AND Driver_car_year=$5',[brand,model,lp,vin,year],(err,results)=>{
          if(err){
            console.log(56);
            console.log(err);
            res.send(false);
          }
          else{
            console.log(57);
            console.log(results.rows);
           id = results.rows[0].car_id;
           console.log(id);
           client.query('INSERT INTO Drivers(Driver_name,Driver_email,driver_password,Driver_phone,Driver_rating,Driver_address,Car_id) VALUES ($1,$2,$3,$4,$5,$6,$7)',[name1,email,password,phone,5,address,id],(err,results)=>{
            if(err){
              console.log(err);
              res.send(false);
            }
            else{
              console.log(65);
              res.send(true);
            }
          });
          }
        });
      }
    });
  }
});

}
exports.check=(req,res) =>{
  var email = req.body.email;
  console.log(email);
  client.query('select Driver_id From Drivers WHERE Driver_email =$1',[email],(err,results)=>{
    if(err){

      res.send(false)
    }
    else if(results.rows.length==0){
  
      res.send(true);
    }
    else if(results.rows.length !==0){
      res.send("no");
    }
  });
}
exports.login2=(req,res) =>{
    var password=req.body.password;
    var username=req.body.username;
    client.query('select Customer_name, Customer_id, Customer_email From Customers WHERE Customer_Password =$1 AND Customer_email= $2',[password, username],(err,results)=>{
       if (err) {
         res.send(false);
       }
       if(results.rows.length == 0) {
           res.send(false)
           console.log("2");
       }
       else {
          res.send(results.rows);
         
       }
        
    });
    
}
exports.getRides=(req,res)=>{
 cusID = req.body.id
 client.query('SELECT * FROM Rides WHERE Customer_id =$1',[cusID],(err,results)=>{
  if(err){

    res.send(false)
  }
  else if(results.rows.length==0){

    res.send("none");
  }
  else if(results.rows.length !==0){
    res.send(results.rows);
  }
});

}
exports.confirmRides=(req,res)=>{
  var ride =req.body.ride;
  var cus=req.body.cus;
  var pl = req.body.pLocation;
  var dl = req.body.dLocation;
  var miles = req.body.miles;
  var cost= miles*2;
  client.query('SELECT * FROM Drivers WHERE Driver_id =$1',[ride],(err,results)=>{
    if(err){

      res.send(false)
    }
    else if(results.rows.length==0){

      res.send(false);
    }
    else if(results.rows.length !==0){
      var car = results.rows[0].car_id;
      client.query('SELECT Payment_ID FROM Customers WHERE Customer_id = $1;',[cus],(err,results)=>{
        if(err){
          console.log('53');
          res.send(false)
        }
        else if(results.rows.length==0){
          console.log('57');
          res.send(false);

        }
        else if(results.rows.length !==0){
          var pay= results.rows[0].payment_id;
          client.query('INSERT INTO Rides (Ride_Pick_up_location, Ride_drop_off_location,Ride_distance,Ride_cost,Customer_id,Driver_id,Payment_id,Car_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8);',[pl,dl,miles,cost,cus,ride, pay,cus],(err,results)=>{
            if(err){
              console.log('65');
              res.send(false)
            }
            else{
              res.send(true);
            }
          });
        }
      });
    }

  });
}

exports.rides=(req,res)=>{
  city= req.body.city;
  console.log(city);
  client.query('SELECT * FROM Drivers WHERE Driver_address LIKE $1',['%'+city+'%'],(err,results)=>{
if(err){
  res.send(false)

}
else if(results.rows.length==0){
  res.send(false);
}
else if(results.rows.length !==0){
  res.send(results.rows);
}

  });
}

exports.signUp1=(req,res)=>{
  var cardName=req.body.cardName;
  var csv=req.body.csv;
  var card = req.body.card;
  var name=req.body.name;
  var email =req.body.email;
  var password= req.body.password;
  var adress = req.body.address;
  var phone = req.body.phone;
  var rate = 5;
  var id = 0;
console.log(card);
  client.query('select * From Customers WHERE Customer_email = $1',[email],(err,results)=>{
    if (err) {
      console.log("this happened123");
      res.send("false");
      
    }
    else if(results.rows.length !== 0){
      res.send("found")

    }
    else if (results.rows.length==0){
      client.query('SELECT Payment_ID FROM Payment_Methods WHERE Customer_card_number = $1 AND Customer_name_on_card= $2 AND Customer_csv = $3;',[card,cardName,csv],(err,results)=>{
        if (err){
          console.log("this happened134");
          res.send(false);
         
        }
        else if(results.rows.length !==0) {
        id= results.rows[0].payment_id;
        client.query('INSERT INTO Customers (Customer_email, Customer_Password,Customer_name,customer_address,customer_phone,Customer_rating,Payment_id) VALUES($1,$2,$3,$4,$5,$6,$7)',[email,password,name,adress,phone,rate,id],(err,results)=>{
          if (err){
            console.log("this happened141");
            res.send(false);
           
            
          }
          else {
            client.query('select Customer_name, Customer_id, Customer_email From Customers WHERE Customer_Password =$1 AND Customer_email= $2',[password, email],(err,results)=>{
                if (err){
                  res.send(false)
                }
                else{
                  res.send(results.rows)
                }
            });
          }
        });
        }
        else if (results.rows.length ==0){
          client.query('INSERT INTO Payment_Methods(Customer_card_number,Customer_name_on_card,Customer_csv) VALUES($1,$2,$3)',[card,name,csv],(err,results)=>{
            if (err){
              console.log("this happened141");
              res.send(false);
             
            }
            else {
              client.query(' SELECT Payment_ID FROM Payment_Methods WHERE Customer_card_number=$1 AND Customer_name_on_card= $2 AND Customer_csv =$3',[card,name,csv],(err,results)=>{
                if (err){
                  res.send(false);
                  
                }
                else{
                  id= results.rows[0].payment_id;
                  client.query('INSERT INTO Customers (Customer_email, Customer_Password,Customer_name,customer_address,customer_phone,Customer_rating,Payment_id) VALUES($1,$2,$3,$4,$5,$6,$7)',[email,password,name,adress,phone,rate,id],(err,results)=>{
                    if (err){
                      res.send(false);
                      
                    }
                    else {
                      client.query('select Customer_name, Customer_id, Customer_email From Customers WHERE Customer_Password =$1 AND Customer_email= $2',[password, email],(err,results)=>{
                          if (err){
                            res.send(false)
                          }
                          else{
                            res.send(results.rows)
                          }
                      });
                    }
                  });

                }

            });

            }
          });
        }
      });
    }

  }); 
}


/*
//correct code starts here
exports.login=(req,res) =>{
    console.log("this login function was run")
   var chill ="chill";
 var password=req.body.password;

  //JSON.stringify(password);
   // JSON.parse(password);
   console.log(password);
    //res.send(password);
   //res.send(password);
    client.query('select Customer_name From Customers WHERE Customer_Password =$1',[password],(err,results)=>{
       // client.query('select * FROM Payment_methods;', (err, res) => {
       if (err) throw err;
        res.send(results.rows);  
    });
    
}
*/ 
