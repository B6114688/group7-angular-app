import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(userData: any) {
    return this.http.post<any>('http://localhost:3000/users/add', userData)
      .pipe(map(data => {
        return data;
      }));
  }

  
}
