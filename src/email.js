const nodemailer = require("nodemailer");

const Mailgen = require('mailgen');

const { EMAIL , PASSWORD } =  require('../env')

const config = {
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
}

const transporter = nodemailer.createTransport(config)

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link : 'https://mailgen.js/'
    }
})

let response = {
    body: {
        name : "Rishi",
        intro: "Your bill has arrived!",
        table : {
            data : [
                {
                    item : "Nodemailer Stack Book",
                    description: "A Backend application",
                    price : "$10.99",
                }
            ]
        },
        outro: "Looking forward to do more business"
    }
}

const sendEmail = async (req , res) => {

    const { userEmail } = req.body;

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })   
}


module.exports = { sendEmail }