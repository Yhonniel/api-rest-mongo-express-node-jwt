
import { User } from "../models/Users.js";
import jwt from "jsonwebtoken"

export const register = async(req, res) => {
 const {email, password} = req.body;
  try {

    //alternativa buscando email  

    let user = await User.findOne({email});
    if (user) throw { code: 11000};
    
    user = new User({email, password});
    await user.save();
    
     // Generar token JWT

    return res.status(201).json({ok:true});

  } catch (error) {
    console.log(error.code);

    // alternativa 1 para validad si el usuario ya existe ( por defecto)
    if(error.code === 11000){
      return res.status(400).json({error: "Ya existe este usuario"});
    }
  }
  return res.status(500).json({error: "Error de servidor"});
};

export const login = async(req, res) => {

  try {
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if(!user) return res.status(403).json({error: "No existe este usuario"});

    const respuestaPassword = await user.comparePassword(password)
    if(!respuestaPassword){
      return res.status(403).json({error: "Contraseña incorrecta"});
    } 
    // Generar token JWT

    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET);

    return res.json({token});
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Error de servidor"});
  }

};
