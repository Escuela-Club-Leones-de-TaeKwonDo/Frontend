export class Alumno{
    id_alumno: number;
    nombre: String;
    apellidos: String;
    fecha_nacimiento: Date;
    fotografia: String;
    actividad: String;
    grado: String;
    seguro_medico: String;
    certificado_medico: String;
    carta_responsiva: String;
    password: String;
    email: String;

        constructor(id, nombre, apellidos, fecha_nacimiento, fotografia, actividad, grado,
        seguro_medico, certificado_medico, carta_responsiva, password, email){
            this.id_alumno = id;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.fecha_nacimiento = fecha_nacimiento;
            this.fotografia = fotografia;
            this.actividad = actividad;
            this.grado = grado;
            this.seguro_medico = seguro_medico;
            this.certificado_medico = certificado_medico;
            this.carta_responsiva = carta_responsiva;
            this.password = password;
            this.email = email;
        }
}