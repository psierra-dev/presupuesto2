'use server'
import { z } from 'zod';
import { createClient } from '../utils/supabase/server';
import { cookies } from 'next/headers';
import { StorageService } from '../services/storage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchemas = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
    required_error: 'Este campo es requerido'
  }),
  name: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
  
});

const CreateInvoice = FormSchemas.omit({ id: true, date: true });
const UpdateInvoice = FormSchemas.omit({ date: true, id: true });
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    name?: string[]
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  console.log(formData.get('name'), 'name', formData.get('customerId'), 'customerId', formData.get('amount'))
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    name: formData.get('name') ? formData.get('name') : null 
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  return {
    errors: {},
    message: 'Missing Fields. Failed to Create Invoice.',
  };
}

const supabase = () =>  createClient(cookies())
const auth = async () => {
  const {data, error} = await supabase().auth.getUser()

  if(error) {
    throw new Error('Deberias iniciar session para realizar esta accion')
  }

  return data.user
}

const FormSchema = z.object({
    id: z.string(),
    user_id: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    name: z.string({
      invalid_type_error: 'Este campo no deberia estar vacio'
    }),
    direction: z.string({
      invalid_type_error: 'Este campo no deberia estar vacio'
    }),
    
    file: z.any({
      invalid_type_error: 'error file'
    }),
    state: z.enum(['completed', 'started', 'uninitiated'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    start_date: z.string(),
    end_date: z.string(),
  });

  const CreateObra = FormSchema.omit({id: true, user_id: true})
  const UpdateObra = FormSchema.omit({id: true, user_id: true})

  
export async function createOrUpdateObra(prevState: State ,formData: FormData, type: "create" | "update", id_obra: string | number) {
  console.log('action', formData.get('name'))
  
    const validatedFields = CreateObra.safeParse( {
        name: formData.get('name') ? formData.get('name') : null, 
        direction: formData.get('direction') ? formData.get('direction') : null, 
        start_date: formData.get('start_date') ,
        end_date: formData.get('end_date'),
        state: formData.get('state')
    })
    
    if(!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create or Update Obra.',
      };
    }

     const { name, direction, file, start_date, end_date, state } = validatedFields.data;

      let newObj: any = {name, direction, state}

      if(Boolean(start_date) && Boolean(end_date)) newObj = {...newObj, start_date, end_date}

      
          const user = await auth()
        
          /*if(file.size > 0) {
            const storage = new StorageService(supabase())
            const image_url = await storage.upload_image(user?.id!, file)
  
            newObj = {...newObj , image_url: image_url}
          }*/
          
        if(type === "create") {
          const {data, error: errorInsert} = await (supabase().from('obras') as any).insert({...newObj, id_user: user?.id})
          if(errorInsert) {
            return {
              message: "Error al crear",
              errors: {}
            }
          }

        
          revalidatePath('/dashboard/obras');
          redirect('/dashboard/obras');

        } else {
          console.log(user.id, 'id_user')
          console.log(id_obra, 'id_obra')
          console.log(newObj, 'obj')
          const {error: errorUpdate} = await (supabase().from('obras') as any).update({...newObj}).eq("id", Number(id_obra))

          if(errorUpdate) {
            console.log(errorUpdate, 'error')
            return {
              message: "Error al actualizar",
              errors: {}
              }
            }

          revalidatePath(`/dashboard/obras/${id_obra}`);
          return {
              message: "Se actualizo correctamente",
              errors: {}
            }
          }
  }




export async function upadteJob(prevState: any,formData: FormData, id: number, id_obra: string | number) {
  const meter = formData.get('meter')

    await auth()    
    const {error: error_job, data: budget_job} = await (supabase().from('budget_job') as any).update({meter: Number(meter)}).eq('id', id).select().single()

    if(error_job){
      return {
        message:'error al actualizar'
      }
    }
    await (supabase() as any).rpc("sum_total", { id_other: budget_job.id_budget! })

    revalidatePath(`/dashboard/obras/${id_obra}`);
    return {
      message:'Se actualizo correctamente'
    }
}

export async function deleteJob(id: number, id_obra: string) {
    await auth()

    const {data, error} = await (supabase().from('budget_job') as any).delete().eq('id', id).select().single()
    console.log(data?.id_budget, 'id')
    await (supabase() as any).rpc("sum_total", { id_other: data?.id_budget! })
    revalidatePath(`/dashboard/obras/${id_obra}`);
}


export async function addJob(data: any, id_budget: string | number, formData: FormData) {
  await auth()

  console.log(data, id_budget, 'data')
 // const { error } = await supabase().from("budget_job").insert(data).eq('id_budget', id_budget)
  //if(error)  throw new Error("Error al añadir los items")
}


export async function upadteCharged(prevState: any,formData: FormData, id: number, id_obra: string | number) {
  const charged = formData.get('charged')
 
  console.log(charged, 'charged')
    await auth()    
  const {error: error_job } = await (supabase().from('budget') as any).update({charged: Number(charged)}).eq('id', id)

    if(error_job){
      return {
        message:'error al actualizar'
      }
    }
    revalidatePath(`/dashboard/obras/${id_obra}`);
    return {
      message:'Se actualizo correctamente'
    }
}


export async function signOut() {
  const {error} = await supabase().auth.signOut();

  if(error) {
    console.log(error)
  }

  redirect("/")
}