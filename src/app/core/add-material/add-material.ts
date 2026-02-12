import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Common } from '../common';
import { Snackbar } from '../../service/snackbar';
import { Router } from '@angular/router';

export interface AddMaterial {
  items: string;
  itemSize: string;
  date: Date;
  kg: number;
  price: number;
  total: number
}

@Component({
  selector: 'app-add-material',
  standalone: false,
  templateUrl: './add-material.html',
  styleUrl: './add-material.css',
})
export class AddMaterial implements OnInit {

  materialForm!: FormGroup;

  products: string[] = [];
  itemSizes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private commonService: Common,
    private snackbar: Snackbar,
    private router:Router
  ) {
    this.getProductSize();
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.materialForm = this.fb.group({
      items: ['', Validators.required],
      itemSize: ['', Validators.required],
      kg: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      total: [],
      date: ['', Validators.required]
    });

    // Auto-calculate total
    this.materialForm.get('kg')?.valueChanges.subscribe(() => this.calculateTotal());
    this.materialForm.get('price')?.valueChanges.subscribe(() => this.calculateTotal());

    this.addFormOnLoad();
  }

  async addFormOnLoad(): Promise<any> {
    //  this.getProductSize();
  }

  goBack() {
  this.router.navigate(['home/materials']); 
}

  calculateTotal() {
    const kg = this.materialForm.get('kg')?.value || 0;
    const price = this.materialForm.get('price')?.value || 0;
    this.materialForm.get('total')?.setValue(kg * price);
  }

  getProductSize() {
    this.commonService.getAllProductSize().subscribe((res: any) => {
      if (res.length) {
        const productSize = res[0].productSize;
        this.itemSizes = productSize;
        this.commonService.list_of_sizes = productSize;
      }
    })
  }

  getAllProducts() {
    this.commonService.getAllProducts().subscribe((res: any) => {
      if (res.length) {
        const products = res[0].product_name;
        this.products = products;
        this.commonService.list_of_items = products;
      }
    })
  }

  async addMaterial() {
    try {
      const payload = { ...this.materialForm.getRawValue() }
      await this.commonService.addMaterial(payload);
      this.snackbar.openSnackBar('Material added successfully!')
      this.materialForm.reset()
    } catch (error:any) {
      this.snackbar.openSnackBar(error)
    }
  }

}
