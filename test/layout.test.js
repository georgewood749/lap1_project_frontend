const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Testing index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('it has a title', () => {
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
    })
})