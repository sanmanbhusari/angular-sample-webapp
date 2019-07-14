import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "/api/employees";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl)
      .pipe(
        tap(()=>console.log('fetched employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  getEmployee(employeeId: number): Observable<Employee> {
    const url = `${apiUrl}/${employeeId}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched employee employeeId=${employeeId}`)),
      catchError(this.handleError<Employee>(`getEmployee employeeId=${employeeId}`))
    );
  }

  addEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(apiUrl, employee, httpOptions).pipe(
      tap((employee: Employee) => console.log(`added employee w/ employeeId=${employee.employeeId}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employeeId, employee): Observable<any> {
    const url = `${apiUrl}/${employeeId}`;
    return this.http.put(url, employee, httpOptions).pipe(
      tap(_ => console.log(`updated employee employeeId=${employeeId}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(employeeId): Observable<Employee> {
    const url = `${apiUrl}/${employeeId}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted employee employeeId=${employeeId}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
}
