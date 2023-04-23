const button = document.querySelector("#btn")
const output = document.querySelector(".output")
const input = document.querySelector("#id");
const searchBtn = document.querySelector("#btn2");
const textInput = document.querySelector("#text");


const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

const searchPosts = async () => {
  const text = document.querySelector("#text").value;
  try{
    const result = await getPosts();
    let filteredArr = [];
    const filtered = result.filter(post => {
      if ((post.title + post.body).toLowerCase().includes(text.toLowerCase())) {
        const highlightedTitle = highlightText(post.title, text);
        const highlightedBody = highlightText(post.body, text);
        filteredArr.push({...post, title: highlightedTitle, body: highlightedBody});
    }
});
    showOnScreen(filteredArr);
  }
  catch (error) {
    console.log(error)
  }
}

const filterPosts = async () => {
  const num = document.getElementById("id").value.trim();  
  try {       
    const res = await getPosts();
    if (num === "") {
      console.log(res);
      showOnScreen(res);
    } else {
      const filtered = res.filter(post => post.userId === parseInt(num));
      showOnScreen(filtered);
    }
  } catch (error) {
    console.log(error);
  }
}

function highlightText(text, searchText) {
  const searchLower = searchText.toLowerCase();
  const pattern = new RegExp(searchText, "gi");
  return text.replace(pattern, `<span class="highlight">$&</span>`);
}

function showOnScreen (data) {
  const output = document.querySelector(".output");

  output.innerHTML = "";

  data.forEach(({ title, userId, body }) => {
    const container = document.createElement("div");

    const head = document.createElement("h1");
    head.innerHTML = title;


    const userIdElement = document.createElement("p");
    userIdElement.textContent = `User ID: ${userId}`;

    const paragraph = document.createElement("p");
    paragraph.innerHTML = body;

    container.append(head, userIdElement, paragraph);
    output.appendChild(container);
  });

  if (data.length === 0) {
    const error = document.createElement("div");

    error.className = "error";
    error.textContent = "SORRY, Nothing Was Found";
    
    output.appendChild(error);
  }
}

window.addEventListener("load", filterPosts);    
button.addEventListener("click", filterPosts);
searchBtn.addEventListener("click", searchPosts);
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
  }
});


