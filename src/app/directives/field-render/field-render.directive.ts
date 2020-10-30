
import { Directive, TemplateRef, Input } from '@angular/core';


@Directive({
  selector: '[fsFieldRender]'
})
export class FieldRenderDirective {

  @Input() type;

  constructor(public templateRef: TemplateRef<any>) {}
}
