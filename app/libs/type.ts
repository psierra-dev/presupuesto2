import { Database } from "./database-generated.types";

export type Obras = Database['public']['Tables']['obras']['Row']
export type BudgetJob = Database['public']['Tables']['budget_job']['Row']
export type Budget = Database['public']['Tables']['budget']['Row']