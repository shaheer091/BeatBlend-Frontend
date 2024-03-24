import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api=`${environment.apiUrl}/user`;

  constructor(private http:HttpClient) { }

  order(price:any):Observable<any>{
    return this.http.post(`${this.api}/premium`,{price})
  }

  successPayent(data:any):Observable<any>{
    return this.http.post(`${this.api}/successPayment`,{data})
  }
}
