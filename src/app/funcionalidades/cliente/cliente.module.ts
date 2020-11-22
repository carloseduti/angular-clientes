import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { ClienteRoutingModule } from 'src/app/funcionalidades/cliente/cliente.routing';
import { ClienteComponent } from 'src/app/funcionalidades/cliente/cliente.component';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';


@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AppCommonModule,
    InputMaskModule,
    FieldsetModule,
    DropdownModule,
    ButtonModule
  ],
  declarations: [ClienteComponent]
})
export class ClienteModule { }