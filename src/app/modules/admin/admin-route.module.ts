import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminLoginGuard } from './guards/adminLogin.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { PendingUsersListComponent } from './components/pending-users-list/pending-users-list.component';
import { AdminsListComponent } from './components/admins-list/admins-list.component';
import { AdminComponent } from './admin.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminLoginGuard],
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'userList',
        component: UserListComponent,
      },
      {
        path: 'artistList',
        component: ArtistListComponent,
      },
      {
        path: 'pendingUsersList',
        component: PendingUsersListComponent,
      },
      {
        path: 'adminList',
        component: AdminsListComponent,
      },
      { path: 'user-profile', component: UserProfileComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
