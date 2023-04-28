import { CuerpoApoyo } from '../app/CuerpoApoyo.js';
let cuerposApoyo=[];
class FrmCuerpoApoyo extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.saveData();
        this.regCuerpoEventClick();
        this.listCuerpoEventClick();
        //localStorage.removeItem("cuerposApoyo");
        if (localStorage.getItem("cuerposApoyo") != null){
            cuerposApoyo= JSON.parse(localStorage.getItem("cuerposApoyo"));
           
        }
    }

    render(){
        this.innerHTML=/*html*/`
        <h1>Gestor de cuerpo de Apoyo</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" data-verocultar='["#cuerpoApoyoFrm",["#lstCuerpo"]]' href="#" id="regCuerpo">Registrar Cuerpo de Apoyo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-verocultar='["#lstCuerpo",["#cuerpoApoyoFrm"]]' id="listCuerpo">Listar Cuerpo de Apoyo</a>
          </li>
        </ul>
        <div class="container mt-5" id="cuerpoApoyoFrm">
            <div class="card" >
                <div class="card-header">
                    Cuerpo de apoyo <span class="badge bg-secondary" id="codCuerpo"></span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Ingrese los datos del cuerpo de apoyo</h5>
                    <div class="container mb-3">
                        <form id="frmCuerpoApoyo">
                            <div class="row g-3 mb-3">
                                    <div class="col-lg-4 ">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="txtNombreCuerpo">
                                    </div>
                                    <div class="col-lg-4 ">
                                        <label for="fecha" class="form-label">Fecha</label>
                                        <input type="date" class="form-control" id="txtFechaCuerpo">
                                    </div>
                                    <div class="col-lg-4 ">
                                        <label for="foto" class="form-label">Foto</label>
                                        <input type="file" class="form-control" id="txtFotoCuerpo">
                                    </div>
                                </div>
                                <div class="row g-3 mb-3">
                                <div class="col-lg-4 ">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="txtEmailCuerpo">
                                </div>
                                <div class="col-lg-4 ">
                                    <label for="ciudad" class="form-label">Ciudad</label>
                                    <input type="text" class="form-control" id="txtCiudadCuerpo">
                                </div>
                                <div class="col-lg-4 ">
                                    <label for="año" class="form-label">Años</label>
                                    <input type="number" class="form-control" id="txtAñoCuerpo">
                                </div>
                                </div>
                                <div class="row g-3 mb-3">
                                <div class="col-lg-5 ">
                                <label for="especialidad" class="form-label">Especialidad</label>
                                <input type="text" class="form-control" id="txtEspecialidad">
                                </div>
                                <div class="col-lg-4 ">
                                    <label for="cargo" class="form-label">Cargo</label>
                                    <select class="form-select" id="txtEspecialidad">
                                        <option value="0">Seleccione un item</option>
                                        <option value="1">Cuerpo Medico</option>
                                        <option value="2">Cuerpo Tecnico</option>
                                     </select>
                                </div>
                                <div class="col-lg-3 ">
                                    <label for="IdEqui" class="form-label">ID Equipo</label>
                                    <select class="form-select" id="txtIdEquiCuerpo">
                                    </select>
                                </div>
                            </div>
                            <div class="row g-3 mb-3">
                            </div>
                            <a href="#" class="btn btn-primary" id="guardarDataCuerpo">Guardar Datos</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" id="lstCuerpo" style="display:none;">
        <h1 class="mt-3 mb-3">Listado de cuerpo de apoyo registrados en el torneo</h1>
        <div class="row" id="cardCuerpo">
        </div>
      </div>`
    }

        saveData = () =>{
            document.querySelector('#guardarDataCuerpo').addEventListener('click',(e)=>{
            const idCuerpo = document.querySelector('#codCuerpo')
            const frmDataCuerpo=document.forms['frmCuerpoApoyo'];
            const nombre=frmDataCuerpo['txtNombreCuerpo'];
            const fecha=frmDataCuerpo['txtFechaCuerpo'];
            const email=frmDataCuerpo['txtEmailCuerpo'];
            const ciudad=frmDataCuerpo['txtCiudadCuerpo'];
            const año=frmDataCuerpo['txtAñoCuerpo'];
            const especialidad=frmDataCuerpo['txtEspecialidad'];
            const cargo= frmDataCuerpo['txtCargo'];
            const idequipo= frmDataCuerpo['txtIdEquiCuerpo'];
            const foto= frmDataCuerpo['txtFotoCuerpo'];
            let CApoyo = new CuerpoApoyo(this.dateToJulian(new Date()),nombre.value, fecha.value, email.value, ciudad.value,año.value,especialidad.value, cargo.value,idequipo.value,foto.files[0].name);
            cuerposApoyo.push(CApoyo);
            console.log(cuerposApoyo);
            localStorage.setItem("cuerposApoyo",JSON.stringify(cuerposApoyo))
            idCuerpo.innerHTML=CApoyo._id;
        });
    }
    regCuerpoEventClick = () =>{
        document.querySelector('#regCuerpo').addEventListener('click',(e) => {
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
    listCuerpoEventClick = () =>{
        document.querySelector('#listCuerpo').addEventListener('click',(e) => {
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
            this.cargarCuerposApoyo();
        })
    }
    cargarCuerposApoyo= ()=>{
        let cuerposApoyoHTML = '';
        for(let cuerpo of cuerposApoyo){
            cuerposApoyoHTML += this.cuerposApoyoHTML(cuerpo);
        
        }
        document.getElementById('cardCuerpo').innerHTML = cuerposApoyoHTML;
        
    }
   cuerposApoyoHTML = (cuerpo)=>{
        let cuerposApoyoHTML =/*html*/ `
        <div class="col-xxl-3 col-lg-4 col-md-6 mb-4" style="display:flex; justify-content:center;" >
            <div class="card" style="width: 18rem;">
                <div class="container text-center mt-3" style="height: 10rem; ">
                    <img src="images/logos/${cuerpo._foto}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                </div>
                    <div class="card-body">
                    <h5 class="card-title">${cuerpo._nombre}</h5>
                    <div class="row">
                        <div class="col-6">
                            <a href="#" class="btn btn-success">Mas info</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-danger">Eliminar</a>
                        </div>
                    </div>
                    </div>
            </div>              
        </div>
        `;
        return cuerposApoyoHTML;
    }

    dateToJulian =(date) => {
        let utcMillis = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds());
        console.log(utcMillis);
        console.log(parseInt(utcMillis.toString(16),16));
        return utcMillis.toString(16);
    }


    clearSelect(v_select) {
        const selectData = document.querySelector(v_select);
        const options= selectData.querySelectorAll('option');
        options.forEach(element => {
            selectData.removeChild(element);
    });
    }
 };
customElements.define('frm-cuerpo-apoyo',FrmCuerpoApoyo);