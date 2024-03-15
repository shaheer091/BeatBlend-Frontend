import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  sendMessage(message: string, receiver: any, sender:any) {
    this.socket.emit('sendMessage', { message, receiver, sender});
  }

  getMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message-broadcast', (data: any) => {
        observer.next(data);
      });
    });
  }
}
