import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories:any = [];
  @Input('category') category;

  constructor(private categoryService:CategoryService) { 

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
