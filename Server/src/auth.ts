import express from 'express';
import { getUserByEmail, createUser } from './models/users';
import { random, authentication } from './utils/utils';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Check if the user already exists
    const salt = random();
    const user = await createUser({ 
      email, 
      username, 
      authentication: {
        password: authentication(salt, password),
        salt
      } 
    });
    // const hash = authentication(salt, password);
    // const user = new UserModel({ username, salt, hash });
    // await user.save();
    res.status(201).json({ message: 'User registered successfully' }).end();
  }  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}