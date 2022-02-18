import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  loading: boolean = true;
  id: any;
  project: any;
  tickets: any = [];
  noTickets: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.api.getProject(this.id).subscribe(data => {
        this.project = data;
        this.getTickets(this.project.tickets)
      }, error => {
        this.router.navigate(['/error']);
      });
    });
  }

  getTickets(ids:any) {
    if (ids.length === 0) {
      this.loading = false;
      this.noTickets = true;
    } else {
      ids.forEach((ticket:any) => {
        this.api.getTicket(ticket).subscribe(data => {
          this.tickets.push(data);
          this.loading = false;
        }, error => {
          this.router.navigate(['/error']);
        })
      });
    }
  }

  finish(project:any, ticket:any) {
    this.loading = true;
    this.api.pullTicket(project, ticket).subscribe(
      data => {
        window.location.href = `/dashboard/details/${this.id}`;
      }, error => {
        this.router.navigate(['/error']);
      }
    );
  }

}
