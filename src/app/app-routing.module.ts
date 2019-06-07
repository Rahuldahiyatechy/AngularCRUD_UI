import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentListComponent } from './Modules/department-list/department-list.component';

import {  DepartmentAddEditComponent } from './Modules/department-add-edit/department-add-edit.component';
import { CourseListComponent } from './Modules/Courses/course-list/course-list.component';
import { CourseAddEditComponent } from './Modules/Courses/course-add-edit/course-add-edit.component';
import { EmployeeListComponent } from './Modules/Employee/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './Modules/Employee/employee-add-edit/employee-add-edit.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent, pathMatch: 'full' },

  { path: 'DepartmentList', component: DepartmentListComponent },

  { path: 'DepartmentEdit', component: DepartmentAddEditComponent },

  { path: 'DepartmentEdit/:id', component: DepartmentAddEditComponent },

  { path: 'CourseList', component: CourseListComponent },

  { path: 'CourseEdit', component: CourseAddEditComponent },

  { path: 'CourseEdit/:id', component: CourseAddEditComponent },

  { path: 'EmployeeList', component: EmployeeListComponent },

  { path: 'EmployeeEdit', component: EmployeeAddEditComponent },

  { path: 'EmployeeEdit/:id', component: EmployeeAddEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
