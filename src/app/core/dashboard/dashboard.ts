import { Component, OnInit } from '@angular/core';
import { Common } from '../common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  constructor(private commonService:Common){
    this.commonService.getProduct().subscribe((data)=>{
    console.log(data);

    })
  }

  ngOnInit(): void {
    
    
  }
  
}
