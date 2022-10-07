const loveButton = document.getElementById('love')
const laughButton = document.getElementById('laugh')
const hateButton = document.getElementById('hate')

let selectedGif = null
let selectedEmoji = null
let reactions = ['', '', '']


function selectGif(gif) {
    if (selectedGif)
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

const fetchGifAsync = async (searchTerm) => {
    const rawData = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ZVMDnur9ERcRHMb2M5WJbZbiz0CEZTdh&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
    const gifData = await rawData.json()
    // console.log(gifData);


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
let dataLength

const getAllPosts = async () => {
    const all = await fetch(`https://maulers-server.onrender.com/entries`)
    const data = await all.json()
    // console.log(data.length)

    dataLength = data.length
    postId = dataLength
    fetchPostsAsync(postId)
}

getAllPosts()
// fetchPostsAsync(postId)

const prev = document.getElementById('previousButton')
const next = document.getElementById('nextButton')



prev.addEventListener('click', () => {
    postId--
    if (postId < 1){
        postId = dataLength
    }
    fetchPostsAsync(postId)
})

next.addEventListener('click', () => {
    postId++
    if (postId > dataLength) {
        postId = 1
    }
    fetchPostsAsync(postId)
})

const fetchPostsAsync = async (id) => {
    const rawData = await fetch(`https://maulers-server.onrender.com/entries/${id}`)
    const postData = await rawData.json()
    // console.log(postData);

    const authorText = postData.author
    if (authorText) {
        postAuthor.textContent = authorText
    } else {
        postAuthor.textContent = "anonymous"
    }

    const postText = postData.content
    postContent.textContent = postText

    const postGifAPI = postData.gifUrl
    if (postGifAPI) {
        postGif.src = postGifAPI
    } else {
        postGif.src = ""
    }

    const commentlist = document.getElementById('comments')
    commentlist.innerHTML = ''

    for (i = 0; i < 3; i++) {
        if (postData.comments[i]) {
            let li = document.createElement('li');
            li.textContent = postData.comments[i]
            commentlist.appendChild(li)
            li.style.listStyle = "none"
        }
    }

    loveButton.dataset.notificationCount = postData.e1 || 0
    laughButton.dataset.notificationCount = postData.e2 || 0
    hateButton.dataset.notificationCount = postData.e3 || 0

    if(selectedEmoji)
        selectedEmoji.classList.remove('selectedEmoji')
    selectedEmoji = null
}

const form = document.forms[0]
const submitBtn = document.getElementById('submitBtn')
const postText = document.getElementById('postText')

const commentInputTxt = document.getElementById('addCommentInput')
const submitCommentBtn = document.getElementById('submitComment')
const commentsContainer = document.getElementById('comments')
const postAuthorText = document.getElementById('authorText')



submitBtn.addEventListener('click', (e) => {
    // // console.log(postText.value)
    e.preventDefault()
    postEntry(postAuthorText.value, postText.value, selectedGif.src) // add params to post
    gif1.src = ""
    gif2.src = ""
    gif3.src = ""
    gif4.src = ""
    postText.value = ""
    selectedGif = null
    location.reload()
    //getAllPosts()
})



submitCommentBtn.addEventListener('click', () => {
    const li = document.createElement('li')
    li.classList.add('addedComments')
    li.textContent = commentInputTxt.value
    commentsContainer.appendChild(li)

    postComment(postId, commentInputTxt.value)
    commentInputTxt.value = ''
})



const postEntry = async (author, textInput, gif) => {
    await fetch(`https://maulers-server.onrender.com/entries`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "author": author,
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



function selectEmoji(emoji) {
    let lastSelectedEmoji = selectedEmoji

    for(let i = 0; i < reactions.length; i++){
        if(reactions[i] === 'dec')
            reactions[i] = ''
    }

    if(lastSelectedEmoji){
        selectedEmoji.classList.remove('selectedEmoji')
        selectedEmoji.dataset.notificationCount = parseInt(selectedEmoji.dataset.notificationCount) - 1

        if(lastSelectedEmoji.isSameNode(loveButton))
            reactions[0] = 'dec'

        if(lastSelectedEmoji.isSameNode(laughButton))
            reactions[1] = 'dec'

        if(lastSelectedEmoji.isSameNode(hateButton))
            reactions[2] = 'dec'
        
        selectedEmoji = null
    }

    if(!lastSelectedEmoji || !emoji.isSameNode(lastSelectedEmoji)){
        emoji.classList.add('selectedEmoji')
        emoji.dataset.notificationCount = parseInt(emoji.dataset.notificationCount) + 1

        if(emoji.isSameNode(loveButton))
            reactions[0] = 'inc'

        if(emoji.isSameNode(laughButton))
            reactions[1] = 'inc'

        if(emoji.isSameNode(hateButton))
            reactions[2] = 'inc'

        selectedEmoji = emoji
    }
    
    addReaction(postId, ...reactions)
}

loveButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(loveButton)
})

laughButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(laughButton)
})

hateButton.addEventListener('click', e => {
    e.preventDefault();
    selectEmoji(hateButton)
})

module.exports = {
    selectGif,
    fetchGifAsync,
    getAllPosts,
    fetchPostsAsync,
    postEntry,
    addReaction,
    postComment,
    selectEmoji
}