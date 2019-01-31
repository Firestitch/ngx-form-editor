
import { OnInit, Directive, TemplateRef, Input } from '@angular/core';


@Directive({
  selector: '[fsFieldCustomRender]'
})
export class FieldCustomRenderDirective implements OnInit {

  @Input() type;

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit() {

  }
}
