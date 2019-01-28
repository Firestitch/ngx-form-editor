import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-example',
  templateUrl: 'dialog-example.component.html'
})
export class DialogExampleComponent {

  public fields = null;

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.fields = data.fields;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
