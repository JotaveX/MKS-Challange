import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    
    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

        if(!requiredRoles) {
            return true;
        }

        const {user} = context.switchToHttp().getRequest();

        if(!user) {
            return false;
        }

        const rolesFilter = requiredRoles.filter(role => role === user.role);

        return rolesFilter.length > 0;

        return requiredRoles.length > 0 
    }

}