import { Component, OnInit } from '@angular/core';
import { bookType } from '../model/book.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css']
})
export class MybookComponent implements OnInit {


  cart: bookType = []

  constructor(private cartService: CartService) { 
    this.cart = this.cartService.getCart();

  }

  ngOnInit(): void {
  }

  addMyBook(id: number){
    this.cartService.add(id);
  }


}

