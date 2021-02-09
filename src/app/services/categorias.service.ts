import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Categoria {
  id?: string,
  titulo: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categoriasCollection: AngularFirestoreCollection<Categoria>
  private categorias: Observable<Categoria[]>

  constructor(db: AngularFirestore) {
    this.categoriasCollection = db.collection<Categoria>('categoria');
    this.categorias = this.categoriasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getTodos() {
    return this.categorias;
  }

  getCategoria(id) {
    return this.categoriasCollection.doc<Categoria>(id).valueChanges();
  }

  updateCategoria(id, categoria) {
    return this.categoriasCollection.doc(id).update(categoria);
  }

  addCategoria(categoria) {
    return this.categoriasCollection.add(categoria);
  }

  removeCategoria(id) {
    return this.categoriasCollection.doc(id).delete();
  }
}
