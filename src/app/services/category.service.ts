import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';


// If in future i make a form for category , i will follow this json structure
export interface Category {
  categoryId: number;
  // categoryName: string;
  // categoryImage: string;
  // categoryDescription: string;
  // createdOn: Date;
  // updatedOn: Date;
  // parentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:8090/api/v1";

  constructor(private http:HttpClient, private loginservice: LoginService) { }

  getAllCategories() {
    return this.http.get(`${this.url}/category`,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${this.loginservice.getToken()}`
      })
    });
  }
}
