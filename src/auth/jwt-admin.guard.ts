import { CanActivate, createParamDecorator, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class JwtAdminAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {    }

    canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest();
        // console.log('AdminsOnly',user, !!user.admin);
        return !!user.admin;
    }
}

export const AdminsOnly = () => UseGuards(JwtAuthGuard, JwtAdminAuthGuard);

