import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import swal from 'sweetalert2'

import { LoginService } from 'src/app/_services/login.service';
@Component({
  selector: 'app-login-administador',
  templateUrl: './login-administador.component.html',
  styleUrls: ['./login-administador.component.css']
})
export class LoginAdministadorComponent implements OnInit {

  loginForm: FormGroup
  email = ''
  password = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    console.log("((((((((((")
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.loginForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.loginForm.invalid){
      let campos_invalidos = this.camposInvalidos()
      if (campos_invalidos.includes("email")){
        swal.fire(
          {
            title: 'El correo es invalido.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else if (campos_invalidos.includes("password")){
        swal.fire(
          {
            title: 'La contraseña debe ser al menos de 8 caracteres.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else {
        swal.fire(
          {
            title: 'Todos los campos son obligatorios',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }

      return
    }else{
        this.loginService.autenticarAdmin(this.loginForm.value).pipe(first())
        .subscribe(res => {
          localStorage.setItem('token', res.token);
          swal.fire({
            title: 'Bienvenido.',
            text: "Sesión Iniciada",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          console.log(this.loginForm.controls['email'].value);
          this.loginService.loggedIn(this.loginForm.controls['email'].value, res);
          this.router.navigate(['/evento']);
          },
          err => {
          swal.fire({
            title: 'Credenciades Invalidas.',
            text: "Por favor verifica las credenciales",
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          console.log(err);
          }
        );
    }
  }

}
