import connectDB from "../../lib/mongodb";
import Bittree from "../../models/bittree";
export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        const handleExists = await Bittree.findOne({ handle: body.handle })
        if (!handleExists) {
            return Response.json({ success: true, msg: 'Bittree already deleted' }, { status: 400 })
        }
        console.log(body);
        const bittree = await Bittree.deleteOne({ handle: body.handle })
        return Response.json({ success: true, msg: 'Bittree deleted successfuly' }, { status: 201 })
    } catch (error) {
        return Response.json({ success: false, msg: 'Bittree Not found' }, { status: 500 })
    }
}