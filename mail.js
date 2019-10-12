var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
    host: "smtp.mxhichina.com",
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: "support@getitfree.shop",
        pass: "Getitfree!"
    }
})

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "support@getitfree.shop", // 发件地址
    to: "richole.yu@qq.com", // 收件列表
    subject: "Test", // 标题
    html: "<b>Hello world ?</b>" // html 内容
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error)
    }
    console.log("Message sent: " + info.response)
})
