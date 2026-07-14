const baseTemplate = require("./baseTemplate");

const adminNotificationTemplate = (member) => {

return baseTemplate(

"New Registration",

`

<h2>New Vision Partner Registration</h2>

<table>

<tr>

<td><strong>Name</strong></td>

<td>${member.given_name} ${member.surname}</td>

</tr>

<tr>

<td><strong>Email</strong></td>

<td>${member.email}</td>

</tr>

<tr>

<td><strong>Phone</strong></td>

<td>${member.mobile}</td>

</tr>

<tr>

<td><strong>Membership Number</strong></td>

<td>${member.membership_number}</td>

</tr>

<tr>

<td><strong>Membership Type</strong></td>

<td>${member.membership_type}</td>

</tr>

<tr>

<td><strong>Institution</strong></td>

<td>${member.institution}</td>

</tr>

<tr>

<td><strong>Province</strong></td>

<td>${member.home_province}</td>

</tr>

<tr>

<td><strong>Graduation Year</strong></td>

<td>${member.graduation_year}</td>

</tr>

</table>

`

);

};

module.exports = adminNotificationTemplate;
