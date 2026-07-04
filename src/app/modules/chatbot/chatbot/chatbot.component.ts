import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css'],
    standalone: false
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('msgContainer') private msgContainer!: ElementRef;

  isActive = false;
  userMessage = '';
  showNotification = false;
  messages: { text: string, user: boolean }[] = [];
  private shouldScroll = false;

  constructor(private http: HttpClient) {
    this.messages.push({ text: 'Hello! How can I assist you today?', user: false });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      const el = this.msgContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  toggleChatbot() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.showNotification = false;
      this.shouldScroll = true;
    }
  }

  closeChatbot() {
    this.isActive = false;
  }

  handleEnterKey(event: Event): void {
    const kbEvent = event as KeyboardEvent;
    if (!kbEvent.shiftKey) {
      kbEvent.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, user: true });
      this.shouldScroll = true;
      this.sendMessageToBackend(this.userMessage);
      this.userMessage = '';
    }
  }

  sendMessageToBackend(userMessage: string) {
    const requestPayload = { message: userMessage };

    // Get username and password from localStorage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

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
          this.shouldScroll = true;
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
