import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent {

  loading: boolean = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  projectForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl('Open'),
    details: new FormControl('')
  });

  create(data:any) {
    this.loading = true;
    if (this.auth.isAdmin()) {
      this.api.createProject(data).subscribe(
        data => {
          window.location.href = "/";
        }, error => {
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.router.navigate(['/error']);
    }
  }

}
