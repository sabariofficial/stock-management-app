import { Injectable, signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root',
})
export class Common {
  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  selectedTitle = signal<string>('Dashboard');

  setTitle(name: string) {
    this.selectedTitle.set(name);
  }

  getAllProducts() {
    return this.angularFireStore.collection('products_list').valueChanges({ idField: 'id' })
  }

  getAllProductSize() {
    return this.angularFireStore.collection('item_size').valueChanges({ idField: 'id' })
  }

  getMaterialDetails() {
    return this.angularFireStore.collection('materials').valueChanges({ idField: 'id' })
  }

  addMaterial(material: any) {
    return this.angularFireStore.collection('materials').add({
      ...material,
      date: firebase.firestore.Timestamp.fromDate(
        new Date(material.date)
      ),
      createdAt: firebase.firestore.Timestamp.now()
    });
  }

  updateStock(id: string, data: any) {
    return this.angularFireStore.collection('products').doc(id).update(data);
  }

  deleteStock(id: string) {
    return this.angularFireStore.collection('products').doc(id).delete();
  }

}
