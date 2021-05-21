import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient, private loginservice:LoginService) { }

  private url = 'http://localhost:8090/api/v1';

  addToCart(id:any) {
    console.log(id);
    console.log(this.loginservice.getToken());
    return this.http.post(`${this.url}/addToWishList/${id}`,{},{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    });
  }

  showMyCart() {
    return this.http.get(`${this.url}/showCart/`,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    })
  }

  //To wholly remove the product from cart
  removeProductFromCart(id:any) {
    return this.http.post(`${this.url}/removeFromCart/${id}`,{},{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    });
  }

  //To decrease the quantity
  removeOneProduct(id:any) {
    return this.http.post(`${this.url}/removeOneFromWishlist/${id}`,{},{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    });
  }

  showOrderHistory() {
    return this.http.get(`${this.url}/checkout/`,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    })
  }


}
