import dbConnect from "@/app/lib/databaseConnection";
import User from "@/app/models/user.model";

export async function POST (requrest: Request){
    return Response.json({
        success: true,
        message: "OKAY",
    },{
        status: 200,
    })
}