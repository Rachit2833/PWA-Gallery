import supabase from "../../Supabase";

export async function Logout(){
let { error } = await supabase.auth.signOut()

}