import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['employeeId','firstName', 'lastName', 'dateOfBirth','dateOfJoining','managerId'];
  data: Employee[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService){ }

  ngOnInit() {
    this.api.getEmployees()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
