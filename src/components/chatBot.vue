<template>
    <div class="container">
      <div class="sidebar">
        <div class="sidebar-header">
          <select v-model="selectedWorkspace">
            <option>Select workspace...</option>
          </select>
          <router-link to="/inputChat">
            <button class="new-chat-btn" style="font-size: 16px">+ New Chat</button>
          </router-link>
        </div>
        <input
          type="text"
          class="search-bar"
          v-modal="searchText"
          placeholder="Search chats..."
        />
        <div class="no-chats" v-if="!chats.length">No chats.</div>
        <div class="sidebar-icons">
            <router-link to="/inputChat">
              <div class="icon">ChatGPT</div>
            </router-link>
            <router-link to="/dataAnalysis">
              <div class="icon">Data Analysis</div>
            </router-link>
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon"></div>
        </div>
      </div>
      <div class="main-content">
        <div class="header">
          <div class="quick-settings">Quick Settings</div>
          <div class="profile">GPT-4 Turbo</div>
        </div>
        <div class="chat-window">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    components:{
        
    },
    data() {
      return {
        selectedWorkspace: "Select workspace...",
        searchText: "",
        chats: [],
        newMessage: "",
      };
    },
    methods: {
      addMessage() {
        if (this.newMessage.trim() !== "") {
          this.chats.push(this.newMessage);
          this.newMessage = "";
          this.$nextTick(() => {
            this.scrollChatToBottom();
          });
        }
      },
      handleKeyPress(event) {
        if (event.key === "Enter") {
          this.addMessage();
        }
      },
      scrollChatToBottom() {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #2c2c2c;
    color: #ffffff;
  }
  
  .container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 300px;
    background-color: #1b1b1b;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .sidebar-header select {
    padding: 5px;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 4px;
  }
  
  .new-chat-btn {
    background-color: #444;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-bar {
    padding: 10px;
    background-color: #444;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 20px;
  }
  
  .no-chats {
    color: #777;
    margin-bottom: 20px;
  }
  
  .sidebar-icons {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .icon {
    height: 40px;
    background-color: #444;
    border-radius: 4px;
    font-size: 20px;
  }
  
  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #2c2c2c;
    color: #FFF;
  }
  
  .quick-settings {
    font-size: 16px;
  }
  
  .profile {
    font-size: 16px;
  }
  
  .chat-window {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  
  .chat-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo-icon {
    font-size: 60px;
    border: 2px solid #fff;
    border-radius: 50%;
    padding: 20px;
    margin-bottom: 10px;
  }
  
  .logo-text {
    font-size: 24px;
    font-weight: bold;
  }
  
  .chat-messages {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .chat-message {
    background-color: #444;
    padding: 10px 15px;
    border-radius: 10px;
    animation: slideUp 0.5s ease-in-out;
  }

  
  .chat-input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #1b1b1b;
    box-sizing: border-box;
  }
  
  .chat-input input {
    width: 80%;
    padding: 10px;
    background-color: #444;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-right: 10px;
  }
  
  .send-btn {
    background-color: #444;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  