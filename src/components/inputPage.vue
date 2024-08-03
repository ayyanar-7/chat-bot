<template>

<div class="chatbot">
      <!-- <div class="chat-window">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div :class="{'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot'}">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="input-area">
        <input v-model="prompt" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="callBackend">Send</button>
      </div> -->

    <div class="chat-window">{{ messages.length }}
          <div class="chat-messages" ref="chatMessages">
            <div v-for="(message, index) in messages" :key="index" class="message">
            <div :class="{'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot'}">
                {{ message.text }}
            </div>
        </div>
          </div>
          <div class="chat-input">
            <input
              type="text"
              v-model="prompt"
              placeholder="Send a message..."
            />
            <button @click="callBackend" class="send-btn">Send</button>
          </div>
        </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            prompt: '',
            messages: []
        }
    },
    mounted(){
    },
    methods:{
        async callFront() {
            try {
                const response = await axios.get('/chat-bot/generate', {
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrr',response);
                this.messages.push({
                    text: response,
                    sender: 'bot'
                });
            } catch (error) {
                console.error('Error calling backend:', error);
                throw error;
            }
        },
        async callBackend() {
        console.log('ttttttttttttttttt',this.prompt);

            let prompt = this.prompt
            try {
                const response = await axios.post('/chat-bot/generateData', { prompt }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                console.log('jjjjjjjjjjjjjjjjjjj', response);
                
                this.messages.push({
                    text: response.data.data,
                    sender: 'bot'
                });
            } catch (error) {
                console.error('Error calling backend:', error);
                throw error;
            }
        }
    }
}
</script>



<style scoped>

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  display: none; /* Initially hidden */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  
  /* .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: black !important;
  } */
  
  /* .chat-logo {
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
  } */
  
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
  
  @keyframes slideUp {
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