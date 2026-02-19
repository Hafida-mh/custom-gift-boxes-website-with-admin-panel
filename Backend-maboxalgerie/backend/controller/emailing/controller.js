const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //host: "smtp.gmail.com",
  //port: 587,
  service: "gmail",
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'mechkour.hafida16@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = (req, res) => {
  const subject = req.body.object;
  const msg = req.body.message;
  const emails = req.body.emails;
 // console.log(emails)
  //    console.log(typeof emails[0])
  // send mail with defined transport object
  for (let i = 0; i <= emails.length - 1; i++) {
    const info = transporter.sendMail({
      from: 'Princesse mechkour.hafida16@gmail.com', // sender address
      to: emails[i], // list of receivers
      subject: `${subject}`,
      text: `${msg}`// plain text body
    })
  }
  return res.json({
    message: "Email envoyé avec succés !"
  })
}

const sendEmailConfirmation = (req, res) => {
  const email = req.body.email;
 // console.log(emails)
  //    console.log(typeof emails[0])
  // send mail with defined transport object
    const info = transporter.sendMail({
      from: 'Bébé cool mechkour.hafida16@gmail.com', // sender address
      to: email, // list of receivers
      subject: `Confirmation de la commande`,
      text: `Votre commande a bien été envoyée ! Vous serez contacté
      par notre équipe dans un moment`// plain text body
    })

  return res.json({
    message: "Email envoyé avec succés !"
  })
}


module.exports = {
  sendEmail,
  sendEmailConfirmation 
}
