import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ERole } from "../enums/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Extract required roles from metadata
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(), 
      context.getClass()
    ]);

    console.log("reuqiredRoles In MTUB : ",requiredRoles)

    // If no roles are specified, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    console.log(" thie is {user} object from MTUB Role guard  : ",{user})
    const isRoleMatched = requiredRoles.some((role) => user.role === role);

    console.log("is role matched : ",isRoleMatched)


    
    if (!isRoleMatched) {
      throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}. User role: ${user.role}`);
    }

    return true;
  }
}