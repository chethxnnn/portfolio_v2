const fs = require('fs');
const path = require('path');
const dir = './client/src/admin/panels';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if(f.endsWith('.jsx')) {
    const fp = path.join(dir, f);
    let content = fs.readFileSync(fp, 'utf8');
    content = content.replace(/className="text-muted hover:text-accent p-2"/g, 'className="text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 p-2 rounded-md transition-colors"');
    content = content.replace(/className="text-muted hover:text-danger p-2 ml-2"/g, 'className="text-red-500 bg-red-500/10 hover:bg-red-500/20 p-2 ml-2 rounded-md transition-colors"');
    fs.writeFileSync(fp, content);
  }
});
console.log('Fixed edit/delete buttons');
