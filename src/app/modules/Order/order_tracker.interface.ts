import { Document, Types } from 'mongoose';

export interface TOrderTracker extends Document {
  deliveryStatus: string;
  reference: string;
  sideNotes: string;
  orderId: Types.ObjectId; 
  storeOwner: Types.ObjectId; 
  trackerLogs: Array<any>; 
}
