import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Common } from '../common';

@Component({
  selector: 'app-materials',
  standalone: false,
  templateUrl: './materials.html',
  styleUrl: './materials.css',
})
export class Materials {

  constructor(
    private router: Router,
    private commonService: Common,
    private cdr:ChangeDetectorRef
  ) {
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
      this.cdr.detectChanges();
      }
    })
  }

}
