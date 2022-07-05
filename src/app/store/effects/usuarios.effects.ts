import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as actions from "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
        ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( actions.cargarUsuarios ),
            mergeMap( 
                () => this.usuarioService.getUsers()
                    .pipe(
                        map(users=>actions.cargarUsuariosSuccess({usuarios: users})),
                        catchError((err) => of(actions.cargarUsuariosError({payload: err}))) // of: convierte a Observable
                    )
             )

        )
    );
}