import { UserModel } from '../models/user.models.js';
import bcryptjs from 'bcryptjs';


// Validaciones  de register 
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Que complete todos los datos del registro
  if(!name || !email || !password){
    return res.status(404).json({message:"Faltan datos por rellenar"});
  }

  try {

    //Que el email solo se resigres una vez
    const emailexisting = await UserModel.findByEmail(email);
    if(emailexisting){
      return res.status(409).json({message: "Este email ya está en uso"});
    }

    // Encriptar la contraseña  y guardarlo en la base de datos
    const hashPassword = await bcryptjs.hash(password,10);
    const createuser = await UserModel.newuser(name,email,hashPassword);
    return res.status(201).json({message:"Usuario registrado con exito",user:createuser});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar el usuario" });

  }

};

