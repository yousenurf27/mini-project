import { TOKEN_KEY } from '@/config';
import { sign, verify } from 'jsonwebtoken'

const TokenManager = {
  generateToken: (payload: { id: string, role: string }) => sign(payload, TOKEN_KEY!, { expiresIn: '7d' }),
  verifyToken: (token: string) => verify(token, TOKEN_KEY!)
}

export default TokenManager;
