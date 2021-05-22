import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private cartService:CartService) { }

  orderHistory:any=[];

  ngOnInit(): void {
    this.cartService.getOrderHistory().subscribe(orders =>{
      console.log(orders);
      this.orderHistory = orders;
    })
  }

}
