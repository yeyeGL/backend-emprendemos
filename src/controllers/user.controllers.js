import { UserModel } from '../models/user.models.js';
import bcryptjs from 'bcryptjs';

// Validaciones de registro 
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar que se completen todos los datos del registro
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan datos por rellenar" }); // Cambiar a 400 para solicitudes incorrectas
  }

  try {
    // Verificar que el email no este registrado
    const emailExisting = await UserModel.findByEmail(email);
    if (emailExisting) {
      return res.status(409).json({ message: "Este email ya esta en uso" });
    }

    // Encriptar la contraseña y guardarlo en la base de datos
    const hashPassword = await bcryptjs.hash(password, 10);
    const createUser = await UserModel.newuser(name, email, hashPassword);

    return res.status(201).json({ message: "Usuario registrado con exito", user: createUser });
    
  } catch (error) {
    console.error('Error al registrar el usuario:', error); // Agregar más contexto al error
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
