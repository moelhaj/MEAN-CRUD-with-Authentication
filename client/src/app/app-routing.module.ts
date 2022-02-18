import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './shared/route.guard';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { NewProjectComponent } from './dashboard/new-project/new-project.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { NewTicketComponent } from './dashboard/project/new-ticket/new-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard], children: [
      { path: '', component: ProjectsComponent },
      { path: 'details/:id', component: ProjectComponent },
      { path: 'new', component: NewProjectComponent },
      { path: 'ticket/new/:id', component: NewTicketComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
