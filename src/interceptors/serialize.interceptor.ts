/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<any>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        // assign values in data to UserDto
        return plainToClass(this.dto, data, {
          // only share or expose column that are allowed to exposed (has @Expose()).
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
