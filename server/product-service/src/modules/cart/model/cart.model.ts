// modules/cart/model/cart.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface CartItem extends Document {
    productId: string;
    quantity: number;
}

const CartItemSchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

export default mongoose.model<CartItem>('CartItem', CartItemSchema);
