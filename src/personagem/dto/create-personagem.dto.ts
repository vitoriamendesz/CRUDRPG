import {
    IsString,
    IsNotEmpty,
    IsIn,
    IsInt,
    Min,
    Max,
    ValidateIf,
    Validate,
    ValidationArguments,
  } from 'class-validator';
  
  export class CreatePersonagemDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
  
    @IsString()
    @IsNotEmpty()
    nomeAventureiro: string;
  
    @IsString()
    @IsIn(['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'])
    classe: string;
  
    @IsInt()
    @Min(1)
    level: number;
  
    @IsInt()
    @Min(0)
    @Max(10)
    forcaBase: number;
  
    @IsInt()
    @Min(0)
    @Max(10)
    defesaBase: number;
  }
  