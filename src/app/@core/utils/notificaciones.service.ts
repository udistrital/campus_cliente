import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://localhost:8080/ws/join';

export interface Message {
    author: string,
    message: string
}

@Injectable()
export class NotificacionesService {
    public messages: Subject<Message>;

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<Message>>wsService
            .connect(CHAT_URL + '?id=uid&profiles=[admin]')
            .map((response: MessageEvent): Message => {
                const data = JSON.parse(response.data);
                return {
                    author: data.author,
                    message: data.message,
                }
            });
    }
}
