import jwt from 'jsonwebtoken';

// fonction pour générer un token JWT
export function generateAccessToken(data: { userId: number, role: string }) {
  if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    {
      // sub => Subject (la personne à qui le token fait référence)
      sub: data.userId,
      role: data.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '3h'
    }
  );

  return token;
}