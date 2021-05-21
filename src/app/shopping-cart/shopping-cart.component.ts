import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private cart:CartService, private router:Router) { }
  public products:any =[];
  public totalAmount = 0;
  public totalItems = 0;

  ngOnInit(): void {
    this.cart.showMyCart().subscribe(data => {
      this.products = data;
      console.log(this.products.length);
      let totalAmount = 0;
      let totalItems = 0;
      for(let i=0; i<this.products.length;i++) {
        totalAmount = totalAmount + this.products[i].product.price * this.products[i].quantity;
        totalItems = totalItems + this.products[i].quantity;
      }
      this.totalAmount = totalAmount;
      this.totalItems = totalItems;
    })
  }

  addOneProduct(id:any) {
    console.log(id);
    this.cart.addToCart(id).subscribe(dataaa =>{
      this.cart.showMyCart().subscribe(data =>{
        this.products = data;
        let totalAmount = 0;
        let totalItems = 0;
        for(let i=0; i<this.products.length;i++) {
          totalAmount = totalAmount + this.products[i].product.price * this.products[i].quantity;
          totalItems = totalItems + this.products[i].quantity;
        }
        this.totalAmount = totalAmount;
      this.totalItems = totalItems;
      })
    })
  }

  removeOneProduct(id:any) {
    console.log(id);
    this.cart.removeOneProduct(id).subscribe(dataaa =>{
      this.cart.showMyCart().subscribe(data =>{
        this.products = data;
        let totalAmount = 0;
        let totalItems = 0;
        for(let i=0; i<this.products.length;i++) {
          totalAmount = totalAmount + this.products[i].product.price * this.products[i].quantity;
          totalItems = totalItems + this.products[i].quantity;
        }
        this.totalAmount = totalAmount;
      this.totalItems = totalItems;
      })
    })
  }

  removeWholeProduct(id:any) {
    console.log(id);
    this.cart.removeProductFromCart(id).subscribe(dataaa =>{
      this.cart.showMyCart().subscribe(data =>{
        this.products = data;
        let totalAmount = 0;
        let totalItems = 0;
        for(let i=0; i<this.products.length;i++) {
          totalAmount = totalAmount + this.products[i].product.price * this.products[i].quantity;
          totalItems = totalItems + this.products[i].quantity;
        }
        this.totalAmount = totalAmount;
      this.totalItems = totalItems;
      })
    })
  }


}
