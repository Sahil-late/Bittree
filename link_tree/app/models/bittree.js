import mongoose from "mongoose";
const bittreeSchema = new mongoose.Schema({
   handle:String,
   links:[{ link: String, linkText: String }],
   pics:String,
})

const Bittree = mongoose.models.Bittree || mongoose.model('Bittree',bittreeSchema);
export default Bittree