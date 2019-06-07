import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentAddEditComponent } from './Modules/department-add-edit/department-add-edit.component';
import { DepartmentListComponent } from './Modules/department-list/department-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentdataService } from '../app/DataService/departmentdata.service';
import { TFRgridService } from './DataService/tfrgrid.service';
import { MaterialModule} from '../app/Models/material';
import { CourseListComponent } from './Modules/Courses/course-list/course-list.component';
import { CourseAddEditComponent } from './Modules/Courses/course-add-edit/course-add-edit.component';
import { EmployeeListComponent } from './Modules/Employee/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './Modules/Employee/employee-add-edit/employee-add-edit.component';
import { CoursedataService } from './DataService/coursedata.service';
import { EmployeeDataService } from './DataService/employee-data.service';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    DepartmentAddEditComponent,
    DepartmentListComponent,
    CourseListComponent,
    CourseAddEditComponent,
    EmployeeListComponent,
    EmployeeAddEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
   ToastrModule.forRoot()
  ],
  providers: [DepartmentdataService, TFRgridService, CoursedataService, EmployeeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
