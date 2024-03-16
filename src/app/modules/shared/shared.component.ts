import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export class SharedComponent {
  constructor(private commonServ:CommonService){}
  OnInInit() {
    const role = this.commonServ.role;
  }
}
