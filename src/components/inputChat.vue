<template>
  <div class="chatbot">
    <div class="chat-window">
      <!-- <div class="chat-logo">
        <div class="logo-icon">UI</div>
        <div class="logo-text">Chatbot UI</div>
      </div> -->
      <div class="chat-logo">
          <div class="logo-icon">UI</div>
          <div class="logo-text">Chatbot UI</div>
      </div>
      <div class="chat-messages" ref="chatMessages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div :class="{'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot'}">
            <div v-html="message.text.replace(/\n/g, '<br/>')"></div>
          </div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" v-model="prompt" placeholder="Send a message..." @keyup.enter="callBackend" />
        <button @click="callBackend" class="send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="#ffffff"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prompt: '',
      messages: []
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    async callBackend() {
      let prompt = this.prompt;
      try {
        const response = await axios.post('/chat-bot/generateData', { prompt }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.messages.push({
          text: this.prompt + '?',
          sender: 'user'
        });
        this.messages.push({
          text: response.data.data.replace(/\n/g, '<br/>'),
          sender: 'bot'
        });
        
        this.prompt = '';
      } catch (error) {
        console.error('Error calling backend:', error);
        throw error;
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
.chatbot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
}

.chat-window {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
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
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 60px;
  scrollbar-width: thin;
  scrollbar-color: #444 #1e1e1e;
}

.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.message {
  background-color: #444;
  padding: 10px 15px;
  border-radius: 10px;
  animation: fadeInUp 0.5s ease-in-out;
  margin-bottom: 20px;
}

.user-message {
  align-self: flex-end;
}

.bot-message {
  align-self: flex-start;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #1b1b1b;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  background-color: #444;
  border: none;
  border-radius: 20px;
  color: #fff;
  margin-right: 10px;
  outline: none;
  transition: background-color 0.3s ease;
}

.chat-input input:focus {
  background-color: #555;
}

.send-btn {
  background-color: #444;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover {
  background-color: #555;
}

.send-btn svg {
  fill: #fff;
}
</style>
