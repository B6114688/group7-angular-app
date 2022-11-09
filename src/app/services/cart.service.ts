import { Injectable } from '@angular/core';
import { bookType } from '../components/model/book.model';
import { BooksService } from './books.service';

@Injectable({providedIn:"root"})
  

export class CartService {

  counter: number = 0;
  sumPrice: number = 0;
  cart: bookType =[]

  constructor(private booksService: BooksService) { }

  add(id:number){
    console.log('Add book id: '+id+' to cart');
    this.cart.push(this.booksService.getSomeBook(id));
    this.sumPrice += this.booksService.getSomeBook(id).price
    this.counter = this.cart.length;
  }

  getCounter(){
    return this.counter;
  }

  getsumPrice(){
    return this.sumPrice;
  }

  getCart(){
    return this.cart;
  }
}
