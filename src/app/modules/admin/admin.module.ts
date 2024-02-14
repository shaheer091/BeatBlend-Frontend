import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminRoutingModule } from './routes/admin-route.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [FormsModule, HttpClientModule, CommonModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
