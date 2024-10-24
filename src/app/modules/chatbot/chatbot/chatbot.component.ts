import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isActive = false;
  userMessage = '';
  showNotification = false; // Flag for showing the notification
  messages: { text: string, user: boolean }[] = [];

  constructor(private http: HttpClient) {
    // Add a default message when the bot is initialized
    this.messages.push({ text: 'Hello! How can I assist you today?', user: false });
  }

  toggleChatbot() {
    this.isActive = !this.isActive;

    // Hide notification when the chatbot is opened
    if (this.isActive) {
      this.showNotification = false;
    }
  }

  closeChatbot() {
    this.isActive = false;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, user: true });

      // Send user message to backend
      this.sendMessageToBackend(this.userMessage);

      this.userMessage = '';
    }
  }

  sendMessageToBackend(userMessage: string) {
    const requestPayload = { message: userMessage };

    // Get username and password from sessionStorage
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    // Set Authorization and Content-Type headers
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json'
    });

    // Send HTTP POST request to the backend with headers
    this.http.post<{ reply: string }>(CONFIG.URL_BASE+'/api/chat', requestPayload, { headers })
      .subscribe(
        response => {
          // Push the response from the backend as a bot reply
          this.messages.push({ text: response.reply, user: false });

          // Show the notification if the chatbot is not active
          if (!this.isActive) {
            this.showNotification = true;
          }
        },
        error => {
          // Handle error response from the backend
          console.error('Error sending message:', error);
          this.messages.push({ text: 'Error: Unable to communicate with the bot.', user: false });

          // Show notification if chatbot is not active
          if (!this.isActive) {
            this.showNotification = true;
          }
        }
      );
  }
}
