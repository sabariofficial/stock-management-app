import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { Popup } from '../../model/popup/popup';
import { Snackbar } from '../../service/snackbar';
import { Common } from '../common';
import { Router } from '@angular/router';
import { ZincService } from './zinc-details/zinc-service';

export interface ZincInterface{
  id?:number;
  serialNo:string;
  item:any;
  itemSize:string;
  kg:number;
  price:number;
  total:number;
  date:Date
}

@Component({
  selector: 'app-zinc-details',
  standalone: false,
  templateUrl: './zinc-details.html',
  styleUrl: './zinc-details.css',
})

export class ZincDetails implements OnInit {
  isBrowser = false;
  productList!: WritableSignal<string[]>;
  sizes!: WritableSignal<string[]>;
  hasUpdateValue: boolean = false;
  updateZincValue: any = {}
  isMobile!: boolean;
  constructor(
    private router: Router,
    private commonService: Common,
    private zincService: ZincService,
    private cdr: ChangeDetectorRef,
    private snackbar: Snackbar,
    private dialog:MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.productList = this.commonService.list_of_items;
    this.sizes = this.commonService.list_of_sizes;
    this.getZincDetails();
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
      width: 100 ,
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
        this.removeZinc(params.data)
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth > 768;
    // console.log(this.isMobile);
  }

  openAddZinc() {
    this.router.navigate(["home/add-zinc"])
  }

  getZincDetails() {
    this.zincService.getZincDetails().subscribe((res: any) => {
      if (res.length) {
        this.rowData = res.map((data: any) => ({
          id:data.id,
          items: data.items,
          itemSize: data.itemSize,
          kg: data.kg,
          price: data.price,
          date: data.date?.toDate ? data.date.toDate() : null,
          total: data.total
        })) || [];
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
    if (!this.updateZincValue['id']) {
      this.updateZincValue['id'] = data['id']
    }


    if (['kg', 'price'].includes(colDef.field)) {
      data['total'] = data['kg'] * data['price']
      event.api.refreshCells({
        rowNodes: [event.node],
        columns: ['total'],
        force: true
      });
      this.updateZincValue[colDef.field] = newValue;
      this.updateZincValue['total'] = data['total']
    } else {
      this.updateZincValue[colDef.field] = newValue;
    }
  }

  updateZinc() {
    this.zincService.updateZincItem(this.updateZincValue  ).then(() => {
      this.snackbar.openSnackBar('Zinc updated successfully')
      this.hasUpdateValue = false;
      this.cdr.detectChanges()
    }).catch((err) => {
      this.snackbar.openSnackBar(err)
    })
  }

  removeZinc(data:any) {
    const dialogRef =  this.dialog.open(Popup, {
        disableClose: true,
        autoFocus:false,
        data:{
          itemName:data.items
        },
    })
    
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.zincService.deleteZincItem(data.id).then(() => {
          this.snackbar.openSnackBar(`${data.items} removed successfully.`)
        }).catch((err) => {
          this.snackbar.openSnackBar(err)
        })
      }
    })
  }

}


