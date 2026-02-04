import { validateSync } from 'class-validator';
import { plainToInstance, instanceToPlain, ClassConstructor } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

/**
 * Valida um objeto literal com o DTO (class-validator) e devolve um objeto literal
 * já validado e transformado (sem métodos, só dados).
 *
 * Uso:
 *   const plain = validateAndToPlain(MeuDto, body);
 *   // plain é um objeto literal; se a validação falhar, lança BadRequestException
 */
export function validateAndToPlain<T extends object>(
  dtoClass: ClassConstructor<T>,
  plain: unknown,
  options?: {
    /** Se true, só inclui no resultado propriedades com @Expose() (default: false) */
    excludeExtraneousValues?: boolean;
  },
): Record<string, unknown> {
  const instance = plainToInstance(dtoClass, plain, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(instance as object);
  if (errors.length > 0) {
    const messages = errors.flatMap((e) =>
      e.constraints ? Object.values(e.constraints) : [],
    );
    throw new BadRequestException(messages);
  }

  return instanceToPlain(instance, {
    excludeExtraneousValues: options?.excludeExtraneousValues ?? false,
  }) as Record<string, unknown>;
}
