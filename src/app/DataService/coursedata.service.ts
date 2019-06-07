import { Injectable } from '@angular/core';
import { Courses } from '../Models/Courses';
import { Root_URL } from '../Models/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DropDownList } from '../Models/DropDownList';


@Injectable({
  providedIn: 'root'
})
export class CoursedataService {

  constructor(private _http: HttpClient) { }
  isCreateMode: false;
  isActive: false;
  course: Observable<Courses[]>

   getCourseDetailById(CourseID: string): any {
   return this._http.get<any>(Root_URL + `Course/get/${CourseID}`);
  }

  DepartmentToBindDDL() {
    debugger;
    return this._http.get<any>(Root_URL + `Department/get`);
  }



  AddCourse(course: Courses, isCreateMode: boolean): any {
    debugger;
    return isCreateMode
      ? this._http.post<Courses>(Root_URL + `Course/create`, course)
      : this._http.post<Courses>(Root_URL + `Course/update`, course)

  }

  deleteCourse(CourseID: string): any {
    return this._http.get<Courses>(Root_URL + `Course/delete/${CourseID}`);
  }

  

}

