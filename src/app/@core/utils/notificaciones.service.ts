import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
import { ConfiguracionService } from './../data/configuracion.service';
import { from } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs-compat/operators/map';

const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;

@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {
    public messagesSubject: Subject<any>;

    public listMessage: any;
    public payload: any;

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();

    constructor(
        private confService: ConfiguracionService,
        private authService: ImplicitAutenticationService,
    ) {
        this.listMessage = [];
        this.connect();
        this.queryNotification('ADMIN_CAMPUS');
    }

    connect() {
        if (this.authService.live()) {
            this.payload = this.authService.getPayload();
            this.messagesSubject = webSocket(`${CHAT_URL}?id=${this.payload.sub}&profiles=${this.payload.role}`);
            this.messagesSubject
                .pipe(
                    map((msn) => {
                        this.listMessage = [...[msn], ...this.listMessage];
                        this.noNotifySubject.next(this.listMessage.length);
                        this.arrayMessagesSubject.next(this.listMessage);
                        return msn
                    }),
                )
                .subscribe(
                    (msg: any) => console.info('Nueva notificación', msg),
                    err => {
                        console.info(err);
                        this.connect();
                    },
                    () => console.info('complete'),
                );
        }
    }

    close() {
        this.messagesSubject.unsubscribe();
    }

    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next(this.listMessage.length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    queryNotification(profile) {
        this.confService.get('notificacion?query=Usuario:' + this.payload.sub + '&sortby=FechaCreacion&order=asc&limit=-1')
            .subscribe((resp: any) => {
                if (resp !== null) {
                    from(resp)
                        .subscribe((notify: any) => {
                            const message = {
                                Type: notify.NotificacionConfiguracion.Tipo.Id,
                                Content: JSON.parse(notify.CuerpoNotificacion),
                                User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                                FechaCreacion: new Date(notify.FechaCreacion),

                            };
                            this.addMessage(message);
                        });
                }
            });
        this.confService.get('notificacion_configuracion_perfil?query=Perfil.Nombre:' + profile + '&limit=-1')
            .subscribe(response => {
                from(response)
                    .subscribe((res: any) => {
                        this.confService.get('notificacion?query=NotificacionConfiguracion.Id:' +
                            res.NotificacionConfiguracion.Id + ',Usuario:' + '&sortby=FechaCreacion&order=asc&limit=-1')
                            .subscribe((resp: any) => {
                                if (resp !== null) {
                                    from(resp)
                                        .subscribe((notify: any) => {
                                            const message = {
                                                Type: notify.NotificacionConfiguracion.Tipo.Id,
                                                Content: JSON.parse(notify.CuerpoNotificacion),
                                                User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                                                FechaCreacion: new Date(notify.FechaCreacion),
                                            };
                                            this.addMessage(message);
                                        });
                                }
                            });
                    });
            });
    }
}
