import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.spinner.hide();
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
    this.authService.login(reqData,(respData)=>{ 
      this.spinner.hide();
      this.router.navigate(['/home'], {});
    });
  }
}
