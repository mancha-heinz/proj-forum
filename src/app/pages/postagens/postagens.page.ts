import { Postagem, PostagensService } from './../../services/postagens.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from './../../services/categorias.service'

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.page.html',
  styleUrls: ['./postagens.page.scss'],
})
export class PostagensPage implements OnInit {

  postagem: Postagem = {
    titulo: "",
    assunto: "",
    texto: "",
    categoria: "" //refere as cadegorias
  }

  postagemId = null;
  categorias: Categoria[];

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private postagemService: PostagensService,
    private loading: LoadingController,
    private categoriaService: CategoriasService
  ) { }

  ngOnInit() {
    this.postagemId = this.route.snapshot.params['id'];
    if (this.postagemId) {
      this.loadPostagem();
    }
    this.categoriaService.getTodos().subscribe(res => { //busca as cadegorias do db
      this.categorias = res;
    })
  }

  async loadPostagem() {
    const loading = await this.loading.create({
      message: "carregando postagem..."
    })
    await loading.present();
    this.postagemService.getPostagem(this.postagemId).subscribe(res => {
      loading.dismiss(); //para de mostrar o loading;
      this.postagem = res;
    })
  }

  async savePostagem() {
    const loading = await this.loading.create({
      message: "salvando postagem..."
    })
    await loading.present(); //mostra o loading;
    if (this.postagemId) { //salva alteracao
      this.postagemService.updatePostagem(this.postagemId, this.postagem).then(() => {
        loading.dismiss(); //para de mostrar o loading
        this.nav.back(); //volta p/ pagina da listagem;
      })
    } else { //salva inclusao
      //pegar o categorias.titulo do frondend e passa postagens.categoria=categoria.tiulo
      this.postagemService.addPostagem(this.postagem).then(() => {
        loading.dismiss(); //para de mostrar o loading
        this.nav.back(); //volta p/ pagina da listagem;
      })
    }
  }

  /*buscaCategoria() {
    this.categoriaService.getTodos().subscribe(res => {
      this.categorias = res;
    })
  }*/
}
