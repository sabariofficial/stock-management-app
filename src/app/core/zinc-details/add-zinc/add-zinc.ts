import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Snackbar } from '../../../service/snackbar';
import { Common } from '../../common';
import { Router } from '@angular/router';
import { ZincService } from '../zinc-details/zinc-service';

@Component({
  selector: 'app-add-zinc',
  standalone: false,
  templateUrl: './add-zinc.html',
  styleUrl: './add-zinc.css',
})
export class AddZinc implements OnInit {

  zincForm!: FormGroup;

  products: string[] = [];
  itemSizes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private commonService: Common,
    private zincService: ZincService,
    private snackbar: Snackbar,
    private router:Router
  ) {
    this.getProductSize();
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.zincForm = this.fb.group({
      items: ['', Validators.required],
      itemSize: ['', Validators.required],
      kg: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      total: [],
      date: ['', Validators.required]
    });

    // Auto-calculate total
    this.zincForm.get('kg')?.valueChanges.subscribe(() => this.calculateTotal());
    this.zincForm.get('price')?.valueChanges.subscribe(() => this.calculateTotal());

    this.addFormOnLoad();
  }

  get fcKg() {return this.zincForm.get('kg') as FormControl}
  get fcPrice() {return this.zincForm.get('price') as FormControl}
  get fcDate() {return this.zincForm.get('date') as FormControl}
  get fcItem() {return this.zincForm.get('items') as FormControl}
  get fcItemSize() {return this.zincForm.get('itemSize') as FormControl}


  async addFormOnLoad(): Promise<any> {
    //  this.getProductSize();
  }

  goBack() {
  this.router.navigate(['home/zinc']); 
}

  calculateTotal() {
    const kg = this.zincForm.get('kg')?.value || 0;
    const price = this.zincForm.get('price')?.value || 0;
    this.zincForm.get('total')?.setValue(kg * price);
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
      const payload = { ...this.zincForm.getRawValue() }
      await this.zincService.addZinc(payload);
      this.snackbar.openSnackBar('Zinc added successfully!')
      this.zincForm.reset()
    } catch (error:any) {
      this.snackbar.openSnackBar(error)
    }
  }

}
