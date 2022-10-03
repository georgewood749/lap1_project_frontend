// const data = require('./data.json');
// const fs = require('fs')


// function jsonReader(file, cb) {
//     fs.readFile(file, 'utf-8', (err, fileData) => {
//         if (err) {
//             return cb && cb(err)
//         } try {
//             const object = JSON.parse(fileData);
//             return cb && cb(null, object );
//         } catch (err) {
//             return cb && cb(err)
//         }
//     })
// }

// function addPost(text){
// jsonReader('./data.json', (err, data) => {
//     if (err) {
//         console.log("Error reading file", err);
//         return;
//     }
//     data.text = text;
//     fs.writeFile('.data.json', JSON.stringify(data), err => {
//         if (err) console.log("Error writing file", err);
//     })
// })
// }

const fetchAsync = async (searchTerm) => {
    const rawData = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ZVMDnur9ERcRHMb2M5WJbZbiz0CEZTdh&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
    const gifData = await rawData.json()
    console.log(gifData);

    const gif1url = gifData.data[0].bitly_gif_url
    const gif2url = gifData.data[1].embed_url
    const gif3url = gifData.data[2].embed_url
    const gif4url = gifData.data[3].embed_url

    gif1.src = gif1url
    gif2.src = gif2url
    gif3.src = gif3url
    gif4.src = gif4url
}

// const fetchAsyncTrending = async () => {
//     const rawData = await fetch(`https://api.giphy.com/v1/gifs/trending`)
//     const gifData = await rawData.json()
//     console.log(gifData);

//     const gif1url = gifData.data[0].bitly_gif_url
//     const gif2url = gifData.data[1].embed_url
//     const gif3url = gifData.data[2].embed_url
//     const gif4url = gifData.data[3].embed_url

//     gif1.src = gif1url
//     gif2.src = gif2url
//     gif3.src = gif3url
//     gif4.src = gif4url
// }

const searchGIF = document.getElementById('gifSearchTerm')
const gifButton = document.getElementById('addGif')
gifButton.addEventListener('click', e => {
    e.preventDefault();
    searchTerm = searchGIF.value
    fetchAsync(searchTerm)
})

