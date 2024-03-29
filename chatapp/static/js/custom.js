function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const csrftoken = getCookie('csrftoken');


let form = document.querySelector(".submit-form")
let input = document.querySelector("#input_value")

let heading = document.querySelector("#main-header")
let bot_container = document.querySelector(".bot-feature-container")
let container = document.querySelector(".container-fluid-2")
let spinner = document.querySelector(".spinner-main") 

form.addEventListener("submit", submitForm)


async function postJSON(data) {  
    // This postJSON (fn) Means the chatgpt is taking input from user
    spinner.style.display = "flex"
    const url = "/get-value" 
    // This /get-value is the url where i send my data to
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(data),
      });

    //   Code till now is responsible for sending our data from the frontend to the backend for processing
  
      const result = await response.json();
      heading.style.display = "none"
      bot_container.style.display = "none"
      spinner.style.display = "none"
      container.innerHTML += `<div class="chat-container">
      <div class="user-chat-container">
          <div class="user-pic"><i class="fa-solid fa-circle-user"></i></div>
          <div class="user-message">${result.msg}</div>
      </div>
      <div class="bot-chat-container">
          <div class="bot-icon"><i class="fa-solid fa-robot"></i></div>
          <div class="bot-response">${result.res}</div>
      </div>
  </div>`

  input.value = ""
      console.log("Success:", result);

    } catch (error) {
      console.error("Error:", error);
    }
  }
    
 
function submitForm(e){
    e.preventDefault()
    let message = input.value
    const data = { msg : message };
    postJSON(data);
}
    // Explanation of line 38  
    //   Data is an object & msg:message is a KeyboardEvent, data is send to the backend when the function postJSON is called.


// The function submitForm that i make above (at line 35) is the function which will executed after the execution of sending the data from frontend to backend 