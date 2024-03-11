import { Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnInit {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4000');
  }

  ngOnInit() {
    this.socket.on('event-name', (data: any) => {
      console.log('Received data:', data);
    });
  }

  sendMessage(message: string, receiver: any) {
    this.socket.emit('message', { message, receiver });
  }

  getMessage(): any {
    return this.socket.on('message-broadcast', (data: any) => data);
  }
}
