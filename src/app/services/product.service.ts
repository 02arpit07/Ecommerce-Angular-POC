import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.service';
import { LoginService } from './login.service';

export interface Product {
  productName: string;
  manufacturerName: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  isActive: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdOn: Date;
  updatedOn: Date;
  category: Category
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8090/api/v1/product";

  constructor(private http:HttpClient,private loginservice:LoginService) { }

  addProduct(product) {
    return this.http.post(`${this.url}/add`,product,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    });
  }
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  getProductByPriceBetween(min , max) {
    return this.http.get<Product[]>(this.url+'/category'+'/'+min+'/'+max);
  }
  searchProducts(keyword) {
    return this.http.get<Product[]>(this.url+'/search'+'/'+keyword);
  }

  getProductById(id) {
    return this.http.get<Product>(this.url+'/'+id);
  }

}
