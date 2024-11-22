import { ERole } from 'src/rider/enums/roles.enum';

declare module 'express'{
interface Request
{
    user?:{
        id:string;
        role:ERole;
        email:string;
    }
}
}