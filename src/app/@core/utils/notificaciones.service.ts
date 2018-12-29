import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;



@Injectable()
export class NotificacionesService {
    public messages: Subject<any>;
    listMessage: any;
    private arrayMessagesSubject = new BehaviorSubject({});
    arrayMessages = this.arrayMessagesSubject.asObservable();

    constructor(wsService: WebsocketService,
        authService: ImplicitAutenticationService,
    ) {
        this.listMessage = [];
        const payload = authService.getPayload();
        this.messages = <Subject<any>>wsService
            .connect(CHAT_URL + `?id=${payload.sub}&profiles=admin`)
            .map((response: any) => {
                return JSON.parse(response.data)
            });
    }

    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage]
        this.arrayMessagesSubject.next(this.listMessage);
    }
}
