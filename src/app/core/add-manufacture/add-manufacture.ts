import { Component, OnInit, WritableSignal } from '@angular/core';
import { Common } from '../common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Snackbar } from '../../service/snackbar';
import { Writable } from 'stream';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-manufacture',
  standalone: false,
  templateUrl: './add-manufacture.html',
  styleUrl: './add-manufacture.css',
})
export class AddManufacture implements OnInit {
  manufactureForm!: FormGroup;
  items!: WritableSignal<string[]>;
  constructor(
    private commonService: Common,
    private snackbar: Snackbar,
    private router:Router
  ) { 
    this.manufactureForm = new FormGroup({
      items: new FormControl('', Validators.required),
      customer:new FormControl('',Validators.required),
      kg:new FormControl('',Validators.required),
      date:new FormControl('',Validators.required),
    })

    this.items = this.commonService.list_of_items;
  }

  ngOnInit(){
    if (this.items().length === 0) {
      this.getAllProducts()
    }    
  }

  getAllProducts() {
    this.commonService.getAllProducts().subscribe((res: any) => {
      if (res.length) {
        const products = res[0].product_name;
        this.commonService.list_of_items.set(products)
      }
    })
  }
  
  async addManufacture() {
    if (!this.manufactureForm.valid) {
      this.snackbar.openSnackBar('Please fill all required fields...!')
      return;
    }
    const payload = { ...this.manufactureForm.getRawValue() }
    try {
      await this.commonService.addManufacture(payload)
      this.snackbar.openSnackBar('Manufacture details added successfully!')
      this.manufactureForm.reset()
    } catch (err:any) {
      this.snackbar.openSnackBar(err)
    }
  }

  goBack() {
    this.router.navigate(['home/daily-manufacture'])
  }
}
