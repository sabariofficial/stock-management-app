import { Injectable, signal } from '@angular/core';
import { Firestore,collection,addDoc,Timestamp, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Common {
  constructor(private firestore: Firestore) { }

  selectedTitle = signal<string>('Dashboard');
  list_of_items = signal<string[]>([])
  list_of_sizes = signal<string[]>([])

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
    { label: 'Day-by-Day Manufacturing', route: '/add-manufacture' },
    { label: 'Stock Management', route: '/add-stock' },
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

  getManufactureDetails() {
    const colRef = collection(this.firestore, 'manufacture');
    return collectionData(colRef, { idField: 'id' });
  }

  getStockDetails() {
    const colRef = collection(this.firestore, 'stock');
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

  addManufacture(manufacture: any) {
    const colRef = collection(this.firestore, 'manufacture');
    return addDoc(colRef, {
      ...manufacture,
      created_at:Timestamp.now()
    })
  }

  addStockDetails(data:any) {
    const colRef = collection(this.firestore, 'stock')
    return addDoc(colRef, {
      ...data,
      created_at:Timestamp.now()
    })
  }

  updateMaterialItem(data: any) {
    const docRef = doc(this.firestore, `materials/${data.id}`);
    return updateDoc(docRef, data);
  }

  updateManufactureItem(data: any) {
    const docRef = doc(this.firestore, `manufacture/${data.id}`);
    return updateDoc(docRef, data);
  }

  updateStockItem(data: any) {
    const docRef = doc(this.firestore, `stock/${data.id}`);
    return updateDoc(docRef, data);
  }

  deleteMaterialItem(id: string) {
    const docRef = doc(this.firestore, `materials/${id}`);
    return deleteDoc(docRef);
  }

  deleteManufactureItem(id: string) {
    const docRef = doc(this.firestore, `manufacture/${id}`);
    return deleteDoc(docRef);
  }

  deleteStockItem(id: string) {
    const docRef = doc(this.firestore, `stock/${id}`);
    return deleteDoc(docRef);
  }

}
