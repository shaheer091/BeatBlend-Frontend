import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { SharedServiceService } from '../../services/shared-service.service';
import { Socket, io } from 'socket.io-client';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
})
export class ChattingComponent implements OnInit, OnDestroy {
  receiver: any;
  message!: any;
  senderId: any;
  token: any = localStorage.getItem('token');
  recievedMsg: any[] = [];
  myMessage: any;
  socket!: Socket;
  receiverName: any;
  receiverImg: any;
  who: any;

  constructor(
    private chatServ: SocketService,
    private route: ActivatedRoute,
    private sharedServ: SharedServiceService,
    private commonServ: CommonService
  ) {}
  ngOnInit(): void {
    this.senderId = this.sharedServ.parseJwt();
    

    this.route.params.subscribe({
      next: (res) => {
        this.receiver = res['id'];
        this.getUserProfile();
      },
      error: (err) => {
        console.log(`Error: ${err}`)
      },
    });
    this.getPrevoiusMsg();

    this.getMessage();
    // this.who = this.sharedServ.parseJwt();
  }

  getPrevoiusMsg() {
    this.chatServ.getPrevoiusMsg(this.receiver).subscribe({
      next: (res) => {
        this.recievedMsg = res;
      },
      error: (err) => {
        
      },
    });
  }

  

  getUserProfile() {
    this.commonServ.getSingleUser(this.receiver).subscribe({
      next: (res) => {
        this.receiverName = res[0]?.username;
        this.receiverImg = res[0]?.profile[0]?.imageUrl;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  send() {
    if (this.message != '') {
      this.chatServ.sendMessage(
        this.message,
        this.receiver,
        this.senderId.userId
      );
      const time = new Date();
      const myMsg = {
        message: this.message,
        sender: this.senderId.userId,
        receiver: this.receiver,
        timeDisplay: `${time.getHours()}:${time.getMinutes()}`,
      };
      this.recievedMsg.push(myMsg);
      this.message = '';
    }
  }
  getMessage() {
    this.chatServ.getMessage().subscribe({
      next: (data) => {
        data.timeDisplay = data.date.split('T')[1].slice(0, 5);
        this.recievedMsg.push(data);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  ngOnDestroy(): void {
    
  }
}
