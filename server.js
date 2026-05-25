require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



// Gmail connection

const transporter =
nodemailer.createTransport({

service: "gmail",

auth: {

user:
process.env.EMAIL_USER,

pass:
process.env.EMAIL_PASS

}

});




// Route

app.post(

"/send-email",

async (req,res)=>{


const {

name,
phone,
email,
message

}
=
req.body;



try{


await transporter.sendMail({


from:
process.env.EMAIL_USER,


to:
process.env.EMAIL_USER,


subject:
"New Contact Form Message",


html:

`

<h2>
New Message
</h2>


<p>

<b>Name:</b>

${name}

</p>



<p>

<b>Phone:</b>

${phone}

</p>



<p>

<b>Email:</b>

${email}

</p>



<p>

<b>Message:</b>

${message}

</p>

`

});



res.json({

success:true

});


}


catch(error){


console.log(error);


res.json({

success:false

});


}


});




app.listen(

5000,

()=>{

console.log(

"Server running on port 5000"

);

});