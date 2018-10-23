import { Component, Input, OnInit } from '@angular/core';
import { FormEditorConfig } from 'src/app/interfaces';

@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent implements OnInit{

  @Input() config: FormEditorConfig;
  @Input() configField;
  @Input() field;
  constructor() {
  }

  ngOnInit() {
    this.field.hasDescription = !!this.field.description;
  }

  toggleDescription() {
    this.field.hasDescription = !this.field.hasDescription;
  }

}
