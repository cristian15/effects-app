import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as actions from "../actions";

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
        ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( actions.cargarUsuario ),
            mergeMap( 
                (action) => this.usuarioService.getUser(action.id)
                    .pipe(
                        map(user=>actions.cargarUsuarioSuccess({usuario: user})),
                        catchError((err) => of(actions.cargarUsuarioError({payload: err}))) // of: convierte a Observable
                    )
             )

        )
    );
}