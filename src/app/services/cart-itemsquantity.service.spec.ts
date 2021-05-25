import { TestBed } from '@angular/core/testing';

import { CartItemsquantityService } from './cart-itemsquantity.service';

describe('CartItemsquantityService', () => {
  let service: CartItemsquantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemsquantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
