import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { ClienteRoutingModule } from 'src/app/funcionalidades/cliente/cliente.routing';
import { ClienteComponent } from 'src/app/funcionalidades/cliente/cliente.component';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AppCommonModule
  ],
  declarations: [ClienteComponent]
})
export class ClienteModule { }