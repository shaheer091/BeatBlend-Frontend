import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(private userServ: UserService, private router: Router) {}
  @Input() songId: any;
  @Output() showCommentDiv = new EventEmitter<Boolean>();
  comments!: string;
  data: any;
  alreadyComments: any;
  message: any;

  ngOnInit(): void {
    this.getComment();
  }

  submitComment(event: any) {
    event.stopPropagation();
    this.data = { comment: this.comments, songId: this.songId };
    this.showCommentDiv.emit(false);

    this.userServ.addComment(this.data).subscribe({
      next: (res) => {
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  getComment() {
    this.userServ.getComment(this.songId).subscribe({
      next: (res) => {
        if (res?.message) {
          this.message = res.message;
        } else {
          this.alreadyComments = res;
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  getUserProfile(userId: any) {
    this.router.navigate([`/user/user-profile/${userId}`]);
  }

  cancelComment(event: any) {
    event.stopPropagation();
    this.comments = '';
    this.showCommentDiv.emit(false);
  }
}
