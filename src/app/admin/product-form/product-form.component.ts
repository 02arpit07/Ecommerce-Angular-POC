import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    productName: '',
    manufacturerName: '',
    category: { categoryId: 0},
    price: 0,
    imageUrl: '',
    shortDescription: '',
    longDescription: '',
    isActive: true,
    isDeleted: true,
    isFeatured: true,
    createdOn: new Date(),
    updatedOn: new Date(),
    // createdOn: '2021-04-28',
    // updatedOn: '2021-04-28',
   };

  categories:Object=[];

  constructor( private categoryService: CategoryService,private productService:ProductService,private router:Router,private toastr: ToastrService) {
    categoryService.getAllCategories().subscribe(
      (response:any)=>{
        this.categories = response;

      },
      (error)=>{
        console.log(error);
      }
    );
   }

  ngOnInit(): void {
  }

  addProduct(){
    console.log(this.product);
    // this.product.createdOn = this.product.createdOn.split('Z')[0];
    if((this.product.productName!='' && this.product.category.categoryId!= 0 && this.product.manufacturerName!= '' && this.product.imageUrl!= '' && this.product.shortDescription!= '' && this.product.longDescription!= '')&&(this.product.productName != null && this.product.category.categoryId!= null && this.product.manufacturerName!= null && this.product.imageUrl!= null && this.product.shortDescription!= null && this.product.longDescription!= null))
    {
      this.productService.addProduct(this.product).subscribe(
        (response:any)=>{
          console.log(response);
          this.toastr.success('Product Added Successfully', 'Notification', {
            timeOut: 4000,
            closeButton:true
          });
          this.router.navigate(['/admin/products'])
        },
        (error:any)=>{
          console.log(error);
        }
      )
    }
  }

}
