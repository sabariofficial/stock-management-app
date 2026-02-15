import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup implements OnInit{
  itemName:string = 'Are you sure want to delete this ';
  constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
  }

  ngOnInit(): void {
     this.itemName = this.dialogData.itemName ? 
     `Are you sure want to delete this ${this.dialogData.itemName}?` : 'Are you sure want to delete this item?';
  }

  setTitle(){
    return 
  }

  yes() {
    this.dialogRef.close(true)
  }

  no() {
    this.dialogRef.close(false)
  }
}
