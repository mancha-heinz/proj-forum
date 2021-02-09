import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  /*{
    path: 'postagens',
    loadChildren: () => import('./pages/postagens/postagens.module').then( m => m.PostagensPageModule)
  },*/

  //postagens
  { path: 'postagens/:id', loadChildren: './pages/postagens/postagens.module#PostagensPageModule' },  
  { path: 'postagens', loadChildren: './pages/postagens/postagens.module#PostagensPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  
  //categorias
  { path: 'categorias/:id', loadChildren: './pages/categorias/categorias.module#CategoriasPageModule' },  
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  /*{
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },*/
  /*{
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },*/
  /*{ path: 'usuarios/:id', loadChildren: './pages/usuarios/usuarios.module#UsuariosPageModule' },  
  { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosPageModule' }*/
  /*{
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
