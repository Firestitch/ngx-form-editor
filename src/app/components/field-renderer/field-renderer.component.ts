import { Component, Input, HostListener, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { Field, FieldType } from '../../interfaces';


@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
})
export class FieldRendererComponent {

  public fieldType = FieldType;
  public fieldRenderer: FieldRendererComponent = this;

  @ViewChild('fieldsRef') fieldsRef: ElementRef;

  @Input() fields: Field[];

  constructor(private elRef: ElementRef) {}
}
