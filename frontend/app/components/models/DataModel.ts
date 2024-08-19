import mongoose, { Document, Schema } from 'mongoose';

interface IData extends Document {
    story_id: number;
    title: string;
    author: string;
    created: Number;
    link: string;
    noShow: number;
}

const DataSchema: Schema = new Schema<IData>({
    story_id: {type:Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    created: { type: Number, required: true },
    link: { type: String, required: true },
    noShow: { type: Number, default: null },
});

const Data = mongoose.model<IData>('Data', DataSchema);

export default Data;