import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'shared/utility/logger/logger.service';

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
    private logger:LoggerService=new LoggerService('GrpcLoggingInterceptor');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const call: any = context.switchToRpc().getContext();
        
        // Ensure call is an instance of ClientReadableStream before using getMetadata
        console.log(`[gRPC] Request to ${call?.req.route.path}:`, call.req.body);

        return next.handle().pipe(
            tap((data) => {
                console.log(`[gRPC] Response from ${call?.req.route.path}:`, data);
            })
        );
    }
}
