import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { bookType } from '../components/model/book.model';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: bookType = []

  constructor(private http: HttpClient) { }

  addBook(bookData:any){
    return this.http.post<any>('http://localhost:3000/books/add', bookData)
      .pipe(map(data => {
        return data;
      }));
  }

  getBooks(){
    return this.http.get<any>('http://localhost:3000/books/get')
      .pipe(map(data => {
        if(data){
          this.books = data;
        }
        return this.books;
      }));
  }

  getSomeBook(id: number){
    return this.books[id]
  }


}
