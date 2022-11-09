import { Component, OnInit } from '@angular/core';
import { bookType } from '../model/book.model';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  

  cart: bookType = []

  constructor(private cartService: CartService) { 
    this.cart = this.cartService.getCart();

  }

  ngOnInit(): void {
  }

  getCounter(){
    return this.cartService.getCounter();
  }

  getSumPrice(){
    return this.cartService.getsumPrice;
  }
 


}
