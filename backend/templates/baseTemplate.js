const baseTemplate = (title, content) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body{
    margin:0;
    padding:0;
    background:#f4f6f8;
    font-family:Arial,Helvetica,sans-serif;
}

.wrapper{
    width:100%;
    padding:40px 0;
}

.container{
    max-width:700px;
    margin:auto;
    background:white;
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 2px 12px rgba(0,0,0,.08);
}

.header{
    background:#0F4C81;
    color:white;
    padding:35px;
    text-align:center;
}

.header h1{
    margin:0;
    font-size:30px;
}

.content{
    padding:35px;
    color:#333;
    line-height:1.7;
}

.footer{
    background:#f5f5f5;
    padding:25px;
    text-align:center;
    font-size:13px;
    color:#666;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

td{
    border:1px solid #ddd;
    padding:10px;
}

strong{
    color:#0F4C81;
}

.button{
    display:inline-block;
    margin-top:25px;
    background:#0F4C81;
    color:white !important;
    text-decoration:none;
    padding:14px 28px;
    border-radius:5px;
}

</style>

</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">

<h1>TSCF Vision Partners</h1>

<p>${title}</p>

</div>

<div class="content">

${content}

</div>

<div class="footer">

<p><strong>TSCF Vision Partners</strong></p>

<p>Supporting Student Ministry Across Papua New Guinea</p>

<p>
https://tscfvp.com
</p>

<p>
© ${new Date().getFullYear()} TSCF Vision Partners
</p>

</div>

</div>

</div>

</body>

</html>
`;
};

module.exports = baseTemplate;
