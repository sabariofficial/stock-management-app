import { Injectable, signal } from '@angular/core';
import { Firestore,collection,addDoc,Timestamp, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Common {
  constructor(private firestore: Firestore) { }

  selectedTitle = signal<string>('Dashboard');

  menus = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Stock Management', route: '/stocks' },
    { label: 'Material Management', route: '/materials' },
    { label: 'Products', route: '/products' },
    { label: 'Customers', route: '/customers' },
    { label: 'Day-by-Day Manufacturing', route: '/daily-manufacture' },
    { label: 'Zinc', route: '/zinc' },
    { label: 'Settings', route: '/settings' },
    { label: 'Material Management', route: '/add-material' },
  ];

  setTitle(name: string) {
    this.selectedTitle.set(name);
  }

  getAllProducts() {
    const colRef = collection(this.firestore, 'products_list');
    return collectionData(colRef, { idField: 'id' });
  }

  getAllProductSize() {
    const colRef = collection(this.firestore, 'item_size');
    return collectionData(colRef, { idField: 'id' });
  }

  getMaterialDetails() {
    const colRef = collection(this.firestore, 'materials');
    return collectionData(colRef, { idField: 'id' });
  }

  addMaterial(material: any) {
    const colRef = collection(this.firestore, 'materials');

    return addDoc(colRef, {
      ...material,
      date: Timestamp.fromDate(new Date(material.date)),
      createdAt: Timestamp.now()
    });
  }

  updateStock(id: string, data: any) {
    const docRef = doc(this.firestore, `products/${id}`);
    return updateDoc(docRef, data);
  }

  deleteStock(id: string) {
    const docRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(docRef);
  }

}
