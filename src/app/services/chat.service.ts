import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IChatRoom, IMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private _db: AngularFirestore) {}

  public getRooms(): Observable<Array<IChatRoom>> {
    return this._db
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

  public getRoomMessages(roomId: string): Observable<Array<IMessage>> {
   return this._db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((messages) => {
          return messages.map((message) => {
            const id = message.payload.doc.id;
            const data: IMessage = <IMessage>message.payload.doc.data();
            return <IMessage>{
              ...data,
              id,
            };
          });
        })
      );
  }
}
