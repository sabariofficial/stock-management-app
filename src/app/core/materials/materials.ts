import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Common } from '../common';
import { isPlatformBrowser } from '@angular/common';
import { Snackbar } from '../../service/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../model/popup/popup'

@Component({
  selector: 'app-materials',
  standalone: false,
  templateUrl: './materials.html',
  styleUrl: './materials.css',
})
export class Materials implements OnInit {
  isBrowser = false;
  productList!: WritableSignal<string[]>;
  sizes!: WritableSignal<string[]>;
  hasUpdateValue: boolean = false;
  updateMaterialValue:any = {}
  constructor(
    private router: Router,
    private commonService: Common,
    private cdr: ChangeDetectorRef,
    private snackbar: Snackbar,
    private dialog:MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.productList = this.commonService.list_of_items;
    this.sizes = this.commonService.list_of_sizes;
    this.getMaterialDetails();
  }

  ngOnInit(): void {
    if (this.productList().length === 0) {
      this.getAllProducts()
    }

    if (this.sizes().length === 0) {
      this.getProductSize()
    }
  }

  columnDefs: ColDef[] = [
    {
      headerName: 'S.No',
      valueGetter: 'node.rowIndex + 1',
      width: 100,
      pinned: 'left'
    },
    {
      field: 'items',
      headerName: 'Item',
      minWidth: 70,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams:()=> ({
        values:this.productList()
      }),
      cellDataType:'text'
    },
    {
      field: 'itemSize',
      headerName: 'Size',
      minWidth: 70,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams:()=> ({
        values:this.sizes()
      }),
      cellDataType: 'text',
    },
    { field: 'kg', headerName: 'KG', minWidth: 50,editable:true,cellDataType:'number' },
    { field: 'price', headerName: 'Price', minWidth: 50,editable:true,cellDataType:'number' },
    { field: 'date', headerName: 'Date', minWidth: 50,editable:true,cellEditor:'agDateCellEditor',cellDataType:'date'},
    { headerName: 'Total', field: 'total', minWidth: 50, cellDataType: 'numericColumn' },
    {
      headerName: 'Actions',
      width: 100,
      pinned: 'right',
      cellRenderer: () => `
          <span class="material-icons delete">delete</span>
      `,
      onCellClicked: (params: any) => {
        console.log(params);
        this.removeMaterial(params.data)
      }
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  };

  rowData: any = [
  ];

  openAddMaterial() {
    this.router.navigate(["home/add-material"])
  }

  getMaterialDetails() {
    this.commonService.getMaterialDetails().subscribe((res: any) => {
      if (res.length) {
        this.rowData = res.map((data: any) => ({
          id:data.id,
          items: data.items,
          itemSize: data.itemSize,
          kg: data.kg,
          price: data.price,
          date: data.date?.toDate ? data.date.toDate() : null,
          total: data.total
        }));
        console.log(this.rowData);
        
      this.cdr.detectChanges();
      }
    })
  }

  getProductSize() {
    this.commonService.getAllProductSize().subscribe((res: any) => {
      if (res.length) {
        const productSize = res[0].productSize;
        this.commonService.list_of_sizes.set(productSize);
        console.log(this.sizes);
      }
    })
  }

  getAllProducts() {
    this.commonService.getAllProducts().subscribe((res: any) => {
      if (res.length) {
        const products = res[0].product_name;
        this.commonService.list_of_items.set(products);
      }
    })
  }

  onChangeCellValue(event:any) {
    const { data, colDef, oldValue, newValue } = event;
    console.log('Column:', colDef.field);
    console.log('Old Value:', oldValue);
    console.log('New Value:', newValue);
  
    if (oldValue === newValue) return;
    console.log(data);
    
    this.hasUpdateValue = true;
    this.cdr.detectChanges()
    if (!this.updateMaterialValue['id']) {
      this.updateMaterialValue['id'] = data['id']
    }


    if (['kg', 'price'].includes(colDef.field)) {
      data['total'] = data['kg'] * data['price']
      event.api.refreshCells({
        rowNodes: [event.node],
        columns: ['total'],
        force: true
      });
      this.updateMaterialValue[colDef.field] = newValue;
      this.updateMaterialValue['total'] = data['total']
    } else {
      this.updateMaterialValue[colDef.field] = newValue;
    }

      console.log(this.updateMaterialValue);
  }

  updateMaterial() {
    this.commonService.updateMaterialItem(this.updateMaterialValue).then(() => {
      this.snackbar.openSnackBar('Updated successfully')
      this.hasUpdateValue = false;
      this.cdr.detectChanges()
    }).catch((err) => {
      this.snackbar.openSnackBar(err)
    })
  }

  removeMaterial(data:any) {
    const dialogRef =  this.dialog.open(Popup, {
        disableClose: true,
        autoFocus:false
    })
    
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.commonService.deleteMaterialItem(data.id).then(() => {
          this.snackbar.openSnackBar('Removed successfully!')
        }).catch((err) => {
          this.snackbar.openSnackBar(err)
        })
      }
    })
  }

}
