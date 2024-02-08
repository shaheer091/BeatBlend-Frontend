import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserRoutingModule } from './routes/user-route.module';

@NgModule({
  declarations: [
    UserHomepageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    UserRoutingModule
  ],
  providers: [],
  exports: [ ],
})
export class UserModule {}
