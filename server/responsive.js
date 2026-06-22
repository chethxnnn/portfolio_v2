const fs = require('fs');
const path = require('path');
const dir = './client/src/admin/panels';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if(f.endsWith('.jsx')) {
    const fp = path.join(dir, f);
    let content = fs.readFileSync(fp, 'utf8');
    content = content.replace(/<table/g, '<div className="overflow-x-auto"><table');
    content = content.replace(/<\/table>/g, '</table></div>');
    // Ensure titles are responsive flex column on mobile if they have buttons
    content = content.replace(/<div className="flex justify-between items-center mb-8">/g, '<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">');
    fs.writeFileSync(fp, content);
  }
});
console.log('Made admin panels responsive');
