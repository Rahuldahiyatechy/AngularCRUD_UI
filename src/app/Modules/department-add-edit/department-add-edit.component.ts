import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Department } from '../../Models/Department';
import { NgForm } from '@angular/forms';
import { DepartmentdataService } from '../../DataService/departmentdata.service';
import { from } from 'rxjs';
import { MaterialModule } from '../../Models/material';
import { TFRgridService } from '../../DataService/tfrgrid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.css']
})
export class DepartmentAddEditComponent implements OnInit {

  
  Department = new Department();
  isCreateMode = false;

  

  constructor(private tfrGridService: TFRgridService, private route: ActivatedRoute,
    private router: Router, private dataservice: DepartmentdataService, private toastr: ToastrService) {
  
   
  }

  ngOnInit() {
//    this.getServingAreaForDDL();
    const DepartmentID = this.route.snapshot.paramMap.get('id');
    if (!DepartmentID) {
      this.isCreateMode = true;
    } else {

      this.dataservice.getDepartmentDetailById(DepartmentID).subscribe(
        returnedDepartmentDetail => this.getDepartmentSuccess(returnedDepartmentDetail),
       
      );
    }
  }

  sDepartment(AddDepartment) {
    console.log(AddDepartment);
    this.toastr.success('Department Added Successfully.');
    //this.tfrHelper.tfrToaster('ZipCode been saved successfully!', '', this.tfrConstants.tfrSweetAlertType.Success);
    this.router.navigateByUrl(`DepartmentList`)
  }

  
  getDepartmentSuccess(Department) {
    debugger;
    this.Department = Department;
  }

  saveChanges() {
    debugger;
    this.dataservice.AddDepartment(this.Department, this.isCreateMode).subscribe(
      AddDepartment => this.sDepartment(AddDepartment),
         
      
    );
  }

 
}
