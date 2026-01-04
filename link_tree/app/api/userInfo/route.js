import connectDB from "../../lib/mongodb";
import Bittree from "../../models/bittree";
export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        const handleExists = await Bittree.findOne({ handle: body.handle })
        if (!handleExists) {
            return Response.json({ success: false, msg: 'Handle Not Found' }, { status: 404 })
        }
        return Response.json({ success: true,handleExists, msg: 'Bittree Founded successfuly' }, { status: 201 })
    } catch (error) {
        return Response.json({ success: false, msg: error.message }, { status: 500 })
    }
}