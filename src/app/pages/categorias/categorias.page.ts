import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Categoria, CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categoria: Categoria = {
    titulo: ""
  }

  categoriaId = null;

  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private categoriaService: CategoriasService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.categoriaId = this.router.snapshot.params['id'];
    if (this.categoriaId) {
      this.loadCategoria();
    }
  }

  async loadCategoria() {
    const loading = await this.loading.create({
      message: "carregando categoria..."
    })
    await loading.present();
    this.categoriaService.getCategoria(this.categoriaId).subscribe(res => {
      loading.dismiss();
      this.categoria = res;
    })
  }

  async saveCategoria() {
    const loading = await this.loading.create({
      message: "salvando categoria..."
    })
    await loading.present(); //mostra o loading;
    if (this.categoriaId) { //salva alteracao
      this.categoriaService.updateCategoria(this.categoriaId, this.categoria).then(() => {
        loading.dismiss(); //para de mostrar o loading
        this.nav.back(); //volta p/ pagina da listagem;
      })
    } else { //salva inclusao
      this.categoriaService.addCategoria(this.categoria).then(() => {
        loading.dismiss(); //para de mostrar o loading
        this.nav.back(); //volta p/ pagina da listagem;
      })
    }
  }
}
