import { Component, OnInit } from '@angular/core';
import { TFRgridService } from '../../../DataService/tfrgrid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursedataService } from '../../../DataService/coursedata.service';
import { Courses } from '../../../Models/Courses';
import { MaterialModule } from '../../../Models/material';
import { DropDownList } from '../../../Models/DropDownList';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent implements OnInit {

  Course = new Courses();
  isCreateMode = false;
  //Department: DropDownList[] = [];
  Department = [];



  constructor(private tfrGridService: TFRgridService, private route: ActivatedRoute,
    private router: Router, private dataservice: CoursedataService, private toastr: ToastrService) {


  }

  ngOnInit() {
    this.DepartmentDDL();
    const CourseID = this.route.snapshot.paramMap.get('id');
    if (!CourseID) {
      this.isCreateMode = true;
    } else {

      this.dataservice.getCourseDetailById(CourseID).subscribe(
        returnedCourseDetail => this.getCourseSuccess(returnedCourseDetail),

      );
    }
  }

  DepartmentDDL() {
    debugger;
    this.dataservice.DepartmentToBindDDL().subscribe(
      returnedDepartmentDetail => this.getDepartmentToBindDDLSuccess(returnedDepartmentDetail),
     
    );
  }
  getDepartmentToBindDDLSuccess(DepartmentToBindDDL) {
    debugger;
    this.Department = DepartmentToBindDDL;
  }

  sCourse(AddCourse) {
    debugger;
    console.log(AddCourse);
    this.toastr.success('Course Added Successfully.');
    //this.tfrHelper.tfrToaster('ZipCode been saved successfully!', '', this.tfrConstants.tfrSweetAlertType.Success);
    this.router.navigateByUrl(`CourseList`)
  }


  getCourseSuccess(Course) {
    debugger;
    //alert("inside Course get by id process.");
    this.Course = Course;
  }

  saveChanges() {
    debugger;
    //alert("savchanges");
    this.dataservice.AddCourse(this.Course, this.isCreateMode).subscribe(
      AddCourse => this.sCourse(AddCourse),


    );
  }


}
