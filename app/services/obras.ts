import { type PostgrestSingleResponse, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../libs/database-generated.types";


export class ObraService {
    db: any
    constructor(db: any) {
        this.db = db
    }

    async getObras(id_user: string, query: string, currentPage: number ) {
        const ITEMFORPAGE = 7
        const fromaux =  (currentPage - 1) * (ITEMFORPAGE - 1)
        const from = currentPage > 1 ? fromaux + (currentPage - 1) : fromaux
        const to = from + (ITEMFORPAGE - 1)

        const querybd = this.db.from("obras").select().eq('id_user', id_user)

        if(query) {
          querybd.ilike('name', `%${query}%`)
        }

        //const {data, error} = await this.db.from("obras").select().eq('id_user', id_user).range(from, to)
        const {data: all_data} = await  querybd
        console.log('count', all_data?.length)
        const {data, error} = await querybd.range(from, to)

        
        if(error){
          console.log(error, 'error')
          
        }
        
        //const count = await this.db.from('obras').select()
      //  const count = this.db.rpc("hello_world")
       // console.log(count, 'count')
        return {data,  error, total: all_data?.length}
    }

    

    async createBulkObras() {
       const  {error} = await this.db.from('obras').insert( [
            {
              name: "Construcción de vivienda familiar",
              direction: "Calle Mayor, 123",
              state: "uninitiated",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Reforma de baño",
              direction: "Avenida del Sol, 456",
              state: "started",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Reparación de tejado",
              direction: "Callejón del Viento, 7",
              state: "completed",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Pintura de fachada",
              direction: "Plaza de la Iglesia, 10",
              state: "uninitiated",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Instalación de puerta",
              direction: "Callejón de la Luna, 2",
              state: "started",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Colocación de suelo",
              direction: "Callejón del Sol, 11",
              state: "completed",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Alicatado de baño",
              direction: "Calle Mayor, 234",
              state: "uninitiated",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Montaje de muebles",
              direction: "Avenida del Sol, 567",
              state: "started",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Reparación de ventana",
              direction: "Callejón del Viento, 14",
              state: "completed",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
            {
              name: "Mantenimiento de jardín",
              direction: "Plaza de la Iglesia, 20",
              state: "uninitiated",
              id_user: "af62c8d8-1516-4c5a-ad6b-e9a9993c582f",
            },
          ]
          )

          console.log('error', error)
    }


}