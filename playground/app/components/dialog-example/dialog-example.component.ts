import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-example',
  templateUrl: 'dialog-example.component.html'
})
export class DialogExampleComponent {

  public config = null;

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.config = data.config;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
