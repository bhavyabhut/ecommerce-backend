import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { sendJsonRes } from '../utils/response'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = await User.findOne({ email })
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET || '',
          {
            expiresIn: '2h',
          }
        )
        user.token = token
        sendJsonRes(res, await user.save(), 'User created success', 201)
      } else
        sendJsonRes(res, null, 'Error while login', 500, false, {
          message: 'Please enter email and password',
        })
    } else
      sendJsonRes(res, null, 'Error while login', 500, false, {
        message: 'Please enter email and password',
      })
  } catch (error) {
    sendJsonRes(res, null, 'Error while login', 500, false, error)
  }
}

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, confirmPassword } = req.body
    if (email && password && confirmPassword && password === confirmPassword) {
      const existingUser = await User.findOne({ email })
      if (existingUser)
        sendJsonRes(res, null, 'Error while register user', 400, false, {
          message: 'Email already exists!!',
        })
      else {
        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = new User({
          email: email,
          isAdmin: false,
          name: name,
          password: encryptedPassword,
        })
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET || '',
          {
            expiresIn: '2h',
          }
        )
        // save user token
        user.token = token

        sendJsonRes(res, await user.save(), 'User created success', 201)
      }
    } else
      sendJsonRes(res, null, 'Error while register user', 400, false, {
        message: 'Validation failed',
      })
  } catch (error) {
    sendJsonRes(res, null, 'Error while register user', 500, false, error)
  }
}

export { register, login }
