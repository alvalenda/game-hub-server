import { PrismaClientValidationError } from '@prisma/client/runtime';

export function prismaExeptionFilter(err: any, message: string): void {
  if ('code' in err) {
    if (err.code === 'P2002') {
      err.name = 'ConflictError';
      if (err.meta?.target?.includes('email')) {
        err.message = "Email já cadastrado. O campo 'email' deve ser único.";
      }

      if (err.meta?.target?.includes('cpf')) {
        err.message = "CPF já cadastrado. O campo 'cpf' deve ser único.";
      }

      if (err.meta?.target?.includes('name')) {
        err.message =
          "O nome do gênero já existe. O campo 'name' deve ser único.";
      }
    }

    if (err.code === 'P2025') {
      err.name = 'BadRequestError';
      err.message = [err.meta?.cause, message];
    }
  }

  if (err instanceof PrismaClientValidationError) {
    err.name = 'BadRequestError';
    err.message = message;
  }
}
