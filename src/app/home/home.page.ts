import { Postagem, PostagensService } from './../services/postagens.service';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { OnInit } from '@angular/core'; //pesquisa
//import { first } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  postagens: Postagem[];
  //public postagensList: Postagem[];
  postagensList: any[];
  postagensBackup: any[];
  termo: string;
  list: any[]

  constructor(
    private postagemService: PostagensService,
    private firestore: AngularFirestore) {
  }

  async ngOnInit() {
    this.postagemService.getTodos().subscribe(res => {
      this.postagens = res;
    })
    //this.postagensList = await this.initializeItems();
  }

  /*async initializeItems(): Promise<any> {
    const postagensList = await this.firestore.collection('postagensList').valueChanges().pipe(first()).toPromise();
    this.postagensBackup = postagensList;
    return postagensList;
  }*/

  /*async filterList(evt) { //eh executada a cada tecla pressionada na barra de pesquisa
    this.postagensList = this.postagensBackup; //redefine o foofListArray
    const searchTerm = evt.srcElement.value; //define o termo na barra de pesquisa
    if (!searchTerm) {
      return;
    }
    this.postagensList = this.postagensList.filter(currentdFood => {
      if (currentdFood.titulo && searchTerm) { //verifica a string em relacao ao valor do nome da lista de db
        return (currentdFood.titulo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }*/

  filtroList(evt) {
    this.postagemService.getTodos().subscribe(res => { //retorna as postagens do firebase
      this.postagensList = res;
    })
    const termo = evt.srcElement.value;
    console.log("FILTRO-> " + termo);
    console.log(this.postagensList); //postagens fo firebase
    if (!termo) {
      return
    }
  }

  remove(item) {
    this.postagemService.removePostagem(item.id);
  }

  openFacebook() {
    Browser.open({ url: 'https://facebook.com/' });
  }

  openInstagram() {
    Browser.open({ url: 'https://www.instagram.com/' });
  }

  openTwitter() {
    Browser.open({ url: 'https://twitter.com/' });
  }
}
