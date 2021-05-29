import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  credentials = {
    username:'',
    email:'',
    password:'',
    role:["admin","user"]
  }

  constructor(private signinService:SigninService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if((this.credentials.username!=''&&this.credentials.password!=''&&this.credentials.email!='')&&(this.credentials.username!=null && this.credentials.password!=null&& this.credentials.email!=null)) {

      console.log(this.credentials);
      
      this.signinService.register(this.credentials).subscribe(
        (response:any)=>{
          console.log(response);
          this.router.navigate(['/login'])
          // this.toastr.success('Logged in Successfully', 'NOTIFICATION');
          this.toastr.success('Registered Successfully', 'Notification', {
            timeOut: 3000,
            closeButton:true
          });

        },
        error =>{
          if(error.status ==401){
            this.toastr.error('Invalid Credentials', 'Notification', {
              timeOut: 4000,
              closeButton:true
            });
          }
        }
      )
    }
  }

}
