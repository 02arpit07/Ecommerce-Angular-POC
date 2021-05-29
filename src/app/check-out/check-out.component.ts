import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShippingInfo } from '../model/shipping-info';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  shippingInfo: ShippingInfo = {
    customer_address: '',
    city: '',
    state: '',
    phone_number: '',
   };

  constructor(private cartService:CartService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addShippingAdress(){
    console.log(this.shippingInfo);
    if((this.shippingInfo.customer_address!='' && this.shippingInfo.city!= '' && this.shippingInfo.state!= '' && this.shippingInfo.phone_number!= '')&&(this.shippingInfo.customer_address!= null && this.shippingInfo.city!= null && this.shippingInfo.phone_number!= null && this.shippingInfo.state!= null ))
    {
      this.cartService.sendShippingInfo(this.shippingInfo).subscribe(
        (response:any)=>{
          console.log(response);
          this.toastr.success('You have successfully added Address', 'Notification', {
            timeOut: 4000,
            closeButton:true
          });
          this.router.navigate(['shopping-cart'])
        },
        (error:any)=>{
          console.log(error);
        }
      )
    }
  }

}
