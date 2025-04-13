import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateItemMagicoDto {
  @IsNotEmpty()
  nome: string;

  @IsEnum(['Arma', 'Armadura', 'Amuleto'], {
    message: 'Tipo inválido. Os valores permitidos são: Arma, Armadura ou Amuleto',
  })
  tipo: 'Arma' | 'Armadura' | 'Amuleto';

  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;
}
