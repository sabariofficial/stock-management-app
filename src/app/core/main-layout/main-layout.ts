import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  isSidebarOpen = false;

  constructor() {
    
  }

  @HostListener('window:resize',['$event'])
  checkDeviceWidth(event:any) {
    if ( event.target.innerWidth > 768) {
      this.isSidebarOpen = false;
      console.log(event.target.innerWidth);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
