const fs = require('fs');
const parser = require('@babel/parser');
['src/pages/Loginpage.js', 'src/pages/AuthPage.js'].forEach((file) => {
  const code = fs.readFileSync(file, 'utf8');
  try {
    parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    console.log(file + ': ok');
  } catch (e) {
    console.error(file + ': ' + e.message);
  }
});