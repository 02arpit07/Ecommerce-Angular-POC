import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemsquantityService {

  private data: number;

  constructor() { }

  setOption(value) {      
    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  } 
}
