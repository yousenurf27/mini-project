import { TOKEN_KEY } from '@/config';
import { UserResponse } from '@/model/user.model';
import { sign, verify } from 'jsonwebtoken'

const TokenManager = {
  generateToken: (payload: UserResponse) => sign(payload, TOKEN_KEY!, { expiresIn: '7d' }),
  verifyToken: (token: string) => verify(token, TOKEN_KEY!)
}

export default TokenManager;
