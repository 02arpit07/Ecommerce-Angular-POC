import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItemsquantityService } from '../services/cart-itemsquantity.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private cart:CartService, private router:Router,private toastr: ToastrService) {
   }
  public products:any =[];
  public totalAmount = 0;
  public totalItems = 0;

  public userHasAddressSaved:any;
  public userAddress:any;
  public userPhone:any;

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
      localStorage.setItem('totalItems',this.totalItems.toString());
    })

    //To check whether we have Address corresponding to currently loggedin user
    this.cart.checkIfAddressIsExisting().subscribe(address=>{
      console.log(address.customer_address);

      this.userAddress = address.customer_address +","+address.city +" ," +address.state;
      this.userPhone =address.phone_number;
      // this.userHasAddressSaved = address.customer_address;
      if(address.customer_address!=null)
      this.userHasAddressSaved = true;
    },
    (error)=>{
      this.userHasAddressSaved =false;
    }
    )
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
      localStorage.setItem('totalItems',totalItems.toString())
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
      localStorage.setItem('totalItems',totalItems.toString())
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
      localStorage.setItem('totalItems',totalItems.toString())
      })
    })
  }

  checkOut(){
    if(this.totalItems>0)
    {
      this.cart.checkout().subscribe(data => {
        console.log(data);
        this.ngOnInit();//To refresh the page once we have checked out
        this.toastr.success('Order Successfully Placed', 'Notification', {
          timeOut: 4000,
          closeButton:true
        });
        let x:number = 0;
        localStorage.setItem('totalItems',x.toString())
        this.router.navigate(['/order-success'])
      },
      (error)=>{
        console.log(error);
      }
      )
    }
    else{
      this.toastr.error('You have no items in your Cart', 'Notification', {
        timeOut: 4000,
        closeButton:true
      });
    }
  }

  gotoShippingInfoForm() {
    this.router.navigate(['/check-out'])
  }
}
