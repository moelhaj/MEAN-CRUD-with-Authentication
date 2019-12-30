import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  error: boolean = false;
  errorMessage;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login(data) {
    this.loading = true;
    this.api.login(data).subscribe(
      data => {
        this.auth.setToken(data['token']);
        this.auth.setRole(data['role']);
        this.router.navigate(['/']);
      }, err => {
        if(typeof(err.error) === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Problem with login, try again';
        }
        this.error = true;
        this.loading = false;
        this.loginForm.reset();
      }
    );
  }
}
