import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validation_messages = {
    'emial': [
      { type: 'required', message: 'email obrigatório' },
      { type: 'pattern', message: 'informe emial valido' }
    ],
    'password': [
      { type: 'required', message: 'senha obrigatória' },
      { type: 'minlenght', message: 'senha com minimo de 5 caracteres' }
    ]
  }

  validations_form: FormGroup;
  errorMessage: string = '';
  succesMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.succesMessage = "sua conta foi criada. faça login."
      }, err => {
        console.log(err),
          this.errorMessage = err.message;
        this.succesMessage = "";
      });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
