import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatRoomListComponent } from '../component/chat-room-list/chat-room-list.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db:AngularFirestore) { }



//   public getRooms():Observable<Array<>>{
// this.db.collection("rooms").snapshotChanges()
//   }
}
