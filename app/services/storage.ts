import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../libs/database-generated.types"
import { v4 as uuidv4 } from "uuid";

export class StorageService  {
    db: any
    constructor(db: any) {
        this.db = db
    }


    async upload_image(user_id: string, file: File) {
        const idImage = uuidv4()
        console.log(user_id, file)
        const { data, error } = await this.db.storage.from('obra').upload(`${user_id}/${idImage}`, file)
        console.log('errorImage', error, data)
        const {
            data: { publicUrl },
          } = this.db.storage.from("obra").getPublicUrl(data?.path as string);
  
          return publicUrl
    }
}