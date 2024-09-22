import { applyDecorators, createParamDecorator, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './constants';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    let canActivate;
    try{
      canActivate = await super.canActivate(context);
    }catch(e){
      if (isPublic && e?.response?.statusCode === 401) {
        return true;
      }else{
        throw e;
      }
    }
    return canActivate;
  }
}


export const Auth = () => UseGuards(JwtAuthGuard);
export const PublicMeta = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Public =  ()=> applyDecorators(PublicMeta(),ApiTags('public'));

export const UID = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req?.user?.user_id;
})
