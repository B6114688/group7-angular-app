import { Component, OnInit } from '@angular/core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faHouse , faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { bookType } from '../model/book.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  

  faYoutube = faYoutube
  faHouse = faHouse
  faCartShopping = faCartShopping

  // constructor() { }

  // ngOnInit(): void {
    
  // }

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
    return this.cartService.getsumPrice();
  }

}
