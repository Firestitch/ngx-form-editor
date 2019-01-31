
import { OnInit, Directive, TemplateRef, Input } from '@angular/core';


@Directive({
  selector: '[fsFieldCustomEdit]'
})
export class FieldCustomEditDirective implements OnInit {

  @Input() type;

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit() {

  }
}
