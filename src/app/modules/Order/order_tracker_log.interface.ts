import { Document, ObjectId } from 'mongoose'
export interface TOrderTrackerLogs extends Document {
  status: string
  reference: string
  sideNotes: string
  orderTrackerId: ObjectId
}
