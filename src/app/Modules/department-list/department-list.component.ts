import { Component, OnInit } from '@angular/core';
import { Department } from '../../Models/Department';
//import {MaterialModule} from '../../../material';
import { Router } from '@angular/router';
import { TFRgridService } from '../../DataService/tfrgrid.service';
import * as $ from 'jquery';
import { DepartmentdataService } from '../../DataService/departmentdata.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent implements OnInit {

  //departmentlist: Department[];
  //dataavailbale: Boolean = false;
  //tempdepartment: Department;

  columns: any = [];
  columnDefs: any = [];
  isRefresh = false;
  tableId = 'Department';
  dataTableMethodType = 'post';
  self;
  deleteDepartmentId: string;
  isAllowedAnonymous = true;
    tfrConstants: any;
    settingService: any;
  
  
   


  constructor(
     


    private route: Router, private tfrGridService: TFRgridService, private dataservice: DepartmentdataService, private toastr: ToastrService) { this.self = this; }

  ngOnInit() {
  }
  

  ngAfterViewInit() {
    this.generateTableStructure();
  }



  generateTableStructure() {
   

    this.columns = [
      // instead of title you can also define the headers in html as well. This just gives a dynamic naming for headers.
      {
        data: 'Actions', name: 'Actions', title: 'Actions',
        render: (data, type, row) => this.tfrGridService.getActionsColumn(row.id, true, true)
      },

     // { data: 'username', name: 'username', title: 'User Name' },
      { data: 'name', name: 'name', title: 'Name' },
      { data: 'description', name: 'description', title: 'Description' },

    ];

    this.columnDefs = null;
    this.columnDefs = [
      {
        className: 'dt-centered-column',
        targets: [1]
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
      'Department/get',
      'Department',
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
      
      const DepartmentID = $(e.target).data('entityid');
      that.navigateTo(DepartmentID);
    });

    $('.delete-icon').on('click', null, (e) => {
      

      const DepartmentID = $(e.target).data('dri-id');
      that.deleteConfirmation(DepartmentID);
    });


  }
  



  deleteConfirmation = (DepartmentID) => {
    debugger;
    this.deleteDepartmentId = DepartmentID;
    ///*this.tfrHelper.tfrSweetAlertConfirmationBox('Are you sure?', 'You are about to delete a zip code!', this*/.tfrConstants.tfrSweetAlertType.Warning,
      this.confirmationCallBack();
  }


  
  
  confirmationCallBack = () => {
    debugger;
    this.dataservice.deleteDepartment(this.deleteDepartmentId).subscribe(
      savedDepartment => this.sDeleteDepartment(savedDepartment),
      
    );
  }

  sDeleteDepartment(savedDepartment) {
    debugger;
    this.toastr.success('Department Deleted Successfully.');
    this.isRefresh = true;
    this.generateTableStructure();
  }


  gridLoadedCompletely() {

  }
  //navigateTo = (DepartmentID) => {
    //this.route.navigateByUrl(`DepartmentEdit/${DepartmentID}`);
 // }

  navigateToCreateNew = () => {
    this.route.navigateByUrl(`DepartmentEdit`);
  }



  navigateTo = (DepartmentID) => {
    debugger;
    this.route.navigateByUrl(`DepartmentEdit/${DepartmentID}`);
  }

 


}  
