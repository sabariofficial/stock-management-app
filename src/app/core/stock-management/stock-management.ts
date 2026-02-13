import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  rowData:any[] = []
  isBrowser: Boolean = false;
  hasUpdateValue: Boolean = false;
  isMobile!: Boolean;
  gridApi!: GridApi;
  updatedValue:any = {}
  columnDefs: ColDef[] = [
    {
      headerName: 's.no',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      pinned:'left'
    },
    {
      headerName: 'Items',
      field:'items',
      flex: 2,
      minWidth: 250,
      editable: true,
      cellDataType:'text'
    },
    {
      headerName: 'Kg/Boxes',
      field: 'kg',
      editable: true,
      cellDataType: 'number',
      flex: 1,
      minWidth: 180,
    },
    {
      headerName: 'Type',
      field: 'type',
      editable: true,
      cellDataType: 'text',
      flex: 2,
      minWidth: 250,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: () => ({ values: ['Zinc', 'GI', 'Powder']})
    },
    {
      headerName: 'date',
      field: 'created_at',
      cellDataType:'text',
      flex: 1,
      minWidth: 180,
      valueFormatter: (params) => {
        const date = params.value.toDate()
        return formatDate(date, 'yyyy-MM-dd', 'en-Us') ?? ''
      }
    },
    {
      headerName: 'Actions',
      field: '',
      cellRenderer: () => `
         <span class="material-icons delete">delete</span>
      `,
      onCellClicked:(params) => {
        // console.log(params.data);
        this.removeStockDetails(params.data)
      },
      pinned: 'right',
      width:80 
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
    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  ngOnInit(): void {
  
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
        this.rowData = res || [];
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
      disableClose:true
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

  
}
