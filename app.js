const express = require("express");
const bp = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
    console.log("File send successful");
})

app.post("/",(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailaddr;
    const data = {
        members:[
            {
                email_address :email,
                status:"subscribed",
                merger_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]

    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/b4d4fafb3d";

    const options = {
        method:"POST",
        auth:"aditya21:9d5d4869781a1156ca58c092318607e3-us21"
    }

    const request = https.request(url,options,(res1)=>{
            res1.on("data",(data)=>{
                console.log(JSON.parse(data));
                if(res1.statusCode == 200){
                    res.sendFile(__dirname + "/success.html");
                }
                else{
                    res.sendFile(__dirname + "/failure.html");
                }
            })
    });

    request.write(jsonData);
    request.end();  
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(8080,()=>{
    console.log("Listening on 8080");
})




// API Key
// 9d5d4869781a1156ca58c092318607e3-us21

// list id
// b4d4fafb3d