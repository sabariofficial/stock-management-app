import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Snackbar } from '../../service/snackbar';
import { Common } from '../common';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-stock',
  standalone: false,
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.css',
})
export class AddStock {
  stockForm!: FormGroup;
  products: string[] = [];
  itemSizes: string[] = [];
  materialObj: any;

  constructor(
    private snackBar: Snackbar,
    private commonService: Common,
    private router:Router,
    private fb:FormBuilder
  ) {
    this.stockForm = new FormGroup({
      items: new FormControl('', Validators.required),
      kg: new FormControl('', Validators.required),
      type:new FormControl('',Validators.required)
    })
    this.getProductSize();
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      items: ['', Validators.required],
      itemSize: ['', Validators.required],
      totalMaterialKg: [null],
      kg: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      total: [],
      date: ['', Validators.required]
    });

    // Auto-calculate total
    this.stockForm.get('kg')?.valueChanges.subscribe(() => this.calculateTotal());
    this.stockForm.get('price')?.valueChanges.subscribe(() => this.calculateTotal());

    // this.addFormOnLoad();
    this.fcTotalMaterialKg.disable();
    // this.kgValueChanges();

  }

  weightCalculation(){
        if (this.fcKg.value != 0 && this.fcKg.value > this.fcTotalMaterialKg.value) {
          this.fcKg.setValue('');
          this.snackBar.openSnackBar(`Please enter upto ${this.fcTotalMaterialKg.value} Kg`)
        }
  }

    get fcKg() {return this.stockForm.get('kg') as FormControl}
    get fcTotalMaterialKg() {return this.stockForm.get('totalMaterialKg') as FormControl}
    get fcPrice() {return this.stockForm.get('price') as FormControl}
    get fcDate() {return this.stockForm.get('date') as FormControl}
    get fcItem() {return this.stockForm.get('items') as FormControl}
    get fcItemSize() {return this.stockForm.get('itemSize') as FormControl}

  async addStock() {
    if (!this.stockForm.valid) {
      this.snackBar.openSnackBar('Please fill all required fields...!');
      return;
    }

    const payload = { ...this.stockForm.getRawValue() }
    try {
      await this.commonService.addStockDetails(payload)
      this.snackBar.openSnackBar('Stock added successfully...!')
      this.stockForm.reset();
      this.updateMaterial(payload.kg);
    } catch (err:any) {
      this.snackBar.openSnackBar(err)
    }
  }

  updateMaterial(kg:number) {
    this.materialObj.kg = Number(this.materialObj.kg) - kg;    
    this.commonService.updateMaterialItem(this.materialObj).then(() => {
    }).catch((err) => {
      this.snackBar.openSnackBar(err);
    })
  }

   calculateTotal() {
    const kg = this.stockForm.get('kg')?.value || 0;
    const price = this.stockForm.get('price')?.value || 0;
    this.stockForm.get('total')?.setValue(kg * price);
  }

  goBack() {
    this.router.navigate(['home/stocks'])
  }

  
    onSelectItemSize(event:MatSelectChange){
  console.log(event, "option select");

  this.commonService.getMaterialDetails().subscribe((res: any) => {
        if (res.length) {
          const material = res;
          this.materialObj = material.find((mat:any)=> mat.items == this.fcItem.value && mat.itemSize == this.fcItemSize.value);
          this.fcTotalMaterialKg.setValue(this.materialObj.kg);
        }
      })
  
    }

    getAllProducts() {
    this.commonService.getAllProducts().subscribe((res: any) => {
      if (res.length) {
        const products = res[0].product_name;
        this.products = products;
        this.commonService.list_of_items.set(products);
      }
    })
  }

  getProductSize() {
    this.commonService.getAllProductSize().subscribe((res: any) => {
      if (res.length) {
        const productSize = res[0].productSize;
        this.itemSizes = productSize;
        this.commonService.list_of_sizes.set(productSize);
      }
    })
  }
}
