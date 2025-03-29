import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Retrieve the current authenticated user from the request
export const GetUser = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return data ? req.user[data] : req.user;
});
