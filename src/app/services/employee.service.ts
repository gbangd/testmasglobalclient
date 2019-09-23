import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Employee } from '../models/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService{

  protected employeeUrl = environment.urlWebAPI+"/employee/";

  constructor(private http: HttpClient) { super(); }

  getAll(): Observable<Employee[]> {
    let url = this.employeeUrl;
    return this.http.get<Employee[]>(url)
                    .pipe(catchError(this.handleError));
  }

  getById(id:number): Observable<Employee> {
    let url = this.employeeUrl+"/"+id;
    return this.http.get<Employee>(url)
                    .pipe(catchError(this.handleError));
  }
  
}
