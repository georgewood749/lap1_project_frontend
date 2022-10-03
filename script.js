const fakedb = require('./fakeDb');

const loadJson = (function () {
  let json = null;
  $.ajax({
    async: false,
    global: false,
    url: "/content.json",
    dataType: "json",
    success: function (data) {
      json = data;
    },
  });
  return json;
})();

let postElem = document.querySelector('.post-box');

for(var i = 0; i < json.length; i ++) {
  let newPost = postElem.cloneNode(true);
  newPost.innerText = json[i];
  document.querySelector('.postlist').appendChild(newPost);
}
postElem.remove();

postList = []

document.querySelector('.post').addEventListener('submit', function(e) {
  //keep the submit button from redirecting the page
  e.preventDefault();
  //check that post is not empty
  if (e.target.querySelector('.post-content').value != "") {
    //add post to the post array
    let newPost = {"text": e.target.querySelector('.post-content').value, "drawn": false}
    postList.push(newPost);
    //reset the input field
    e.target.querySelector('.post-content').value = "";
    //run the post redraw script
    createPosts();
  } else {
    alert("Please enter text to post! 😊");
  }
});

//create posts
function createPosts() {
  //loop through the whole post array
  for(var i = 0; i < postList.length; i ++) {
    //if the 'drawn' attribute of the post object is false (meaning it has not yet been drawn), draw the post at the top of the list
    if (postList[i].drawn == false) {
      //create a new post element
      let newPost = document.createElement('div');
      newPost.className = "post";
      //set it text from the post array
      newPost.innerText = postList[i].text;
      //insert it at the top of the container
      document.querySelector('#listingContainer').insertBefore(newPost, document.querySelector('#listingContainer').firstChild);
      //set it to drawn so it is not redrawn later
      postList[i].drawn = true;
    }
  }
}

