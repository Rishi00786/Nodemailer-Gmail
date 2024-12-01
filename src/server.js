const express = require('express')
const { sendEmail } = require('./email')

const app = express()

const port = 3000;

app.use(express.json()); 

app.get('/',(req , res) => {
    res.send('Welcome to the Email Server!')
})

app.post('/send-email', async (req , res) => {
    try { 
        await sendEmail(req, res);
        // res.send('Email sent successfully!')
    } catch (err) {
        res.status(500).send('Error sending email')
    }
})

app.listen(port, () => {
    console.log(`Mail server listening at http://localhost:${port}`);
});