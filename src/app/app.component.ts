import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    employees: Employee[];
    loading: boolean;
    idEmployee: string;

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(){ 
        this.idEmployee ="";
    }
 
    getEmployees(){
        this.loading = true;
        if(this.idEmployee !== ""){
            this.employeeService.getById(parseInt(this.idEmployee)).subscribe(employee => {
                    this.employees = [];
                    this.employees.push(employee);
                }, 
                e => console.log(e)
                ,()=>{
                    this.loading = false;
                });
        }
        else
        {
            this.employeeService.getAll().subscribe(list => this.employees = list, 
                e => console.log(e)
                ,()=>{
                    this.loading = false;
                });
        }
    }
}
