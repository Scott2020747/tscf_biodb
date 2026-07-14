const baseTemplate = require("./baseTemplate");

const welcomeTemplate = (member) => {

return baseTemplate(

"Welcome",

`

<h2>Dear ${member.given_name},</h2>

<p>

Thank you for registering with
<strong>TSCF Vision Partners.</strong>

</p>

<p>

Your registration has been successfully received.

</p>

<table>

<tr>

<td><strong>Membership Number</strong></td>

<td>${member.membership_number}</td>

</tr>

<tr>

<td><strong>Membership Type</strong></td>

<td>${member.membership_type}</td>

</tr>

<tr>

<td><strong>Email</strong></td>

<td>${member.email}</td>

</tr>

<tr>

<td><strong>Institution</strong></td>

<td>${member.institution}</td>

</tr>

</table>

<p>

Our administrators will review your application shortly.

</p>

<p>

Thank you for partnering with us to strengthen student ministry throughout Papua New Guinea.

</p>

<a
class="button"
href="https://tscfvp.com">

Visit TSCF Vision Partners

</a>

`

);

};

module.exports = welcomeTemplate;
