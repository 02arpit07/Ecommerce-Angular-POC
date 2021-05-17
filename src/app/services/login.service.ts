import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8090/api/auth";
  
  constructor(private http:HttpClient) { 
  }


  generateToken(credentials) {
    return this.http.post(`${this.url}/signin`,credentials,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }
  getUsername() {
    return localStorage.getItem("username");
  }

  loginUser(token,username,roles) {
    localStorage.setItem("token",token)
    localStorage.setItem("username",username)

    var roles_list="";
    for(let i = 0;i<roles.length;i++){
      roles_list = roles_list  + roles[i];
    }
    console.log(roles_list)
    localStorage.setItem("roles",roles_list)
    return true;
  }

  isLoggedIn() {
   let token = localStorage.getItem("token")
    if(token==undefined || token==='' || token==null) {
      return false;
    }
    else{
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.setItem("username",'User')
    return true;
  }

  getLoggedInUserRoles(){
    var roles = ""
    roles = localStorage.getItem("roles")+"";
    // roles = roles +"" this "" is appended to avoid null value which comes if it is not present in local storage
    // console.log(roles)
    if(roles.includes("ROLE_ADMIN")){
      // console.log("yes it contains role_admin")
      return true;
    }
    return false;
  }

  // saveLoggedInUsername(name) {
  //   console.log(name);
  //   this.loggedInUsername = name;
  //   console.log(this.loggedInUsername)
  // }

  // getLoggedInUsername() {
  //   return this.loggedInUsername;
  // }
}
