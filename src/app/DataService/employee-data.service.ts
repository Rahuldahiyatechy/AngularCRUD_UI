import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee';
import { Root_URL } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  constructor(private _http: HttpClient) { }
  isCreateMode: false;
  isActive: false;
  employee: Observable<Employee[]>
  
  getEmployeeDetailById(EmployeeID: string): any {
  return this._http.get<any>(Root_URL + `Employee/get/${EmployeeID}`);
  }

  CourseToBindDDL() {
    debugger;
    return this._http.get<any>(Root_URL + `Course/get`);
  }



  AddEmployee (employee: Employee, isCreateMode: boolean): any {
    debugger;
    return isCreateMode
      ? this._http.post<Employee>(Root_URL + `Employee/create`, employee)
      : this._http.post<Employee>(Root_URL + `Employee/update`, employee)

  }

  deleteEmployee(EmployeeID: string): any {
    return this._http.get<Employee>(Root_URL + `Employee/delete/${EmployeeID}`);
  }



}

