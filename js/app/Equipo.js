import {Nba} from './Nba.js';
export class Equipo extends Nba{
    constructor(id,nombre,fecha,email,ciudad,year,presidente,logo,titulos,zona,imgPet){
        super(id,nombre,fecha,email,ciudad,year);
        this._presidente = presidente;
        this._logo = logo;
        this._titulos = titulos;
        this._zona = zona;
        this._imgPet = imgPet;
    }
    get presidente(){
        return this._presidente;
    }
    set presidente(v_presidente){
        this._presidente = v_presidente;
    }
    get logo(){
        return this._logo;
    }
    set logo(v_logo){
        this._logo = v_logo;
    }
    get titulos(){
        return this._titulos;
    }
    set titulos(v_titulos){
        this._titulos = v_titulos;
    }
    get zona(){
        return this._zona;
    }
    set zona(v_zona){
        this._zona = v_zona;
    }
    get imgPet(){
        return this._imgPet;
    }
    set imgPet(v_imgPet){
        this._imgPet = v_imgPet;
    }
}