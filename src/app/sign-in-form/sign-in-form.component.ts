import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  userName: string;
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      console.log(form.value);
    }
  }

}
