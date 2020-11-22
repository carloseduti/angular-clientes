import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

interface Tipos {
  nome: string,
  tipo: string
}

@Component({
  selector: 'app-cliente',
  templateUrl: 'cliente.component.html',
  styleUrls: ['cliente.component.css']
})


export class ClienteComponent implements OnInit {

  tipos: Tipos[];
  telefones: String [] = [];
  emails: String [] = [];
  cep: any;

  public form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder:FormBuilder) {

    this.tipos = [
      {nome: '', tipo: ''},
      {nome: 'Residencial', tipo: 'RES'},
      {nome: 'Comercial', tipo: 'COM'},
      {nome: 'Celular', tipo: 'CEL'}
    ];

  }

  ngOnInit() {
    this.setForm();
  }

  private setForm() {
    const group = {
      nome: ['', 
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      cpf: [null, Validators.required],
      cep: [null, Validators.required],
      logradouro: [null, Validators.required],
      complemento: [null],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      tipoTelefoneSelecionado: [null],
      numero: [null],
      email: [null, Validators.email]
    };

    this.form = this.formBuilder.group(group);
  }

  consultaCep(cep){
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {
        console.log("cep =>", cep)
        this.http.get(`//viacep.com.br/ws/${cep}/json`).toPromise()
        .then(response => {
          this.populaDadosCep(response);
        })
      }
      
    }
  }

  populaDadosCep(dados){
    console.log(dados)
    const controls = this.form.controls;
    controls.logradouro.setValue(dados.logradouro);
    controls.uf.setValue(dados.uf);
    controls.cidade.setValue(dados.localidade);
    controls.bairro.setValue(dados.bairro);
    console.log(this.form.getRawValue())
  }

  adicionarEmail(){
    this.emails.push(this.form.get("email").value)
  }

  editEmail(email){

  }

  deleteEmail(email){

  }
  adicionarTelefone(){
    console.log(this.form.get("email").value())
  }

  salvar(){
    console.log(this.form.getRawValue())
  }
}
