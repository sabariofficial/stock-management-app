import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Common } from '../common';
import { isPlatformBrowser } from '@angular/common';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-materials',
  standalone: false,
  templateUrl: './materials.html',
  styleUrl: './materials.css',
})
export class Materials {
  isBrowser = false;
  constructor(
    private router: Router,
    private commonService: Common,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.getMaterialDetails();
  }

  columnDefs: ColDef[] = [
    {
      headerName: 'S.No',
      valueGetter: 'node.rowIndex + 1',
      width: 100,
      pinned: 'left'
    },
    { field: 'items', headerName: 'Item', minWidth: 150 },
    { field: 'itemSize', headerName: 'Size', minWidth: 120 },
    { field: 'kg', headerName: 'KG', minWidth: 100 },
    { field: 'price', headerName: 'Price', minWidth: 120 },
    { field: 'date', headerName: 'Date', minWidth: 140 },
    {
      headerName: 'Total',
      field: 'total',
      minWidth: 120
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
          items: data.items,
          itemSize: data.itemSize,
          kg: data.kg,
          price: data.price,
          date: data.date?.toDate
            ? data.date.toDate().toLocaleDateString()
            : '',
          total: data.total
        }));
        console.log(this.rowData);
        
      this.cdr.detectChanges();
      }
    })
  }

}
