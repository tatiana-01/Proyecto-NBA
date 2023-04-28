import { Conferencia } from '../app/bd/conferencias.js';
import { Equipo } from '../app/Equipo.js';
import {ciudadEquipo} from '../app/bd/ciudades.js';
let equipos = [];

class FrmEquipos extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.fillConferenceSelect();
        this.eventoChangeConf();
        this.saveData();
        this.fillCitySelect();
        this.regEquipoEventClick();
        this.listEquipoEventClick();
        
        //localStorage.removeItem("equipos");
        if (localStorage.getItem("equipos") != null){
            equipos = JSON.parse(localStorage.getItem("equipos"));
           
        }
    }

    render(){
        this.innerHTML=/*html*/`
        <h1>Gestor de equipos</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" data-verocultar='["#equiposFrm",["#lstEquipos"]]' href="#" id="regEquipo">Registrar equipo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-verocultar='["#lstEquipos",["#equiposFrm"]]' id="listEquipo">Listar equipos</a>
          </li>
        </ul>
        <div class="container mt-5" id="equiposFrm">
            <div class="card" >
                <div class="card-header">
                    Equipos <span class="badge bg-secondary" id="codEquipo"></span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Ingrese los datos de los equipos</h5>
                    <div class="container mb-3">
                        <form id="frmEquipo">
                            <div class="row mb-3">
                                <div class="col-lg-4">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="txtNombre">
                                </div>
                                <div class="col-lg-4">
                                    <label for="fecha" class="form-label">Fecha</label>
                                    <input type="date" class="form-control" id="txtFecha">
                                </div>
                                <div class="col-lg-4">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="txtEmail">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-3">
                                    <label for="año" class="form-label">Años</label>
                                    <input type="number" class="form-control" id="txtAño">
                                </div>
                                <div class="col-lg-4">
                                    <label for="presidente" class="form-label">Presidente</label>
                                    <input type="text" class="form-control" id="txtPresidente">
                                </div>
                                <div class="col-lg-3">
                                    <label class="form-label" for="logo">Logo</label>
                                    <input type="file" class="form-control" id="logo">
                                </div>
                                <div class="col-lg-2">
                                    <label for="titulos" class="form-label">Titulos</label>
                                    <input type="text" class="form-control" id="txtTitulos">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-lg-3">
                                    <label for="zona" class="form-label">Zona</label>
                                        <select class="form-select" id="conferencia">
                                        </select>
                                </div>
                                <div class="col-lg-3" id="divsionZonas">
                                    <label for="division" class="form-label">Division</label>
                                        <select class="form-select" id="division">
                                        </select>
                                </div>
                                <div class="col-lg-3">
                                <label for="ciudad" class="form-label">Ciudad</label>
                                    <select class="form-select" id="txtCiudad">
                                    </select>
                                </div>
                                <div class="col-lg-3">
                                    <label class="form-label" for="mascota">Imagen Mascota</label>
                                    <input type="file" class="form-control" id="mascota">
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary" id="guardarData">Guardar Datos</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" id="lstEquipos" style="display:none;">
          <h1 class="mt-3 mb-3">Listado de equipos registrados en el torneo</h1>
          <div class="row" id="mostrarCarta">
          </div>
        </div>
      `
    }
    
    fillCitySelect(){
        this.clearSelect('#txtCiudad');
        const selectData = document.querySelector('#txtCiudad');
        const itemStart= document.createElement('option');
        itemStart.innerHTML='Selecione un item';
        itemStart.selected;
        selectData.appendChild(itemStart);
    
        ciudadEquipo.forEach(data=>{
            let dataItem = JSON.parse(JSON.stringify(data));
            const item = document.createElement('option');
            item.value = ciudadEquipo.indexOf(data);
            item.innerHTML = dataItem;
            selectData.appendChild(item);
        })
    } ;

    fillConferenceSelect(){
        this.clearSelect('#conferencia');
        const selectData = document.querySelector('#conferencia');
        const itemStart= document.createElement('option');
        itemStart.innerHTML='Selecione un item';
        itemStart.selected;
        selectData.appendChild(itemStart);

        Conferencia.forEach(data=>{
            let dataItem = JSON.parse(JSON.stringify(data));
            const item = document.createElement('option');
            item.value = dataItem.id;
            item.innerHTML = dataItem.conferencia;
            selectData.appendChild(item);
        })
    } 

    clearSelect(v_select) {
        const selectData = document.querySelector(v_select);
        const options= selectData.querySelectorAll('option');
        options.forEach(element => {
            selectData.removeChild(element);
    });
    }

    eventoChangeConf = () =>{document.querySelector('#conferencia').addEventListener('change',(e)=>{
            this.clearSelect('#division');
            const selectChild = document.querySelector('#division');
            let confSelect = Conferencia.filter(confItem => confItem.id == e.target.value);
            confSelect.forEach(element =>{
                let dataItem = JSON.parse(JSON.stringify(element));
                dataItem.divisiones.forEach(divData => {
                    const itemDiv = document.createElement('option');
                    itemDiv.value = divData.idDIv;
                    itemDiv.innerHTML = divData.nombre;
                    selectChild.appendChild(itemDiv);
                });
            })
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    saveData = () =>{
            document.querySelector('#guardarData').addEventListener('click',(e)=>{
            const idEqui = document.querySelector('#codEquipo')
            const frmData=document.forms['frmEquipo'];
            const nombre=frmData['txtNombre'];
            const fecha=frmData['txtFecha'];
            const email=frmData['txtEmail'];
            const ciudad=frmData['txtCiudad'];
            const año=frmData['txtAño'];
            const presidente=frmData['txtPresidente'];
            const logo=frmData['logo'];
            const titulos=frmData['txtTitulos'];
            const conferencia=frmData['conferencia'];
            const mascota=frmData['mascota'];
            let equipo = new Equipo(this.dateToJulian(new Date()),nombre.value, fecha.value, email.value,ciudad.value,año.value,presidente.value,logo.files[0].name,titulos.value,conferencia.value,mascota.files[0].name);
            equipos.push(equipo);
            localStorage.setItem("equipos",JSON.stringify(equipos))
            idEqui.innerHTML=equipo._id;
        });
    }
    regEquipoEventClick = () =>{
        document.querySelector('#regEquipo').addEventListener('click',(e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }
    listEquipoEventClick = () =>{
        document.querySelector('#listEquipo').addEventListener('click',(e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
            this.cargarEquipos();
        })
    }
    cargarEquipos= ()=>{
        let equiposHTML = '';
        for(let equipo of equipos){
            equiposHTML += this.equiposHTML(equipo);
        }
        document.getElementById('mostrarCarta').innerHTML = equiposHTML;
        this.deleteEquipo();
    }

    /*mostrarConferencia(){
        let formConferencia=document.querySelector('#conferencia');
        let textoConf=formConferencia.options[formConferencia.selectedIndex].text;
        document.querySelector('#modalConferencia').innerHTML=textoConf;
        
    }*/

     equiposHTML = (equipo)=>{
        let equiposHTML = /*html*/`
        <div class="col-xxl-3 col-lg-4 col-md-6 mb-4" style="display:flex; justify-content:center;">
            <div class="card" style="width: 18rem;">
                <div class="container text-center mt-3" style="height: 10rem; ">
                    <img src="images/logos/${equipo._logo}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                </div>
                    <div class="card-body">
                    <h5 class="card-title">${equipo._nombre}</h5>
                    <div class="row">
                        <div class="col-6">
                            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#e${equipo._id}">Mas info</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-danger" id="eliminar" name="${equipo._id}">Eliminar</a>
                        </div>
                    </div>
                    </div>
            </div>              
        </div>
        <div class="modal fade" id="e${equipo._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" id="infoEquipoModal">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${equipo._nombre}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="container text-center mt-3 mb-3" style="height: 15rem; ">
                                <img src="images/logos/${equipo._logo}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    ID Equipos
                                </div>
                                <div class="col-6">
                                    ${equipo._id}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Fecha
                                </div>
                                <div class="col-6">
                                    ${equipo._fecha}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Email
                                </div>
                                <div class="col-6">
                                    ${equipo._email}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Años
                                </div>
                                <div class="col-6">
                                    ${equipo._year}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Presidente
                                </div>
                                <div class="col-6">
                                    ${equipo._presidente}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Titulos
                                </div>
                                <div class="col-6">
                                    ${equipo._titulos}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Zona
                                </div>
                                <div class="col-6" id='modalConferencia'>
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Mascota
                                </div>
                            </div>
                            <div class="row">
                                <div class="container text-center mt-3" style="height: 10rem; ">
                                    <img src="images/logos/${equipo._imgPet}" class="card-img-top mb-3" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        //this.mostrarConferencia();
        return equiposHTML;
    }

    dateToJulian =(date) => {
        let utcMillis = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds());
        console.log(utcMillis);
        console.log(parseInt(utcMillis.toString(16),16));
        return utcMillis.toString(16);
    }


    deleteEquipo = () =>{document.querySelectorAll('#eliminar').forEach(element=> {
        element.addEventListener("click",(e)=>{
            let id=element.getAttribute("name");
            console.log(localStorage);
            equipos.forEach((element,posicion) => {
                if(element._id==id){
                   equipos.splice(posicion,1);
                   localStorage.setItem("equipos",JSON.stringify(equipos))
                   console.log(localStorage.getItem("jugadores"));
                }
            });
            e.stopImmediatePropagation();
            e.preventDefault();
            this.cargarEquipos();
        })  
     });
    }
    
}
customElements.define('frm-equipos',FrmEquipos);
//                    <button type="button" class="btn btn-primary">Guardar</button>
//<a href="#" class="btn btn-primary" id="guardarData">Guardar Datos</a>