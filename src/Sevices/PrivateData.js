import supabase from "../../Supabase"

export async function getPrivateData(){

let { data: Private, error } = await supabase
  .from('Private')
  .select('*')
       return Private   
}