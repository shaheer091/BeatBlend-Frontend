import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SharedServiceService } from '../modules/shared/services/shared-service.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnInit {
  private socket!: Socket;
  senderId:any;

  constructor(private sharedServ: SharedServiceService) {
    this.senderId = this.sharedServ.parseJwt();
    this.socket = io('http://localhost:4000', {
      auth: {
        userid: `${this.senderId.userId}`,
      },
    });
  }

  ngOnInit() {}

  sendMessage(message: string, receiver: any, sender: any) {
    this.socket.emit('sendMessage', { message, receiver, sender });
  }

  getMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      console.log(observer);
      this.socket.on('receiveMessage', (data: any) => {
        console.log(data);
        observer.next(data);
      });
    });
  }
}
