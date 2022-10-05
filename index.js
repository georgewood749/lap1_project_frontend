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

const fetchGifAsync = async (searchTerm) => {
    const rawData = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ZVMDnur9ERcRHMb2M5WJbZbiz0CEZTdh&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
    const gifData = await rawData.json()
    console.log(gifData);


    const gif1url = gifData.data[0].images.original.url
    const gif2url = gifData.data[1].images.original.url
    const gif3url = gifData.data[2].images.original.url
    const gif4url = gifData.data[3].images.original.url


    gif1.src = gif1url
    gif2.src = gif2url
    gif3.src = gif3url
    gif4.src = gif4url

    const gif1Img = document.getElementById('gif1')
    const gif2Img = document.getElementById('gif2')
    const gif3Img = document.getElementById('gif3')
    const gif4Img = document.getElementById('gif4')


    gif1Img.addEventListener('click', e => {
        e.preventDefault()
        if (!gif1Img.style["border"]) {
            gif1Img.style["border"] = "1px solid 'green'"
        } else {
            gif1Img.style["border"] = "none"
        }
    })
}


const searchGIF = document.getElementById('gifSearchTerm')
const gifButton = document.getElementById('gifbtn')
gifButton.addEventListener('click', e => {
    e.preventDefault();
    searchTerm = searchGIF.value
    fetchGifAsync(searchTerm)

    gifContainer.style.display = "initial";
})


function textCounter(postBox, counter, charLimit) {
    var charCount = document.getElementById(counter);
    if (postBox.value.length > charLimit) {
        postBox.value = postBox.value.substring(0, charLimit);
        return false;
    } else {
        charCount.value = charLimit - postBox.value.length;
    }
}

const fetchPostsAsync = async (id) => {
    const rawData = await fetch(`https://maulers-backend.herokuapp.com/entries/`)
    const postData = await rawData.json()
    console.log(postData[1]);

    const authorText = postData[id].author
    postAuthor.textContent = authorText

    const postText = postData[id].content
    postContent.textContent = postText
    
    const commentlist = document.getElementById('comments')
    for (i = 0; i < 3; i++) {
        let li = document.createElement('li');
        li.textContent = postData[id].comments[i]
        commentlist.appendChild(li)
        li.style.listStyle = "none"
    }
    console.log(postData[id].e1);
}

fetchPostsAsync(1)

const loveReaction = async (id) => {
    fetch(`https://maulers-backend.herokuapp.com/entries/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(
        {
            e1: "inc"
        }
    )
})
}

const loveButton = document.getElementById('love')
loveButton.addEventListener('click', e => {
    e.preventDefault();
    loveReaction(1)
    fetchPostsAsync(1)
    // const loveCount = loveButton.getAttribute('data-notification-type')
    // console.log(loveCount);
    // loveButton.setAttribute('data-notification-type', (loveCount + 1))
})



