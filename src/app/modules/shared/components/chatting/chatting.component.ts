import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
})
export class ChattingComponent implements OnInit {
  receiver: any;
  message!: any;
  senderId: any;
  token: any = localStorage.getItem('token');
  recievedMsg: any[] = [];
  myMessage: any;

  constructor(
    private chatServ: SocketService,
    private route: ActivatedRoute,
    private sharedServ: SharedServiceService
  ) {}
  ngOnInit(): void {
    this.senderId = this.sharedServ.parseJwt(this.token);
    this.route.params.subscribe({
      next: (res) => {
        this.receiver = res['id'];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getMessage();
  }

  send() {
    if (this.message != '') {
      this.chatServ.sendMessage(this.message, this.receiver, this.senderId);
      this.message = '';
    }
  }
  getMessage() {
    this.chatServ.getMessage().subscribe((data) => {
      this.recievedMsg.push(data);
    });
  }
}
