import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsquantityService } from '../services/cart-itemsquantity.service';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn:boolean;
  public loggedInUser;
  public isAdmin;
  public totalItems;
  public x='0';
// @Input() public totalItemssss;
  // @Input() public loggedInUser ='User';

  constructor(private loginservice:LoginService,private cartItems:CartItemsquantityService,private cart:CartService,private router:Router) { 
  }

  ngOnInit(): void {
  }
  ngDoCheck(){
    this.loggedIn = this.loginservice.isLoggedIn();
    this.loggedInUser = this.loginservice.getUsername();
    this.isAdmin = this.loginservice.getLoggedInUserRoles();
    this.totalItems = localStorage.getItem('totalItems');
    // this.totalItems = this.cartItems.getOption();

    // this.cart.showMyCart().subscribe(data => {
    //   this.products = data;
    //   console.log(this.products.length);
    //   let totalItems = 0;
    //   for(let i=0; i<this.products.length;i++) {
    //     totalItems = totalItems + this.products[i].quantity;
    //   }
    //   this.totalItems = totalItems;
    // })
    
  }

  logout() {
    this.loginservice.logout();
    localStorage.setItem('totalItems',this.x);
    // this.router.navigate[('home')]
    
    location.reload();
  }

}
