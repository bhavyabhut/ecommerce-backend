import { createMocks } from 'node-mocks-http'
import { verifyToken } from '../../middleware/auth'

jest.mock('jsonwebtoken', () => {
  return {
    verify: (token: string, secret: string) => {
      if (token === 'validToken' && secret === 'secret')
        return { user_id: 'test_id', email: 'test@email.com' }
      else throw new Error('Invalid token')
    },
  }
})

const mockNext = jest.fn(() => {})

describe('verifyToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'secret'
  })
  afterEach(() => jest.resetAllMocks())

  it('should call next if token is present and valid', async () => {
    const { req, res } = createMocks({
      body: { token: 'validToken' },
      headers: { 'x-access-token': '' },
      query: { token: '' },
    })
    await verifyToken(req, res, mockNext)
    expect(req).toHaveProperty('user', {
      _id: 'test_id',
      email: 'test@email.com',
    })
    expect(mockNext).toHaveBeenCalled()
  })

  it('should return an error if token is not present', async () => {
    const { req, res } = createMocks({
      body: { token: '' },
    })
    req.body.token = ''
    await verifyToken(req, res, mockNext)

    expect(res.statusCode).toBe(403)
    const data = res._getJSONData()

    expect(data.err).toHaveProperty(
      'message',
      'A token is required for authentication'
    )
  })

  it('should return an error if token is invalid', async () => {
    const { req, res } = createMocks({
      body: { token: 'invalidToken' },
    })
    await verifyToken(req, res, mockNext)
    const data = res._getJSONData()
    expect(res.statusCode).toBe(401)
    expect(data.err).toHaveProperty('message', 'Invalid Token')
  })
})
