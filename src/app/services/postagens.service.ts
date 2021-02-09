import { map } from 'rxjs/operators';
//import { Postagem } from './postagens.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Categoria } from './categorias.service';

export interface Postagem {
  id?: string,
  titulo: string,
  assunto: string,
  texto: string,
  categoria: string //refere as cadegorias
}

@Injectable({
  providedIn: 'root'
})
export class PostagensService {

  private postagensCollection: AngularFirestoreCollection<Postagem>
  private postagens: Observable<Postagem[]>
  private categorias: Observable<Categoria[]> //refere as cadegorias

  constructor(db: AngularFirestore) {
    this.postagensCollection = db.collection<Postagem>('postagem');
    this.postagens = this.postagensCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getTodos() {
    return this.postagens;
  }

  getPostagem(id) {
    return this.postagensCollection.doc<Postagem>(id).valueChanges();
  }

  updatePostagem(id, postagem) {
    return this.postagensCollection.doc(id).update(postagem);
  }

  addPostagem(postagem) {
    return this.postagensCollection.add(postagem);
  }

  removePostagem(id) {
    return this.postagensCollection.doc(id).delete();
  }

  pesquisaCategorias() { //refere as cadegorias
    return this.categorias;
  }
}
