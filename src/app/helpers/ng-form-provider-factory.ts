import { NgForm } from '@angular/forms';

export function ngFormProviderFactory(parentForm: NgForm) {
  return parentForm || new NgForm([], []);
}
