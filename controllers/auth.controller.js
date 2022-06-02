import { User } from "../models/Users.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa buscando email

    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    // Generar token JWT

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error.code);

    // alternativa 1 para validad si el usuario ya existe ( por defecto)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
  }
  return res.status(500).json({ error: "Error de servidor" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    // Generar token JWT

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
