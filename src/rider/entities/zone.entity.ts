import { timestamp } from "rxjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

@Entity()
export class Zone 
{
  @PrimaryGeneratedColumn()
   id:number;

   @Column()
   name:string;

   @Column({type: 'timestamp'})
   createdAt:Date;

   @Column({type : 'timestamp', default:()=>'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP'})
   updatedAt:Date;

   @OneToMany(()=>Area,(area)=>area.zone)
   areas:Area[];

}