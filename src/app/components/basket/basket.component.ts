import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  books: any

  constructor(private ps: BooksService) {
    this.onLoading();
   }

   

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.ps.getBooks().subscribe(
        data => {
          this.books = data;
        },
        err =>{
          console.log(err)
          
        });
    }catch (error) {
      console.log(error)
    }
  }

}
