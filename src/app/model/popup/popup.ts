import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  constructor(public dialogRef: MatDialogRef<Popup>) {
     
  }

  yes() {
    this.dialogRef.close(true)
  }

  no() {
    this.dialogRef.close(false)
  }
}
