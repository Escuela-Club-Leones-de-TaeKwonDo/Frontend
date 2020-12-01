export class TipoEvento {
	id: number;
	nombre_tipo_evento: String;
	descripcion: String;
	
	constructor(id, nombre_tipo_evento, descripcion){
		this.id = id;
		this.nombre_tipo_evento = nombre_tipo_evento;
		this.descripcion = descripcion;
	}
}