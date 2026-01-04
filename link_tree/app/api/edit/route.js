import connectDB from "../../lib/mongodb";
import Bittree from "../../models/bittree";
export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()
        const handleExists = await Bittree.findOne({ handle: body.handle })
        if (handleExists) {
            await Bittree.updateOne({ handle: body.handle }, body)
            return Response.json({ success: true, msg: 'Bittree updated successfuly' }, { status: 200 })
        }
        return Response.json({ success: false, msg: 'Bittree not found' }, { status: 401 })
    } catch (error) {
        return Response.json({ success: false}, { status: 500 })
    }
}