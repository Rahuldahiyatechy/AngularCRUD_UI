import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/Employee';
import { TFRgridService } from '../../../DataService/tfrgrid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDataService } from '../../../DataService/employee-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.css']
})
export class EmployeeAddEditComponent implements OnInit {

  Employee = new Employee();
  isCreateMode = false;
  //Department: DropDownList[] = [];
 Course = [];



  constructor(private tfrGridService: TFRgridService, private route: ActivatedRoute,
    private router: Router, private dataservice: EmployeeDataService, private toastr: ToastrService) {


  }

  ngOnInit() {
    this.CourseDDL();
    const EmployeeID = this.route.snapshot.paramMap.get('id');
    if (!EmployeeID) {
      this.isCreateMode = true;
    } else {

      this.dataservice.getEmployeeDetailById(EmployeeID).subscribe(
        returnedEmployeeDetail => this.getEmployeeSuccess(returnedEmployeeDetail),

      );
    }
  }

  CourseDDL() {
    debugger;
    this.dataservice.CourseToBindDDL().subscribe(
      returnedCourseDetail => this.getCourseToBindDDLSuccess(returnedCourseDetail),

    );
  }
  getCourseToBindDDLSuccess(CourseToBindDDL) {
    debugger;
    this.Course = CourseToBindDDL;
  }
  

  sEmployee(AddEmployee) {
    debugger;
    console.log(AddEmployee);
    this.toastr.success('Employee Added Successfully.');
    this.router.navigateByUrl(`EmployeeList`)
  }


  getEmployeeSuccess(Employee) {
    debugger;
    //alert("inside Course get by id process.");
    this.Employee = Employee;
  }

  saveChanges() {
    debugger;
    //alert("savchanges");
    this.dataservice.AddEmployee(this.Employee, this.isCreateMode).subscribe(
      AddEmployee => this.sEmployee(AddEmployee),


    );
  }


}
