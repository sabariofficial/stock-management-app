import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private _snackBar = inject(MatSnackBar);
  constructor() { }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      verticalPosition: 'top',
      horizontalPosition: "center",
      duration: 2 * 1000
    });
  }
}
