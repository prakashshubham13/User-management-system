import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
role:{
    type:String,
    default:"user",
    enum:["user","admin"]
},
password:{
    type:String,
    required:true
}
});

// 
userSchema.pre('save',async function(next){
  try{
    if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
  }catch(error){
     next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try{
    let update = {...this.getUpdate()};
    // Only run this function if password was modified
    if (update.password){
      console.log(this.getUpdate().password);
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(this.getUpdate().password, salt);
        this.setUpdate(update);
      }
      next()
  }catch(error){
     next(error);
  }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
    }
}    

export default mongoose.model("User", userSchema);