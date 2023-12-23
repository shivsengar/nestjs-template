import { Observable } from "rxjs";
import { AddRequest, AddResponse } from "../dto/DtoTemplate";
import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

interface SimpleMSServiceIfc {
    Add(request: AddRequest): Observable<AddResponse>;
}

@Injectable()
export class SimpleMSService {
    private simpleMSService: SimpleMSServiceIfc;
    constructor(
        @Inject('simplems')
        private simplemsClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.simpleMSService = this.simplemsClient.getService<SimpleMSServiceIfc>('SimpleMS');
    }

    async Add(request:AddRequest){
        return this.simpleMSService.Add(request).toPromise();
    }
}