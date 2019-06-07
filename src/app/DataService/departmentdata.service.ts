import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Department } from '../Models/Department';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Root_URL } from '../Models/config';
import { DropDownList } from '../Models/DropDownList';

@Injectable()
export class DepartmentdataService {
   constructor(private _http: HttpClient) { }
  isCreateMode: false;
  isActive: false;
  department: Observable<Department[]>;

  //getDepartment() {

  //  return this.http.get<Department[]>(Root_URL  + '/Department')
  //}

  getDepartmentDetailById(DepartmentID: string): any {
    //return this.http.get<any>(Root_URL + `/Department/get/${ DepartmentID }`);

    return this._http.get<any>(Root_URL + `Department/get/${DepartmentID}`);
  }

 


  AddDepartment(department: Department, isCreateMode: boolean): any {
    debugger;
    return isCreateMode
       
      ? this._http.post<Department>(Root_URL + `Department/create`, department)
      : this._http.post<Department>(Root_URL + `Department/update`, department)
      
  }

  deleteDepartment(DepartmentID: string): any

  {
    return  this._http.get<Department>(Root_URL + `Department/delete/${DepartmentID}`);
  }

  //DepartmentDetailById(DepartmentId: string): any {
  //  debugger;
  //  return this.http.get<any>(ROOT_URL + `/Department/get/${DepartmentId}`);
  //}
  

  }

  
