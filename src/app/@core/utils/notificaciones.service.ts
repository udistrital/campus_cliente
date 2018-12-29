import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
import { ConfiguracionService } from './../data/configuracion.service';
import { mergeMap, pluck } from 'rxjs/operators';
import { makeParamDecorator } from '@angular/core/src/util/decorators';
import { from } from 'rxjs';

const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;



@Injectable()
export class NotificacionesService {
    public messages: Subject<any>;
    listMessage: any;
    payload: any;
    private arrayMessagesSubject = new BehaviorSubject({});
    arrayMessages = this.arrayMessagesSubject.asObservable();

    constructor(wsService: WebsocketService,
        private confService: ConfiguracionService,
        authService: ImplicitAutenticationService,
    ) {
        this.listMessage = [];
        this.payload = authService.getPayload();
        this.messages = <Subject<any>>wsService
            .connect(CHAT_URL + `?id=${this.payload.sub}&profiles=admin`)
            .map((response: any) => {
                return JSON.parse(response.data)
            });
        this.queryNotification('admin');
        this.messages.subscribe(response => {
            console.info(response);
            this.addMessage(response);
        });
    }

    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage]
        this.arrayMessagesSubject.next(this.listMessage);
    }
    queryNotification(profile) {
        this.confService.get('notificacion?query=Usuario:' + this.payload.sub)
            .subscribe((resp: any) => {
                from(resp)
                    .subscribe((notify: any) => {
                        const message = {
                            Type: notify.NotificacionConfiguracion.Tipo.Id,
                            Content: JSON.parse(notify.CuerpoNotificacion),
                            User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                            Timestamp: notify.FechaCreacion,

                        };
                        this.addMessage(message);
                    });
            });
        this.confService.get('notificacion_configuracion_perfil?query=Perfil.Nombre:' + profile)
            .subscribe(response => {
                from(response)
                    .subscribe((res: any) => {
                        this.confService.get('notificacion?query=NotificacionConfiguracion.Id:' +
                            res.NotificacionConfiguracion.Id + ',Usuario:')
                            .subscribe((resp: any) => {
                                from(resp)
                                    .subscribe((notify: any) => {
                                        console.info(notify);
                                        const message = {
                                            Type: notify.NotificacionConfiguracion.Tipo.Id,
                                            Content: JSON.parse(notify.CuerpoNotificacion),
                                            User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                                            Timestamp: notify.FechaCreacion,
                                        };
                                        this.addMessage(message);
                                    });
                            });
                    });
            });
    }
}
