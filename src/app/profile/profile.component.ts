import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService, private authService: AuthService){
    
  }
  ngOnInit(): void {
    
  }
}