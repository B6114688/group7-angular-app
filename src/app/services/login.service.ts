import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  sendDataLogin(loginData: any) {
    return this.http.post<any>('http://localhost:3000/users/login', loginData)
      .pipe(map(data => {
        return data;
      }));
  }
}
