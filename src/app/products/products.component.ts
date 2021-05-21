import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';
import { CartService } from '../services/cart.service';
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

  constructor(private route:ActivatedRoute, private productService:ProductService,private cartService:CartService,private toastr: ToastrService) {
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

}
