import { UserModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Validaciones de registro
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar que se completen todos los datos del registro
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan datos por rellenar" }); 
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

    return res
      .status(201)
      .json({ message: "Usuario registrado con exito", user: createUser });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); 
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar que el usuario con el correo corrspondiente se encuentre
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT con el id del usuario y firmarlo con la clave secreta
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Usuario autenticado",
      token,
    });
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return res.status(500).json({ message: "Error al autenticar el usuario" });
  }
};

export const products = async (req, res) => {
  const { title, description, price, category, imageUrl } = req.body;

  try {
    const newProduct = await createProduct(title, description, price, category, imageUrl);
    return res.status(201).json({
      message: 'Producto creado exitosamente',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error al crear el producto:', error); 
    return res.status(500).json({
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};
