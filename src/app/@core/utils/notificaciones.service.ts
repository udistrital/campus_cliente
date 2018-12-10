import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;

export interface Message {
    author: string,
    message: string,
}

@Injectable()
export class NotificacionesService {
    public messages: Subject<Message>;
    payload: any;
    constructor(wsService: WebsocketService,
    authService: ImplicitAutenticationService,
    ) {
        this.payload = authService.getPayload();
        console.info(this.payload);
        this.messages = <Subject<Message>>wsService
            .connect(CHAT_URL + `?id=${this.payload.sub}&profiles=[admin]`)
            .map((response: MessageEvent): Message => {
                const data = JSON.parse(response.data);
                return {
                    author: data.author,
                    message: data.message,
                }
            });
    }
}
