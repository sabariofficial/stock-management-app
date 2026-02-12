import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Common } from '../common';
import { Snackbar } from '../../service/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../model/popup/popup';

@Component({
  selector: 'app-manufacturing',
  standalone: false,
  templateUrl: './manufacturing.html',
  styleUrl: './manufacturing.css',
})
export class Manufacturing implements OnInit {
  rowData: any = [];
  gridApi!: GridApi;
  pendingData: any = [];
  updatedValue: any = {}
  hasUpdateValue: boolean = false;
  isMobile!: boolean;
  columnDefs: ColDef[] = [
    {
      headerName: 's.no',
      valueGetter: 'node.rowIndex + 1',
      width:(this.isMobile)? 70 : 100,
      pinned:'left'
    },
    {
      headerName: 'Items',
      field: 'items',
      minWidth: 150,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: () => ({
        values:this.commonService.list_of_items()
      }),
      cellDataType: 'text',
      editable:true
    },
    {
      headerName: 'Party name',
      field: 'customer',
      minWidth: 150,
      cellDataType: 'text',
      editable:true
    },
    {
      headerName: 'Kg / box',
      field: 'kg',
      minWidth: 100,
      cellDataType: 'number',
      editable:true
    },
    {
      headerName: 'date',
      field: 'date',
      minWidth: 100,
      cellDataType: 'text',
      editable:true
    },
    {
      headerName: 'Actions',
      field: '',
      width: (this.isMobile)? 70 : 100,
      pinned: 'right',
      cellRenderer : () => `
          <span class="material-icons delete">delete</span>
      `,
      onCellClicked: (params: any) => {
        // console.log(params);
        this.removeManufactureDetails(params.data)
      }
    }
  ]

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  }
  isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private commonService: Common,
    private snackBar: Snackbar,
    private dialog:MatDialog,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }


  
  ngOnInit(): void {
    this.getManuFactureDetails()
    const items = this.commonService.list_of_items
    if (items().length == 0) {
      this.getAllProducts()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth > 768;
    // console.log(this.isMobile);
  }


  getAllProducts() {
    this.commonService.getAllProducts().subscribe((res: any) => {
      if (res.length) {
        const products = res[0].product_name;
        this.commonService.list_of_items.set(products)
      }
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getManuFactureDetails() {
    this.commonService.getManufactureDetails().subscribe((res) => {
      if (res.length) {
        this.pendingData = res;
        this.gridApi.setGridOption('rowData', this.pendingData)
        console.log(this.pendingData);
        
      }
    })
  }

  addManufactureDetails() {
    this.router.navigate(['home/add-manufacture'])
  }

  onChangeCellValue(event: any) {
    const { data, colDef, newValue, oldValue } = event;
    if (oldValue === newValue) return;
    if (!this.updatedValue['id']) {
      this.updatedValue['id'] = data.id
    }
    this.hasUpdateValue = true;
    this.updatedValue[colDef.field] = newValue;

    console.log(this.updatedValue);
  }

  updateManufactureDetails() {
    this.commonService.updateManufactureItem(this.updatedValue).then(() => {
      this.snackBar.openSnackBar('Updated successfully...!')
      this.hasUpdateValue = false;
    }).catch((err) => {
      this.snackBar.openSnackBar(err)
    })
  }

  removeManufactureDetails(data: any) {
    const dialogRef = this.dialog.open(Popup, {
      disableClose: true,
      autoFocus:false
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.commonService.deleteManufactureItem(data.id).then(() => {
          this.snackBar.openSnackBar('Removed successfully...!')
          this.getManuFactureDetails()
        }).catch((err) => {
          this.snackBar.openSnackBar(err)
        })
      }
    })
    
  }

}
