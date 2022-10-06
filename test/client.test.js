// const fs = require('fs');
// const path = require('path');
// const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// global.fetch = require('jest-fetch-mock');
// let app;

// describe('app', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML = html.toString();
//         app = require('../index.js')
//     })

//     afterEach(() => {
//         fetch.resetMocks();
//     })

//     test('it has a title', () => {
//         let title = document.querySelector('title');
//         expect(title).toBeTruthy();
//     })
    // test('h1 is Fruit', () => {
    //     const h1 = document.querySelector('h1')
    //     expect(h1.innerHTML).toContain("Fruits")
    // })
    // test('the h1 is updated when we hover', () => {
    //     const h1 = document.querySelector('h1');
    //     h1.dispatchEvent(new dom.window.Event('mouseover'));
    //     expect(h1.style.backgroundColor).toBe("yellow");
    // })
    // test('the h1 is updated when we move mouse away', () => {
    //     const h1 = document.querySelector('h1');
    //     h1.dispatchEvent(new dom.window.Event('mouseout'));
    //     expect(h1.style.backgroundColor).toBe("white");
    // })
    // test('the h1 changes color when clicked', () => {
    //     const h1 = document.querySelector('h1');
    //     h1.dispatchEvent(new dom.window.Event('click'));
    //     expect(h1.style.color).toBe("red");
    // })
// })
// // CREATING POSTS
// user can enter text into post box

// user cannot exceed character limit

// correct character count is displayed in the bottom right of post box

// user is able to insert a gif

// user can submit post

// previous posts are displayed


// // PREVIOUS POSTS

// previous posts should be displayed

// user should be able to comment on other posts

// user is able to see all comments on a post

// user is able to react (i.e. reaction count increased when one is clicked)

// user is not able to react with the same reaction multiple times (maybe also limit one reaction type per post)? - probably not applicable in the context of this implementation 
