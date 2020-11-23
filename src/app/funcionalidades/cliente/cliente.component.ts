import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { SelectItem } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cliente',
  templateUrl: 'cliente.component.html',
  styleUrls: ['cliente.component.css']
})


export class ClienteComponent implements OnInit {

  telefones: String [] = [];
  emails: String [] = [];
  cep: any;
  url = environment.apiUrl;
  public clientesList
  renderUpdate = false;

  public tipos: SelectItem[] = [
    {label: '', value: ''},
    {label: 'Residencial', value: 'Residencial'},
    {label: 'Comercial', value: 'Comercial'},
    {label: 'Celular', value: 'Celular'},
  ];

  public form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder:FormBuilder,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.setForm();
    this.popularClientes();
  }

  private setForm() {
    const group = {
      id: [null],
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
      telefones: [[]],
      emails: [[]],
      numero: [null],
      email: [null, Validators.email]
    };

    this.form = this.formBuilder.group(group);
  }
  validForm(){
    let valid : Boolean = true;
    if(this.form.get("nome").value == null || this.form.get("nome").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir um nome.');
    } else if(this.form.get("cpf").value == null || this.form.get("cpf").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir um CPF.');
    }else if(this.form.get("cep").value == null || this.form.get("cep").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir um Cep.');
    }else if(this.form.get("logradouro").value == null || this.form.get("logradouro").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir um Logradouro.');
    }else if(this.form.get("cidade").value == null || this.form.get("cidade").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir uma Cidade.');
    } else if(this.form.get("bairro").value == null || this.form.get("bairro").value == ''){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir um Bairro.');
    } else if(this.emails == null || this.emails.length == 0){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir pelo menos um Email.');
    } else if(this.telefones == null || this.telefones.length == 0){
      valid = false;
      this.toastService.addSingle('error', '', 'É necessário inserir pelo menos um Telefone.');
    }
    return valid;
  }
  public editarCliente(cliente){
    this.renderUpdate = true;
    const controls = this.form.controls;
    controls.id.setValue(cliente.id);
    controls.nome.setValue(cliente.nome);
    controls.cpf.setValue(cliente.cpf);
    controls.cep.setValue(cliente.cep);
    controls.logradouro.setValue(cliente.logradouro);
    controls.complemento.setValue(cliente.complemento);
    controls.uf.setValue(cliente.uf);
    controls.cidade.setValue(cliente.cidade);
    controls.bairro.setValue(cliente.bairro);
    this.emails = cliente.emails;
    this.telefones = cliente.telefones;
  }
  consultaCep(cep){
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`).toPromise()
        .then(response => {
          this.populaDadosCep(response);
        })
      }
      
    }
  }

  atualizarCliente(){
    const controls = this.form.controls; {
      controls.telefones.setValue(this.telefones);
      controls.emails.setValue(this.emails)
    }
    this.http.put(this.url + "/cliente", this.form.getRawValue()).subscribe(
      res => {
        this.toastService.addSingle('success', '', 'Cliente atualizado com Sucesso.');
        this.renderUpdate = false;
        this.popularClientes();
        this.ngOnInit();
        this.telefones = [];
        this.emails = [];
      }, erro =>{
        this.toastService.addSingle('error', '', 'Erro ao atualizar.');
      }
    )
  }
  populaDadosCep(dados){
    const controls = this.form.controls;
    controls.logradouro.setValue(dados.logradouro);
    controls.uf.setValue(dados.uf);
    controls.cidade.setValue(dados.localidade);
    controls.bairro.setValue(dados.bairro);
  }

  adicionarEmail(){
    let email = this.form.get("email").value;
    if (email == null || email ==''){
      this.toastService.addSingle('error', '', 'Email não pode ser vazio.');
    } else if (this.form.controls.email.valid) {
      const email: any = {
        email: this.form.get("email").value
      };
      this.emails.push(email)
      this.form.get("email").reset();
    } else {
      this.toastService.addSingle('error', '', 'Email inválido.');
    }
   
  }

  deleteEmail(i){
    this.emails.splice(i,1)
  }

  deleteTelefone(i){
   this.telefones.splice(i,1)
  }

  adicionarTelefone() {
    let tipo = this.form.get("tipoTelefoneSelecionado").value;
    let numero = this.form.get("numero").value
    console.log(tipo);
    console.log(numero);
    if (tipo == null || tipo == '') {
      this.toastService.addSingle('error', '', 'É necessário selecionar um tipo.');
    } else if (numero == null || numero == '') {
      this.toastService.addSingle('error', '', 'É necessário inserir um número.');
    } else {
      const telefone: any = {
        tipo: this.form.get("tipoTelefoneSelecionado").value,
        telefone: this.form.get("numero").value
      };
      this.telefones.push(telefone)
      const controls = this.form.controls; {
        controls.tipoTelefoneSelecionado.setValue(null);
        controls.numero.setValue(null);
      }
    }
  }

  salvar() {
    const controls = this.form.controls; {
      controls.telefones.setValue(this.telefones);
      controls.emails.setValue(this.emails)
    }
    if (this.validForm()) {
      this.http.post<any>(this.url + "/cliente", this.form.getRawValue()).subscribe(
        res => {
          this.ngOnInit();
          this.telefones = [];
          this.emails = [];
          this.toastService.addSingle('success', '', 'Cliente Adicionado com Sucesso.');
          this.popularClientes();
        }
      )
    }
  }

  deleteCliente(cliente){
    const id = cliente.id;
    this.http.delete(this.url+`/cliente/${id}`).subscribe(
      res => {
        this.toastService.addSingle('success', '', 'Cliente excluído com Sucesso.');
        this.popularClientes();
      }, erro =>{
        this.toastService.addSingle('error', '', 'Erro ao excluir.');
      })
  };

  popularClientes() {
    this.http.get(this.url + "/clientes").subscribe(
      res => {
        this.clientesList = res;
      }
    )
  }
}
