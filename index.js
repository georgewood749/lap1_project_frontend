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

const loveButton = document.getElementById('love')
const laughButton = document.getElementById('laugh')
const hateButton = document.getElementById('hate')

let selectedGif = null

function selectGif(gif){
    if(selectedGif)
        selectedGif.style["border"] = "none"

    selectedGif = gif
    selectedGif.style["border"] = "8px solid green"
}

const gif1Img = document.getElementById('gif1')
const gif2Img = document.getElementById('gif2')
const gif3Img = document.getElementById('gif3')
const gif4Img = document.getElementById('gif4')

gif1Img.addEventListener('click', e => {
    e.preventDefault()
    selectGif(gif1Img)
})

gif2Img.addEventListener('click', e => {
    e.preventDefault()
    selectGif(gif2Img)
})

gif3Img.addEventListener('click', e => {
    e.preventDefault()
    selectGif(gif3Img)
})

gif4Img.addEventListener('click', e => {
    e.preventDefault()
    selectGif(gif4Img)
})

// if(selectedGif)
//     selectedGif.style["border"] = "8px solid green"
// selectedGif.style.border = "8px solid green"

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


let postId = 1

const getAllPosts = async () => {
    const all = await fetch(`https://maulers-server.onrender.com/entries`)
    const data = await all.json()
    console.log(data.length)

    // postId = data.length
    postId = 3
    fetchPostsAsync(postId)
}

getAllPosts()
// fetchPostsAsync(postId)

const fetchPostsAsync = async (id) => {
    const rawData = await fetch(`https://maulers-server.onrender.com/entries/${id}`)
    const postData = await rawData.json()
    console.log(postData);

    const authorText = postData.author
    postAuthor.textContent = authorText

    const postText = postData.content
    postContent.textContent = postText
    
    const commentlist = document.getElementById('comments')

    commentlist.innerHTML = ''

    for (i = 0; i < 3; i++) {
        if(postData.comments[i]){
            let li = document.createElement('li');
            li.textContent = postData.comments[i]
            commentlist.appendChild(li)
            li.style.listStyle = "none"
        }
    }

    loveButton.dataset.notificationCount = postData.e1
    laughButton.dataset.notificationCount = postData.e2
    hateButton.dataset.notificationCount = postData.e3
    
    // console.log(postData[id].e1);
}


// const postId = document.getElementById('postId')
// postId.addEventListener('change', () => {
//     console.log(postId.value)
//     fetchPostsAsync(postId.value)
// })

const loveReaction = async (id) => {
    fetch(`https://maulers-backend.herokuapp.com/entries/${id}`, {
    method: "PUT",
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

const form = document.forms[0]
const submitBtn = document.getElementById('submitBtn')
const postText = document.getElementById('postText')

const commentInputTxt = document.getElementById('addCommentInput')
const submitCommentBtn = document.getElementById('submitComment')
const commentsContainer = document.getElementById('comments')

submitBtn.addEventListener('click', () => {
    // console.log(postText.value)
    postEntry(postText.value, selectedGif.src) // add params to post
})

submitCommentBtn.addEventListener('click', () => {
    const li = document.createElement('li')
    li.textContent = commentInputTxt.value
    commentsContainer.appendChild(li)

    postComment(postId, commentInputTxt)
})

const postEntry = async (textInput, gif) => {
    await fetch(`https://maulers-server.onrender.com/entries`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "content": textInput,
            "gifUrl": gif,
            "comments": [],
            "e1": 0,
            "e2": 0,
            "e3": 0,  
        })
    })
}

const addReaction = async (id, e1 = '', e2 = '', e3 = '') => {
    await fetch(`https://maulers-server.onrender.com/entries/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "e1": e1,
            "e2": e2,
            "e3": e3,
        })
    })
}

const postComment = async (id, comment) => {
    await fetch(`https://maulers-server.onrender.com/entries/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "comment": comment
        })
    })
}

let selectedEmoji = null

function selectEmoji(emoji){
    if(selectedEmoji){
        selectedEmoji.classList.remove('selectedEmoji')
        selectedEmoji.dataset.notificationCount = parseInt(selectedEmoji.dataset.notificationCount) - 1
    }

    selectedEmoji = emoji
    selectedEmoji.classList.add('selectedEmoji')
    selectedEmoji.dataset.notificationCount = parseInt(selectedEmoji.dataset.notificationCount) + 1
}

loveButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(loveButton)
    addReaction(postId, 'inc', '', '')
})

laughButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(laughButton)
    addReaction(postId, '', 'inc', '')
})

hateButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(hateButton)
    addReaction(postId, '', '', 'inc')
})