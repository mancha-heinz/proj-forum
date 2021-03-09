import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Imagem {
  id?: string;
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImagensService {

  private imagensCollection: AngularFirestoreCollection<Imagem>
  private imagens: Observable<Imagem[]>

  constructor(db: AngularFirestore) {
    this.imagensCollection = db.collection<Imagem>('imagem');
    this.imagens = this.imagensCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getTodos() {
    return this.imagens;
  }

  getImagem(id) {
    return this.imagensCollection.doc<Imagem>(id).valueChanges();
  }

  updateImagem(id, imagem) {
    return this.imagensCollection.doc(id).update(imagem);
  }

  addImagem(imagem) {
    return this.imagensCollection.add(imagem);
  }

  removeImagem(id) {
    return this.imagensCollection.doc(id).delete();
  }
}
