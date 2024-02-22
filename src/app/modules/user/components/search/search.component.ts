import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private userServ: UserService) {}
  searchText!: string;
  user: any[] = [];

  search() {
    this.userServ.searchSong(this.searchText).subscribe((res) => {
      console.log(res);
      this.user = res;
      console.log(this.user)
    });
  }
  followUser(userId:any){
    this.userServ.followUser(userId).subscribe((res)=>{
      console.log(res)
    })
  }
}
