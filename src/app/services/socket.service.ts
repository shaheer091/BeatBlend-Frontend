import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SharedServiceService } from '../modules/shared/services/shared-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnInit {
  public socket!: Socket;

  constructor(private http:HttpClient) {
    // this.socket = io('http://localhost:4000')
  }

  ngOnInit() {}

  sendMessage(message: string, receiver: any, sender: any) {
    this.socket.emit('sendMessage', { message, receiver, sender });
  }

  getMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket?.on('receiveMessage', (data: any) => {
        observer.next(data);
      });
    });
  }
  getPrevoiusMsg(userId:any):Observable<any>{
    return this.http.get(`http://localhost:3000/user/chats/${userId}`)
  }

  disconnect(){
    this.socket?.disconnect();
  }
}
