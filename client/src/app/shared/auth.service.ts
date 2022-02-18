import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = 'it-st';
  role: string = 'it-ur';

  constructor(private router: Router) { }

  setToken(token: string) {
    sessionStorage.setItem(this.token, token);
  }

  getToken() {
    return sessionStorage.getItem(this.token);
  }

  setRole(role: string) {
    return sessionStorage.setItem(this.role, role);
  }

  getRole() {
    return sessionStorage.getItem(this.role);
  }

  isLogged() {
    return this.getToken() !== null;
  }

  isAdmin() {
    return this.getRole() === 'Admin';
  }

  logout() {
    sessionStorage.removeItem(this.token);
    sessionStorage.removeItem(this.role);
    this.router.navigate(['/login']);
  }
}