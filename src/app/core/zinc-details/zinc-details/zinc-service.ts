import { Injectable, signal } from '@angular/core';
import { Firestore,collection,addDoc,Timestamp, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ZincInterface } from '../zinc-details';

@Injectable({
  providedIn: 'root',
})
export class ZincService {
  constructor(private firestore: Firestore) { }

   addZinc(zinc: ZincInterface) {
    const colRef = collection(this.firestore, 'zinc_details');

    return addDoc(colRef, {
      ...zinc,
      date: Timestamp.fromDate(new Date(zinc.date)),
      createdAt: Timestamp.now()
    });
  }

  updateZincItem(data: any) {
    const docRef = doc(this.firestore, `zinc_details/${data.id}`);
    return updateDoc(docRef, data);
  }

  deleteZincItem(id: string) {
    const docRef = doc(this.firestore, `zinc_details/${id}`);
    return deleteDoc(docRef);
  }

  getZincDetails() {
    const colRef = collection(this.firestore, 'zinc_details');
    return collectionData(colRef, { idField: 'id' });
  }

}