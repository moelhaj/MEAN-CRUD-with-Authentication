import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <mat-toolbar>
      <div class="container">  
        Issue Tracker
        <button style="float:right;" mat-raised-button (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>
    <div class="container" style="padding: 20px;">
    <router-outlet></router-outlet>
    </div>
    `
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
