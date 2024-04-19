export interface Provincia {
    id?:number;
    nombre:string;
    activo:number;
}
export interface Poblacion {
    id?:number;
    nombre:string;
    provincia:Provincia;
    activo:number;
}
export interface Tipo {
    id?:number;
    nombre:string;
    activo:number;
}
export interface Image {
    id?:number;
    nombre:string;
    activo?:number;
    ruta?:string;
    pos?:number;
    inmueble:Inmueble;
}
// nHabitaciones no funciona, pero nhabitaciones si, algo raro
export interface Inmueble {
    id?:number;
    amueblado:number;
    apertura:string;
    ascensor:number;
    cp:string;
    descripcion:string;
    jardin:number;
    nombreVia:string;
    numero:string;
    numeroBalcones:string;
    numeroBanhos:string;
    numeroHabitaciones:string;
    operacion:string,
    orientacion:string;
    piscina:number;
    planta:string;
    plazasGaraje:string;
    portada:number;
    precio:number;
    puerta:string;
    imagenes?:Image[];
    superficieConstruida:string;
    superficieUtil:string;
    tenderero:number;
    tipoCalefaccion:string;
    titular:string;
    trastero:number;
    via:string;
    poblacion:Poblacion;
    tipo:Tipo;
    activo:number;
    direccionCompleta?:string;
}
export interface Search {
    tipo?:Tipo,
    operacion?:string,
    poblacion?:Poblacion

}
export interface Usuario {
    id?:number,
    user:string,
    email:string,
    password:string,
    rol?:string,
    activo?:number

}
export interface Credentials {
    username:string,
    password:string
}
