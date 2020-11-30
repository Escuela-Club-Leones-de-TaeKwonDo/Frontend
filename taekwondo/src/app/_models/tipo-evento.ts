export class TipoEvento {
	id_tipo_evento: number;
	nombre_tipo_evento: String;
	descripcion: String;
	
	constructor(id_tipo_evento, nombre_tipo_evento, descripcion){
		this.id_tipo_evento = id_tipo_evento;
		this.nombre_tipo_evento = nombre_tipo_evento;
		this.descripcion = descripcion;
	}
}