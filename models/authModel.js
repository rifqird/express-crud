import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    name: { type: String, required: [true,"Nama wajib diisi"] },
    email: { type: String, required: [true,"Email wajib diisi"], unique: true, match: [/.+@.+\..+/, 'Email tidak valid'] },
    password: { type: String, required: [true,"Password wajib diisi"], minlength: [6, 'Password minimal 6 karakter'] },
},{timestamps:true});
export const User = mongoose.model("User", authSchema);