import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IChatRoom } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: AngularFirestore) {}

  public getRooms(): Observable<Array<IChatRoom>> {
    return this.db
      .collection('rooms')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const id = snap.payload.doc.id;
            const data = <IChatRoom>snap.payload.doc.data();
            return <IChatRoom>{
              ...data,
              id,
            };
          });
        })
      );
  }
}
