import { Injectable, signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class Common {
  constructor(private angularFireStore:AngularFirestore){}

  selectedTitle = signal<string>('Dashboard');

  setTitle(name: string) {
    this.selectedTitle.set(name);
  }
  
  getProduct(){
   return this.angularFireStore.collection('products').valueChanges({idField:'id'})
  }

   addStock(stock: any) {
    return this.angularFireStore.collection('products').add({
      ...stock,
      createdAt: new Date()
    });
  }

  updateStock(id: string, data: any) {
    return this.angularFireStore.collection('products').doc(id).update(data);
  }

  deleteStock(id: string) {
    return this.angularFireStore.collection('products').doc(id).delete();
  }

}
