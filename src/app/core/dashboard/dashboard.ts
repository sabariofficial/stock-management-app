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
  }

  ngOnInit(): void {
    
    
  }
  
}
