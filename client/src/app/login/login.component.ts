import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

interface IUser {
  token?: any;
  role?: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login(data:any) {
    this.loading = true;
    this.api.login(data).subscribe(
      (result:any) => {
        this.auth.setToken(result['token']);
        this.auth.setRole(result['role']);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err)
        this.errorMessage = "Problem with login, try again"
        this.error = true;
        this.loading = false;
        this.loginForm.reset();
      }
    );
  }
}
