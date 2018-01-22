const imgFolder = './pub/img/';
const fs = require('fs');

let pages = [];

let images = fs.readdirSync(imgFolder);
images.forEach(file => {
    let page = { img: file };
    page.title = file.replace('.jpg', '').replace(/-/g, ' ').replace('quinten', 'Quinten').replace('clause', 'Clause');
    page.href = file.replace('.jpg', '.html').replace('-by-quinten-clause', '');
    page.link = file.replace('.jpg', '').replace('-by-quinten-clause', '').replace(/-/g, ' ');
    page.link = page.link.charAt(0).toUpperCase() + page.link.slice(1);
    page.description = "A drawing called '" + page.link + "' by Quinten Clause";
    pages.push(page);
});

for (var p = 0; p < pages.length; p++) {
    pages[p].next = (p == (pages.length - 1)) ? 'index.html': pages[p + 1].href;
}

pages.forEach(page => {
    let html = fs.readFileSync('image.html', { encoding: 'utf8', flag: 'r' });
    html = html.replace(/\{\{(.+?)\}\}/g, (match) => { return eval(match.replace('{{', '').replace('}}', '')); });
    fs.writeFileSync('pub/' + page.href, html);
});

function getLinks() {
    let links = '';
    pages.forEach(page => {
        links = links + '<li><a href="' + page.href + '">' + page.link + '</a></li>';
    });
    return links;
}

let indexHtml = fs.readFileSync('index.html', { encoding: 'utf8', flag: 'r' });
indexHtml = indexHtml.replace(/\{\{(.+?)\}\}/g, (match) => { return eval(match.replace('{{', '').replace('}}', '')); });
fs.writeFileSync('pub/index.html', indexHtml);

console.log('Built!');
