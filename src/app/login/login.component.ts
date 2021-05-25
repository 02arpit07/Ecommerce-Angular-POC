import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    username:'',
    password:''
  }

  public loggedInUsername='';

  constructor(private loginService:LoginService,private router:Router,private toastr: ToastrService) { 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if((this.credentials.username!=''&&this.credentials.password!='')&&(this.credentials.username!=null && this.credentials.password!=null)) {
      //TOKEN GENERATE
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          console.log(response);

          this.loggedInUsername = response.username;
          this.loginService.loginUser(response.accessToken,response.username,response.roles);
          this.router.navigate(['/products'])
          // this.toastr.success('Logged in Successfully', 'NOTIFICATION');
          this.toastr.success('Login Successful', 'Notification', {
            timeOut: 4000,
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
