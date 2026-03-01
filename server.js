const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 9090;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route for main event page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'event.html'));
});

// Route for full stack event info
app.get('/full', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'full.html'));
});

// Route for IoT event info
app.get('/iot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'iot.html'));
});

// Route for full stack registration page
app.get('/register1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register1.html'));
});

// Route for IoT registration page
app.get('/register2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register2.html'));
});

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
    port: 587,
    secure:false,
    
    auth: {
      user: 'prachi.joshi0629@gmail.com',         // Your email
      pass: 'dpbp ugkm adrk efvu'             // App password (not your main email password)
    }
  });


// POST endpoint for Full Stack registration
app.post('/register1', (req, res) => {
  const { fullName, collegeName, collegeId, phoneNo, email } = req.body;

  const mailOptions = {
    from: 'prachi.joshi0629@gmail.com',
    to: email,
    subject: 'Full Stack Web Development Event Registration Confirmation Mail!',
    text: `Hi ${fullName},

Thank you for registering.
Congrats your Full Stack Web Development event slot registration is confirmed!!!

Your Details:
College Name: ${collegeName}
College ID: ${collegeId}
Phone No.: ${phoneNo}

We look forward to see you soon!

Regards,
Event Team.`
  };

  transporter.sendMail(mailOptions,(error,info) =>{
    if(error){
      console.log("error in sending email:",email);
       res.send("Registration failed");
    }
    else{
      console.log("email sent:",info.response);
      return res.send("Registration is successfull. Confirmation email is sent!");
    }
  });
});


// POST endpoint for IoT registration
app.post('/register2', (req, res) => {
  const { fullName, collegeName, collegeId, phoneNo, email } = req.body;

   const mailOptions = {
    from: 'prachi.joshi0629@gmail.com',
    to: email,
    subject: 'IoT Workshop Event Registration Confirmation',
    text: `Hi ${fullName},

Thank you for registering.
Congrats your IoT Workshop event slot registration is confirmed!!!

Your Details:
College Name: ${collegeName}
College ID: ${collegeId}
Phone No.: ${phoneNo}

We look forward to see you soon!

Regards,
Event Team.`
  };

  transporter.sendMail(mailOptions,(error,info) =>{
    if(error){
      console.log("error in sending email:",email);
      return res.send("Registration failed");
    }
    else{
      console.log("email sent:",info.response);
      return res.send("Registration is successfull. Confirmation email is sent!");
    }
  });
  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
