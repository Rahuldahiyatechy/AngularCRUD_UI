import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  MatTabsModule,
  MatDividerModule, MatStepperModule
} from '@angular/material';
const modules = [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
  MatDividerModule, MatStepperModule
];

import { NgModule } from '@angular/core';
@NgModule({
    imports: [modules],
    exports: [modules],
})

export class MaterialModule { }
