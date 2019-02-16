
import { OnInit, Directive, TemplateRef, Input } from '@angular/core';


@Directive({
  selector: '[fsFieldConfig]'
})
export class FieldConfigDirective implements OnInit {

  @Input() type;

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit() {

  }
}
