import dbConnect from "@/app/lib/databaseConnection";
import User from "@/app/models/user.model";
import bcript from "bcryptjs";

export async function POST (request: Request){

    const { email, password } = await request.json();
    try{

        await dbConnect();
        if( !email && !password ){
            return new Response(JSON.stringify(
            {
                success: false,
                message: "This Email and Password must required",
            }), {
                status: 400,
            headers: { "Content-Type": "application/json" },
            });
        }

        const email_already_exist = await User.findOne({email});
        if(!email_already_exist){
            return new Response(JSON.stringify(
            {
                success: false,
                message: "This email is not found in DataBase",
            }), {
                status: 400,
            headers: { "Content-Type": "application/json" },
            });
        }

        const databasePassword = email_already_exist.password;
        const isPasswordCorrect = await bcript.compare(password, databasePassword);
        
        if(!isPasswordCorrect){
            return new Response(JSON.stringify(
            {
                success: false,
                message: "Your Passwrod is wronge",
            }), {
                status: 400,
            headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(
            {
                success: true,
                message: "Login Successfully",
            }), {
                status: 200,
            headers: { "Content-Type": "application/json" },
        });

    }catch(error){
        console.error("DB Connection Failed");
        return new Response(JSON.stringify(
            {
                success: false,
                message: "DB Connection Failed",
            }), {
                status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

}