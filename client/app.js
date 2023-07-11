{
  "use strict";

  // HTML references
  const loginForm = document.querySelector('#welcome-form');
  const messagesSection = document.querySelector('#messages-section');
  const messagesList = document.querySelector('#messages-list');
  const addMessageForm = document.querySelector('#add-messages-form');
  const userNameInput = document.querySelector('#username');
  const messageContentInput = document.querySelector('#message-content');

  // Global vars
  let userName = '';

  // Functions
  const login = (e) => {
    e.preventDefault();

    if (!userNameInput.value) {
      alert('Please enter a username');
    } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Yay!');
  };

  // Event listeners
  loginForm.addEventListener('submit', login);
  addMessageForm.addEventListener('submit', sendMessage);
}