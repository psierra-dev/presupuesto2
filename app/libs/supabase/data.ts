import {supabase} from '@/app/libs/supabase/index'

const ITEMFORPAGE = 6
export const fetchFilteredObra = async (): Promise<number> => {
   const { data } = await (supabase.from('obras') as any).select()
   return data?.length ?? 0
}


