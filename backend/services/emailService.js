const transporter = require("../config/mail");

const welcomeTemplate = require("../templates/welcomeTemplate");
const adminTemplate = require("../templates/adminNotificationTemplate");

async function sendWelcomeEmail(member) {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: member.email,

        subject: "Welcome to TSCF Vision Partners",

        html: welcomeTemplate(member)

    });

}

async function sendAdminNotification(member) {

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to: process.env.ADMIN_EMAIL,

        subject: `New Registration - ${member.given_name} ${member.surname}`,

        html: adminTemplate(member)

    });

}

module.exports = {

    sendWelcomeEmail,

    sendAdminNotification

};
