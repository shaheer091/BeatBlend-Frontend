import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css'],
})
export class ChattingComponent implements OnInit {
  receiver: any;
  message!: any;
  senderId:any;

  constructor(private chatServ: SocketService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res) => {
        this.receiver = res['id'];
        console.log(this.receiver);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getMessage();
  }

  getUserDetails(){
    
  }

  send() {
    this.chatServ.sendMessage(this.message, this.receiver);
  }
  getMessage() {
    this.chatServ.getMessage();
  }
}
