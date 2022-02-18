import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  loading: boolean = true;
  projects: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['details', 'title', 'status', 'tickets', 'action'];
  dataSource:any;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getProjects().subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.projects = true;
      this.loading = false;
    }, error => {
      if (error.status == 401) {
        this.auth.logout();
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDialog(id:any, title:any) {
    const dialogRef = this.dialog.open(DeleteProjectDialog, {
      width: '350px',
      data: { id, title }
    });
  }
}

// Delete Dialog

@Component({
  selector: 'delete-dialog',
  template: `
  <div [class.loader]="loading"></div>
  <h1 mat-dialog-title>Delete {{data.title}}</h1>
  <div mat-dialog-content>
    <p>Are you sure you want to delete this project?</p>
  </div>
  <div mat-dialog-actions style="text-align: center;">
    <button mat-raised-button (click)="close()">Cancel</button>
    <button mat-raised-button color="warn" (click)="delete(data.id)">Delete</button>
  </div>
  `
})
export class DeleteProjectDialog {

  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService, private api: ApiService, private router: Router) { }

  delete(id:any) {
    this.loading = true;
    if (this.auth.isAdmin()) {
      this.api.deleteProject(id).subscribe(() => {
        window.location.href = "/";
      }, error => {
        this.router.navigate(['/error']);
      });
    } else {
      this.router.navigate(['/error']);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}



