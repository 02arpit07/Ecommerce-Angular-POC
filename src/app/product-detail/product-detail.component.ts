import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

 public products:any;
  private id;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private cartService: CartService,private toastr: ToastrService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const temp = params.get('id');
      this.id = temp;
      this.productService.getProductById(this.id).subscribe(data => {
        this.products = data;
      });
    });
  }


  addToCart(product:any) {
    this.cartService.addToCart(product).subscribe(data =>{
      console.log(data);
      this.toastr.success('Item added to cart', 'Notification', {
        timeOut: 4000,
        closeButton:true
      });
      this.router.navigate(['shopping-cart']);
    },
    error =>{
      console.log(error);
      this.toastr.error('Unable to add item to cart', 'Make sure you are logged in', {
        timeOut: 4000,
        closeButton:true
      });
    })
    let name =this.loginService.getUsername();
    console.log(name)
    if(name!='User'){
    let total = localStorage.getItem('totalItems');
    var y: number = +total;
    y=y+1;
    localStorage.setItem('totalItems',y.toString());
    console.log(total)
    }
  }



}
