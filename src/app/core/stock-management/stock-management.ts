import { isPlatformBrowser } from '@angular/common';
import { Component, effect, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Common } from '../common';
import { Snackbar } from '../../service/snackbar';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../model/popup/popup';

@Component({
  selector: 'app-stock-management',
  standalone: false,
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.css',
})
export class StockManagement implements OnInit {
  rowData:any[] = [];
  productList:string[]=[];
  sizes:string[]=[];
  isBrowser: Boolean = false;
  hasUpdateValue: Boolean = false;
  isMobile!: Boolean;
  gridApi!: GridApi;
  updatedValue:any = {}
   columnDefs: ColDef[] = [
      {
        headerName: 'S.No',
        valueGetter: 'node.rowIndex + 1',
        width: 80 ,
        pinned: 'left'
      },
      {
        field: 'items',
        headerName: 'Item',
        minWidth: 70,
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams:()=> ({
          values:this.productList
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
          values:this.sizes
        }),
        cellDataType: 'text',
      },
      { field: 'kg', headerName: 'KG', minWidth: 50,editable:true,cellDataType:'number' },
      { field: 'price', headerName: 'Price', minWidth: 50,editable:true,cellDataType:'number' },
      { field: 'date', headerName: 'Date', minWidth: 50,editable:true,cellEditor:'agDateCellEditor',cellDataType:'date'},
      { headerName: 'Total', field: 'total', minWidth: 50, cellDataType: 'numericColumn' },
      {
        headerName: 'Actions',
        width: 70,
        pinned: 'right',
        cellRenderer: () => `
            <span class="material-icons delete">delete</span>
        `,
        onCellClicked: (params: any) => {
          console.log(params);
          this.removeStockDetails(params.data)
        }
      }
    ];
  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable:true,
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private commonService: Common,
    private snackBar: Snackbar,
    private dialog:MatDialog
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    effect(() => {
      this.productList = this.commonService.list_of_items();
      this.sizes = this.commonService.list_of_sizes();
    })
  }

  ngOnInit(): void {
   if (this.productList.length === 0) {
      this.getAllProducts()
    }

    if (this.sizes.length === 0) {
      this.getProductSize()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isMobile = event.target.innerWidth > 768;
  }

  onGridReady(params:GridReadyEvent) {
    this.gridApi = params.api;
    this.getStockList()
  }

  onChangeCellValue(event:any) {
    const { data, colDef, oldValue, newValue } = event;
    if (oldValue === newValue) return;
    if (!this.updatedValue['id']) {
      this.updatedValue['id'] = data.id
    }
    this.hasUpdateValue = true;
    this.updatedValue[colDef.field] = newValue;
  }

  addStockDetails() {
    this.router.navigate(['home/add-stock'])
  }

  getStockList() {
    this.commonService.getStockDetails().subscribe((res) => {
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
        this.gridApi.setGridOption('rowData',this.rowData)
      }
    })
  }

  updateStockDetails() {
    this.commonService.updateStockItem(this.updatedValue).then(() => {
      this.snackBar.openSnackBar('Updated Stock Successfully...!')
      this.hasUpdateValue = false;
    }).catch((err) => {
      this.snackBar.openSnackBar(err)
    })
  }

  removeStockDetails(data:any) {
    const dialogRef = this.dialog.open(Popup, {
      autoFocus: false,
      disableClose:true,
       data:{
          itemName:data.items
        },
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.commonService.deleteStockItem(data.id).then(() => {
          this.snackBar.openSnackBar('Deletd Stock Successfully...!')
        }).catch((err) => {
          this.snackBar.openSnackBar(err)
        })
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

   getProductSize() {
    this.commonService.getAllProductSize().subscribe((res: any) => {
      if (res.length) {
        const productSize = res[0].productSize;
        this.commonService.list_of_sizes.set(productSize);
        console.log(this.sizes);
      }
    })
  }

  
}
