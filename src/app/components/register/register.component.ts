import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: UsersService) { }

  ngOnInit(): void {
  }

  addUser() {
    this.ps.addUser(this.userForm.value).subscribe(
      data => {
        alert('Register successfully');
        this.userForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  



}
