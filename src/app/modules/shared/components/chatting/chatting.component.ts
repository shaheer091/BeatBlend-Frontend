import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { SharedServiceService } from '../../services/shared-service.service';
import { io } from 'socket.io-client';
import { CommonService } from 'src/app/services/common.service';

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
  socket: any;
  receiverName:any;
  receiverImg:any;

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
        this.getUserProfile()
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getMessage();
  }

  getUserProfile() {
    this.commonServ.getSingleUser(this.receiver).subscribe({
      next: (res) => {
        this.receiverName=res[0]?.username
        this.receiverImg=res[0]?.profile[0]?.imageUrl
      },
      error: (err) => {
        console.log(err);
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
      this.message = '';
    }
  }
  getMessage() {
    this.chatServ.getMessage().subscribe((data) => {
      console.log(data);
      data.timeDisplay = data.date.split('T')[1].slice(0, 5);
      this.recievedMsg.push(data);
    });
  }
  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
