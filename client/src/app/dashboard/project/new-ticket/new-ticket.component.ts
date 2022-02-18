import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html'
})
export class NewTicketComponent implements OnInit {

  loading: boolean = false;
  users: any = [];
  id: any;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.api.getUsers().subscribe((data:any) => {
      this.users = data;
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  ticketForm = new FormGroup({
    project: new FormControl(''),
    title: new FormControl(''),
    status: new FormControl('Open'),
    severity: new FormControl('High'),
    details: new FormControl(''),
    user: new FormControl('')
  });

  create(data:any) {
    let ticket:any;
    this.loading = true;
    this.api.createTicket(data).subscribe(
      data => {
        ticket = data;
        this.api.pushTicket(ticket.project, ticket._id).subscribe(
          data => {
            this.router.navigate([`/dashboard/details/${this.id}`]);
          }, error => {
            this.router.navigate(['/error']);
          }
        )
      }, error => {
        this.router.navigate(['/error']);
      }
    );
  }

}
