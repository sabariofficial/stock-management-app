import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Snackbar } from '../../service/snackbar';
import { Common } from '../common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  standalone: false,
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.css',
})
export class AddStock {
  stockForm!: FormGroup;

  constructor(
    private snackBar: Snackbar,
    private commonService: Common,
    private router:Router
  ) {
    this.stockForm = new FormGroup({
      items: new FormControl('', Validators.required),
      kg: new FormControl('', Validators.required),
      type:new FormControl('',Validators.required)
    })
  }

  async addStock() {
    if (!this.stockForm.valid) {
      this.snackBar.openSnackBar('Please fill all required fields...!');
      return;
    }

    const payload = { ...this.stockForm.getRawValue() }
    try {
      await this.commonService.addStockDetails(payload)
      this.snackBar.openSnackBar('Stock added successfully...!')
      this.stockForm.reset()
    } catch (err:any) {
      this.snackBar.openSnackBar(err)
    }
  }

  goBack() {
    this.router.navigate(['home/stocks'])
  }
}
