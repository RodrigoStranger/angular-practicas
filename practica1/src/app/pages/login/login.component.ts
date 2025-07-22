import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.form = fb.group({
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("=>", this.form.getRawValue())
  }

  iniciarSesion(){
    console.log("=>", this.form.getRawValue())
    console.log("usuario =>", this.form.controls['usuario'].value)
    console.log("contrasenia =>", this.form.controls['contrasenia'].value)
    console.log("=>", this.form.valid)
  }

}
