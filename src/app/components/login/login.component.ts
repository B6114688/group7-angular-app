import { HomepageComponent } from './../homepage/homepage.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AppRoutingModule } from 'src/app/AppRoutingModule';
import { Route } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: LoginService) { }

  ngOnInit(): void {
  }

  loginButton() {
    this.ps.sendDataLogin(this.loginForm.value).subscribe( //ส่ง email pass ไปเช็คที่ app.js
      data => {
        alert('Login successfully');
        this.loginForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  
    //this.router.navigate(['/']);
    //เขียนให้เช็คสถานะที่ส่งมา = true แล้วเด้งไปหน้า home
  }
}
