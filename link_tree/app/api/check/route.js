import { log } from "console";
import connectDB from "../../lib/mongodb";
import Bittree from "../../models/bittree";
export async function POST(request) {
    try {
        await connectDB()
        
        const body = await request.json()
        console.log(body);
        
        const handleExists = await Bittree.findOne({ handle: body.handle })
        if (handleExists) {
            return Response.json({ success: true, msg: 'Bittree foundded', data: handleExists }, { status: 200 })
        }
        return Response.json({ success: false, msg: 'Bittree Not found' }, { status: 404 })
    } catch (error) {
        console.log(error);
        
        return Response.json({ success: false, msg: 'Internal server error' }, { status: 500 })        
    }
}