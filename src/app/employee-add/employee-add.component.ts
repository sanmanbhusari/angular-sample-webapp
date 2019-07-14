import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  data: Employee[] = [];
  employeeId: number = 0;
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date = null;
  dateOfJoining: Date = null;
  managerId: number = 0;
  isLoadingResults = false;
 constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      'employeeId': [null, null],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'dateOfBirth': [null, null],
      'dateOfJoining': [null, Validators.required],
      'managerId': [null,null]
    });
    this.employeeForm.patchValue({ employeeId: 0,managerId:0});
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
  onFormSubmit(form: NgForm) {
  
    this.isLoadingResults = true;
    this.api.addEmployee(form)
      .subscribe(res => {
        if (res) {
          let id = res['employeeId'];
          this.router.navigate(['/employee-details', id]);
        }
        this.isLoadingResults = false;
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
