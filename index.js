const data = require('./data.json');
const fs = require('fs')

function jsonReader(file, cb) {
    fs.readFile(file, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err)
        } try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object );
        } catch (err) {
            return cb && cb(err)
        }
    })
}

// function addPost (file) {
//     jsonReader(file, (err, post))
//     if (err) {
//         console.log(err);
//     } else {
//         post.text = "hello"
//         fs.writeFile('./Customer.json', JSON.stringify(data, null, 4), err => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// };

// addPost('./newPost')

function addPost(text){
jsonReader('./data.json', (err, data) => {
    if (err) {
        console.log("Error reading file", err);
        return;
    }
    data.text = text;
    fs.writeFile('.data.json', JSON.stringify(data), err => {
        if (err) console.log("Error writing file", err);
    })
})
}