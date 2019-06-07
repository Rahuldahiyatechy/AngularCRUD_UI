import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TFRgridService } from '../../../DataService/tfrgrid.service';
import { EmployeeDataService } from '../../../DataService/employee-data.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  ngOnInit(): void { }


  columns: any = [];
  columnDefs: any = [];
  isRefresh = false;
  tableId = 'Employee';
  dataTableMethodType = 'post';
  self;
  deleteEmployeeId: any;
  isAllowedAnonymous = true;
  tfrConstants: any;
 

  constructor(private route: Router, private tfrGridService: TFRgridService, private dataservice: EmployeeDataService, private toastr: ToastrService) { this.self = this; }




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
      { data: 'firstName', name: 'firstName', title: 'FirstName' },
      { data: 'lastName', name: 'lastName', title: 'LastName' },
      { data: 'courseName', name: 'courseName', title: 'Course Name' },
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
      'Employee/get',
      'Employee',
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

      const EmployeeID = $(e.target).data('entityid');
      that.navigateTo(EmployeeID);
    });

    $('.delete-icon').on('click', null, (e) => {


      const EmployeeID = $(e.target).data('dri-id');
      that.deleteConfirmation(EmployeeID);
    });


  }
  sDeleteEmployee(savedEmployee) {
    debugger;
    //alert("inside sDelete.");
    console.log(savedEmployee);
    this.toastr.success('Employee Deleted Successfully.');
    this.isRefresh = true;
    this.generateTableStructure();
  }



  deleteConfirmation = (EmployeeID) => {
    debugger;
    //alert("dconf");
    this.deleteEmployeeId = EmployeeID;
    ///*this.tfrHelper.tfrSweetAlertConfirmationBox('Are you sure?', 'You are about to delete a zip code!', this*/.tfrConstants.tfrSweetAlertType.Warning,
    this.confirmationCallBack();
  }




  confirmationCallBack = () => {
    debugger;
    this.dataservice.deleteEmployee(this.deleteEmployeeId).subscribe(
      savedEmployee => this.sDeleteEmployee(savedEmployee),

    );
  }
  //}

  //confirmationCallBack = () => {
  //  this.settingService.deleteZipCode(this.deleteZipCodeId).subscribe(
  //    savedZipCode => this.sDeleteZipCode(savedZipCode),
  //    err => this.fSaveServingArea(err)
  //  );
  //}



  gridLoadedCompletely() {

  }
  navigateTo = (EmployeeID) => {
    this.route.navigateByUrl(`EmployeeEdit/${EmployeeID}`);
  }

  navigateToCreateNew = () => {
    this.route.navigateByUrl(`EmployeeEdit`);
  }



  //navigateTo = (DepartmentID) => {
  //  debugger;
  //  alert("inside getbyID");
  //  this.route.navigateByUrl(`DepartmentEdit/${DepartmentID}`);
  //}





}
