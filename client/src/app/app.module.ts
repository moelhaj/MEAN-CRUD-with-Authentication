import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Shared
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { RouteGuard } from './shared/route.guard';
// Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { NewProjectComponent } from './dashboard/new-project/new-project.component';
import { NewTicketComponent } from './dashboard/project/new-ticket/new-ticket.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { DeleteProjectDialog } from './dashboard/projects/projects.component';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ErrorComponent,
    ProjectComponent,
    NewProjectComponent,
    NewTicketComponent,
    ProjectsComponent,
    DeleteProjectDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule
  ],
  entryComponents: [
    DeleteProjectDialog
  ],
  providers: [ApiService, RouteGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
