import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user? : User | undefined;
  constructor(private spinner: NgxSpinnerService, private AuthService: AuthService){
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getProfile();
  }

  getProfile(){
    let user = this.AuthService.getUserInfoLocal();
    this.AuthService.getProfile(user?.accessToken+'',(user)=>{
      this.spinner.hide();
    });
  }
}
