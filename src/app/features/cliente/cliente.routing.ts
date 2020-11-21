import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from 'src/app/features/cliente/cliente.component';

const routes: Routes = [
    {
        path: '',
        component: ClienteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule { }