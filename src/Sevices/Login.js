import supabase from "../../Supabase";

export async function loginUser(Data) {
  try {

    let { data, error } = await supabase.auth.signInWithPassword({
      email: Data.Email,
      password: Data.Password,
    });

    if (error) {
      console.error("Login error:", error.message);
      throw new Error("Login failed");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error("Login failed");
  }
}
 

export async function getSession(){
  const {data:session} =await supabase.auth.getSession()
  if(!session.session){
    return null
  }
  const {data,error} =await supabase.auth.getUser()
   return data?.user
}