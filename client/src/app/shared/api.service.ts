import { Injectable } from '@angular/core';
import { config } from '../../assets/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // Project
  getProjects() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(`${config.projectsURI}`, httpOptions);
  }

  getProject(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(`${config.projectsURI}/${id}`, httpOptions);
  }

  createProject(project: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.post(config.projectsURI, project, httpOptions);
  }

  updateProject(data: any) {
    const id = data.id;
    const project = {
      title: data.title,
      status: data.status,
      details: data.details,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.put(`${config.projectsURI}/${id}`, project, httpOptions);
  }

  pushTicket(projectId: any, ticketId: any) {
    const ticket = { ticket: ticketId };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.put(
      `${config.pushTicketURI}/${projectId}`,
      ticket,
      httpOptions
    );
  }

  pullTicket(projectId: any, ticketId: any) {
    const ticket = { ticket: ticketId };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.put(
      `${config.pullTicketURI}/${projectId}`,
      ticket,
      httpOptions
    );
  }

  closeProject(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(`${config.projectsURI}/close/${id}`, httpOptions);
  }

  deleteProject(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.delete(`${config.projectsURI}/${id}`, httpOptions);
  }

  // Tickets
  getTickets() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(config.ticketURI, httpOptions);
  }

  getTicket(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(`${config.ticketURI}/${id}`, httpOptions);
  }

  createTicket(ticket: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.post(config.ticketURI, ticket, httpOptions);
  }

  updateTicket(id: any, title: any, severity: any, details: any, user: any) {
    const ticket = {
      title,
      severity,
      details,
      user,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.put(`${config.ticketURI}/${id}`, ticket, httpOptions);
  }

  closeTicket(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(`${config.ticketURI}/close/${id}`, httpOptions);
  }

  deleteTicket(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.delete(`${config.ticketURI}/${id}`, httpOptions);
  }

  // User
  login(user: any) {
    return this.http.post(`${config.userURI}/login`, user);
  }

  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
      }),
    };
    return this.http.get(config.userURI, httpOptions);
  }
}
