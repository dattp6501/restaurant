import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  
  constructor(private router: Router, private spinner: NgxSpinnerService, private authService: AuthService, private formBuilder: FormBuilder){
    
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  login(){
    if(this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    let reqData = {
      "username": this.f['username'].value, 
      "password": this.f['password'].value
    };
    let user = new User();
    this.authService.login(reqData,(respData)=>{ 
      user.username = reqData.username;
      user.accessToken = respData.accessToken;
      user.refreshToken = respData.refreshToken;
      this.authService.getProfile(user.accessToken+'', (userResp)=>{
        this.spinner.hide();
        user.id = userResp.id;
        user.firstName = userResp.fullname;
        user.avatar = userResp.avatar;
        localStorage.removeItem("userInfo");
        localStorage.setItem("userInfo", JSON.stringify(user));
        this.router.navigate(['/home'], {});
      })
    });
  }
}
