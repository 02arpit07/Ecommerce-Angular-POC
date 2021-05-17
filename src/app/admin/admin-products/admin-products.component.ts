import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  public products:Product[] = [];
  subscription:Subscription;
  public filteredproducts:any = [];

  constructor(private productService:ProductService) { 
    this.subscription = this.productService.getAllProducts().subscribe(listOfProducts => {
      this.products = listOfProducts;
      this.filteredproducts = listOfProducts;
      console.log(listOfProducts);
    },
    (error => {
      console.log(error)
    })
    )
  }

  filter(keyword:string){
    this.filteredproducts = (keyword)?
    this.products.filter(p => p.productName.toLowerCase().includes(keyword.toLowerCase())) :
    this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
