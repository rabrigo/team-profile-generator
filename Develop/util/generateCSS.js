const Newhtml = require("./generateHtml.js");
console.log(Newhtml);
fs.writeFile('../../index.html', Newhtml, (err) =>
err ? console.error(err) : console.log('Success!'));