import { prop, Typegoose, ModelType, InstanceType } from 'typegoose'
import * as mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

class User extends Typegoose {
  @prop()
  id: string
}

class RequestedBot extends Typegoose {
  @prop({ required: true })
  owner: User
  
  @prop({ required: true })
  messageID: string
  
  @prop({ required: true })
  id: string
  
  @prop({ required: true })
  prefix: string
  
  @prop()
  lang: string
}

class AcceptedBot extends Typegoose {
  @prop({ required: true })
  owner: User
  
  @prop({ required: true })
  id: string
  
  @prop({ required: true })
  prefix: string
  
  @prop()
  lang: string
}

exports.AcceptedBot = new AcceptedBot().getModelForClass(AcceptedBot)
exports.RequestedBot = new RequestedBot().getModelForClass(RequestedBot)
exports.User = new User().getModelForClass(User)