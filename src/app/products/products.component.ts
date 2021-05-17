import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '../services/category.service';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  filteredProducts:Product[] = [];
  categories:any = [];
  category:string;

  constructor(private route:ActivatedRoute, private productService:ProductService,private categoryService:CategoryService) {
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

    this.categoryService.getAllCategories().subscribe(listOfCategories=>{
      this.categories = listOfCategories;
      console.log(listOfCategories)
    },
    (error =>{
      console.log(error)
    })
    )
   }

  ngOnInit(): void {
  }

}
