import { IsNotEmpty, IsInt, Min, Max, IsBoolean, IsOptional, IsString, Matches, Length } from "class-validator";

export class CreatePersonaDto {
    @IsNotEmpty({ message: "El nombre completo es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @Length(3, 100, { message: "El nombre debe tener entre 3 y 100 caracteres." })
    nombreCompleto: string;

    @IsNotEmpty({ message: "La identificación es obligatoria." })
    @Matches(/^\d+$/, { message: "La identificación debe contener solo números." })
    identificacion: string;

    @IsInt({ message: "La edad debe ser un número entero." })
    @Min(18, { message: "La edad mínima permitida es 18 años." })
    @Max(99, { message: "La edad máxima permitida es 99 años." })
    edad: number;

    @IsNotEmpty({ message: "El género es obligatorio." })
    @IsString({ message: "El género debe ser una cadena de texto." })
    genero: string;

    @IsBoolean({ message: "El estado debe ser un valor booleano." })
    estado: boolean;

    @IsBoolean({ message: "El campo 'maneja' debe ser un valor booleano." })
    maneja: boolean;

    @IsBoolean({ message: "El campo 'usa lentes' debe ser un valor booleano." })
    usaLentes: boolean;

    @IsBoolean({ message: "El campo 'diabético' debe ser un valor booleano." })
    diabetico: boolean;

    @IsOptional()
    @IsString({ message: "El campo 'otra enfermedad' debe ser un texto." })
    otraEnfermedad?: string;
}
