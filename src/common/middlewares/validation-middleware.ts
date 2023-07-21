import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default function validationMiddleware(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = {
      params: req.params,
      query: req.query,
      body: req.body,
    }
    try {
      const output = await schema.parseAsync(input)
      req.params = output.params ?? {}
      req.query = output.query ?? {}
      req.body = output.body ?? {}
      next()
    } catch (err: any) {
      next(err)
    }
  }
}
