import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-route.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { PendingUsersListComponent } from './components/pending-users-list/pending-users-list.component';
import { AdminsListComponent } from './components/admins-list/admins-list.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    NavbarComponent,
    UserListComponent,
    ArtistListComponent,
    PendingUsersListComponent,
    AdminsListComponent,
    AdminComponent,
  ],
  imports: [FormsModule, HttpClientModule, CommonModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
