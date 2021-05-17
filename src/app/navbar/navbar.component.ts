import { Component, OnInit,Input } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn:boolean;
  public loggedInUser;
  public isAdmin;
  // @Input() public loggedInUser ='User';

  constructor(private loginservice:LoginService) { 
  }

  ngOnInit(): void {
  }
  ngDoCheck(){
    this.loggedIn = this.loginservice.isLoggedIn();
    this.loggedInUser = this.loginservice.getUsername();
    this.isAdmin = this.loginservice.getLoggedInUserRoles();
  }

  logout() {
    this.loginservice.logout();
    location.reload();
  }

}
