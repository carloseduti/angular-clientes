import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'cliente',
            loadChildren: () => import('src/app/features/cliente/cliente.module').then(m => m.ClienteModule),
            canActivate: [AuthGuard]
        },
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }