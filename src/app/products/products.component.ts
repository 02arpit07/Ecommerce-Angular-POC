import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  filteredProducts:Product[] = [];
  category:string;
  productsInCart:any;

  constructor(private route:ActivatedRoute, private productService:ProductService,private cartService:CartService,private toastr: ToastrService,private loginService:LoginService,private router:Router) {
    this.productService.getAllProducts().subscribe(listOfProducts => {
      this.products = listOfProducts;
      console.log(listOfProducts);

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.categoryName === this.category) :
          this.products;
  
      })
    },
    (error => {
      console.log(error)
    })
    )
   }

  ngOnInit(): void {
    this.cartService.showMyCart().subscribe(data => {
      this.productsInCart = data;
      let totalItems = 0;
      for(let i=0; i<this.productsInCart.length;i++) {
        totalItems = totalItems + this.productsInCart[i].quantity;
      }
      localStorage.setItem('totalItems',totalItems.toString());
    })
  
  }

  addToCart(product:any) {
    this.cartService.addToCart(product).subscribe(data =>{
      console.log(data);
      this.toastr.success('Item added to cart', 'Notification', {
        timeOut: 4000,
        closeButton:true
      });
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


  formatLabelMin(value: number) {
    if (value >= 10000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  formatLabelMax(value: number) {
    if (value >= 10000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  fetchProductsByMinMax(min:any,max:any) {
    this.productService.getProductByPriceBetween(min,max).subscribe(data =>{
      this.filteredProducts = data;
    })

  }

  searchProducts(keyword:any) {
    if(keyword!=''&&keyword!=null){
      this.productService.searchProducts(keyword).subscribe(data =>{
        this.filteredProducts = data;
      },
      (error)=>{
        console.log(error);
      })

    }

  }

  getProd(prodId) {
    this.router.navigate(['productdetail' , prodId]);
    }

}
