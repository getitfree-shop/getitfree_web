var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
    host: "smtp.mxhichina.com",
    port: 465,
    secureConnection: true,
    auth: {
        user: "support@getitfree.shop",
        pass: "Getitfree!"
    }
})

var mailOptions = {
    from: "support@getitfree.shop",
    to: "richole.yu@gmail.com",
    subject: "Test",
    html: `
        <h2>We released some new products quickly and see it</h2>
        <p>Click <a href="https://getitfree.shop">here</a> to get more information!</p>
    `
}

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error)
    }
    console.log("Message sent: " + info.response)
})
