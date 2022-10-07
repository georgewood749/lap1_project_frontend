const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

describe('Testing index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })

    test('it has a title', () => {
        const title = document.querySelector('title')
        expect(title).toBeTruthy()
    })

    test('it has a textarea element with max length 180', () => {
        const textInput = document.querySelector('textarea')
        expect(parseInt(textInput.maxLength)).toBe(170)
    })

    test('it has a character counter with initial value of 180', () => {
        const counter = document.getElementById('counter')
        expect(parseInt(counter.value)).toBe(180)
    })
})