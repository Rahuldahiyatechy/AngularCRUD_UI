import { Component, OnInit } from '@angular/core';
import { Courses } from '../../../Models/Courses';
import { CoursedataService } from '../../../DataService/coursedata.service';
import { TFRgridService } from '../../../DataService/tfrgrid.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';


@Component({

  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  ngOnInit(): void { }


  columns: any = [];
  columnDefs: any = [];
  isRefresh = false;
  tableId = 'Course';
  dataTableMethodType = 'post';
  self;
  deleteCourseId: any;
  isAllowedAnonymous = true;
  tfrConstants: any;
  settingService: any;

  constructor(private route: Router, private tfrGridService: TFRgridService, private dataservice: CoursedataService, private toastr: ToastrService) { this.self = this; }




  ngAfterViewInit() {
    this.generateTableStructure();
  }



  generateTableStructure() {
    debugger;
   


    this.columns = [
      // instead of title you can also define the headers in html as well. This just gives a dynamic naming for headers.
      {
        data: 'Actions', name: 'Actions', title: 'Actions',
        render: (data, type, row) => this.tfrGridService.getActionsColumn(row.id, true, true)
      },

      // { data: 'username', name: 'username', title: 'User Name' },
      { data: 'name', name: 'name', title: 'Name' },
      { data: 'description', name: 'description', title: 'Description' },
      { data: 'departmentName', name: 'departmentName', title: 'Department Name' },


    ];

    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [3]
      },
      {
        targets: [0],//disable sorting on logo column 
        orderable: false
      }
      // {
      //     targets: [this.actionsColumnIndex],//disable sorting on Actions column 
      //     orderable: false
      // },
      // {
      //     targets: [this.idColumnIndex],//hide ID column
      //     visible: false
      // },
      // {
      //     targets: [this.logoColumnIndex],//disable sorting on logo column 
      //     orderable: false 
      // }
    ];

    this.tfrGridService.fetchGridData(
      false,
      'get',
      'Course/get',
      'Course',
      this.columns,
      10,
      this.columnDefs,
      0,
      'asc',
      null,
      this.gridDrawCompletedCallBack,
      this.gridLoadedCompletely,
      true,
      null,
      false);

  }



  gridDrawCompletedCallBack = () => {
    const that = this.self; // get the class instance
    // bind the action column event when dynamic content is generated 
    $('.edit-icon').on('click', null, (e) => {

      const CourseID = $(e.target).data('entityid');
      that.navigateTo(CourseID);
    });

    $('.delete-icon').on('click', null, (e) => {


      const CourseID = $(e.target).data('dri-id');
      that.deleteConfirmation(CourseID);
    });


  }
  


  deleteConfirmation = (CourseID) => {
    debugger;
    //alert("dconf");
    this.deleteCourseId = CourseID;
    ///*this.tfrHelper.tfrSweetAlertConfirmationBox('Are you sure?', 'You are about to delete a zip code!', this*/.tfrConstants.tfrSweetAlertType.Warning,
    this.confirmationCallBack();
  }




  confirmationCallBack = () =>
  {
    debugger;
    this.dataservice.deleteCourse(this.deleteCourseId).subscribe(
      savedCourse => this.sDeleteCourse(savedCourse),

    );
  }
  sDeleteCourse(savedCourse) {
    debugger;
    //alert("inside sDelete.");
    console.log(savedCourse);
    //this.tfrHelper.tfrToaster('Zip code has been deleted successfully!','', this.tfrConstants.tfrSweetAlertType.Success);
    //this.tfrHelper.showSpinner();
    this.toastr.success('Course Deleted Successfully.');
    this.isRefresh = true;
    this.generateTableStructure();
  }

  


    gridLoadedCompletely() {

    }
    navigateTo = (CourseID) => {
      this.route.navigateByUrl(`CourseEdit/${CourseID}`);
    }

    navigateToCreateNew = () => {
      this.route.navigateByUrl(`CourseEdit`);
    }



    //navigateTo = (DepartmentID) => {
    //  debugger;
    //  alert("inside getbyID");
    //  this.route.navigateByUrl(`DepartmentEdit/${DepartmentID}`);
    //}




  
}
