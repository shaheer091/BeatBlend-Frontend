import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  constructor(private userServ: UserService) {}
  @Input() songId: any;
  @Output() showCommentDiv = new EventEmitter<Boolean>();
  comments!: string;
  data:any;

  submitComment(event: any) {
    event.stopPropagation();
    console.log(this.comments, this.songId);
    this.data={comment:this.comments, songId:this.songId};
    this.showCommentDiv.emit(false);

    this.userServ.addComment(this.data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  cancelComment(event: any) {
    event.stopPropagation();
    this.comments = '';
    this.showCommentDiv.emit(false);
  }
}
