import {Nba} from './Nba.js';
export class CuerpoApoyo extends Nba{
    constructor(id,nombre,fecha,email,ciudad,year,especialidad,cargo,idEquipo,foto){
        super(id,nombre,fecha,email,ciudad,year);
        this._especialidad = especialidad;
        this._cargo = cargo;
        this._idEquipo = idEquipo;
        this._foto = foto;
    }
    get especialidad(){
        return this._especialidad;
    }
    set especialidad(v_especialidad){
        this._especialidad = v_especialidad;
    }    
    get cargo(){
        return this._cargo;
    }
    set cargo(v_cargo){
        this._cargo = v_cargo;
    }    
    get idEquipo(){
        return this._idEquipo;
    }
    set idEquipo(v_idEquipo){
        this._idEquipo = v_idEquipo;
    }    
    get foto(){
        return this._foto;
    }
    set foto(v_foto){
        this._foto = v_foto;
    }    
}