//arquivo .d.ts é uma arquivo com apenas definições de tipos;
//apenas códigos typescript
//eslint-disable-next-line
import {Knex} from 'knex';

declare module 'knex/types/tables'{
  export interface Tables{
  transactions:{
    id: string,
    title: string,
    amount: number,
    created_at: string,
    session_id?:string
  }
  }
}