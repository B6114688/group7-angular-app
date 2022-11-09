import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  

  books: any

  constructor(private ps: BooksService, private cartService: CartService) {
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

  addToCart(id: number){
    this.cartService.add(id);
  }

  getcounter(){
    this.cartService.getCounter()
  }
  
  
}
