import {Jugador} from '../app/Jugador.js'
let jugadores=[];

class FrmJugador extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.saveDataPlayer();
        this.regJugadorEventClick();
        this.listJugadorEventClick();
        this.cargarListaJugadores();
        
        //localStorage.removeItem("jugadores");
        if (localStorage.getItem("jugadores") != null){
            jugadores = JSON.parse(localStorage.getItem("jugadores"));
           
        }
        
    }

    render(){
        this.innerHTML=/*html*/`
        <h1>Gestor de jugadores</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" data-verocultar='["#jugadoresFrm",["#lstJugadores"]]' href="#" id="regJugador">Registrar jugador</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-verocultar='["#lstJugadores",["#jugadoresFrm"]]' id="listJugador">Listar jugadores</a>
          </li>
        </ul>
        <div class="container mt-5" id="jugadoresFrm" >
            <div class="card" >
                <div class="card-header">
                    Jugadores <span class="badge bg-secondary" id="codJugador"></span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Ingrese los datos de los Jugadores</h5>
                    <div class="container mb-3">
                        <form id="frmJugador">
                                <div class="row g-3 mb-3">
                                        <div class="col-lg-6 ">
                                            <label for="nombre" class="form-label">Nombre</label>
                                            <input type="text" class="form-control" id="txtNombreJugador">
                                        </div>
                                        <div class="col-lg-6 ">
                                            <label for="fecha" class="form-label">Fecha</label>
                                            <input type="date" class="form-control" id="txtFechaJugador">
                                        </div>
                                </div>
                                <div class="row g-3 mb-3">
                                        <div class="col-lg-4 ">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="txtEmailJugador">
                                        </div>
                                        <div class="col-lg-4 ">
                                            <label for="ciudad" class="form-label">Ciudad</label>
                                            <input type="text" class="form-control" id="txtCiudadJugador">
                                        </div>
                                        <div class="col-lg-2 ">
                                            <label for="año" class="form-label">Años</label>
                                            <input type="number" class="form-control" id="txtAñoJugador">
                                        </div>
                                        <div class="col-lg-2 ">
                                            <label for="dorsal" class="form-label">Dorsal</label>
                                            <input type="number" class="form-control" id="txtDorsal">
                                        </div>
                                </div>
                                 <div class="row g-3 mb-3">
                                        <div class="col-lg-4 ">
                                            <label for="posicion" class="form-label">Posicion</label>
                                            <input type="text" class="form-control" id="txtPosicion">
                                        </div>
                                        <div class="col-lg-2 ">
                                            <label for="estatura" class="form-label">Estatura</label>
                                            <input type="number" class="form-control" id="txtEstatura">
                                        </div>
                                        <div class="col-lg-2 ">
                                            <label for="peso" class="form-label">Peso</label>
                                            <input type="number" class="form-control" id="txtPeso">
                                        </div>
                                        <div class="col-lg-4 ">
                                            <label for="tiempo" class="form-label">Tiempo Jugado</label>
                                            <input type="number" class="form-control" id="txtTiempo">
                                        </div>
                                </div>
                                <div class="row g-3 mb-3">
                                        <div class="col-lg-2 ">
                                            <label for="faltas" class="form-label">Faltas</label>
                                            <input type="number" class="form-control" id="txtFaltas">
                                        </div>
                                        <div class="col-lg-3 ">
                                            <label for="asistencia" class="form-label">Asistencia</label>
                                            <input type="text" class="form-control" id="txtAsistencia">
                                        </div>
                                        <div class="col-lg-3 ">
                                            <label for="puntos" class="form-label">Puntos Anotados</label>
                                            <input type="number" class="form-control" id="txtPuntos">
                                        </div>
                                        <div class="col-lg-4 ">
                                            <label for="valor" class="form-label">Valor</label>
                                            <input type="number" class="form-control" id="txtValor">
                                        </div>
                                </div>
                                <div class="row g-3 mb-3">
                                        <div class="col-lg-6 ">
                                            <label for="exp" class="form-label">Nivel de Exp</label>
                                            <input type="text" class="form-control" id="txtExp">
                                        </div>
                                        <div class="col-lg-2 ">
                                            <label for="idEq" class="form-label">ID de equipo</label>
                                            <select class="form-select" id="txtIdEquiJugador">
                                            </select>
                                        </div>
                                        <div class="col-lg-4 ">
                                            <label for="idEq" class="form-label">Foto Jugador</label>
                                            <input type="file" class="form-control" id="txtFoto">
                                        </div>
                                </div>
                                <a href="#" class="btn btn-primary" id="guardarDataJugador">Guardar Datos</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" id="lstJugadores" style="display:none;">
        <h1 class="mt-3 mb-3">Listado de jugadores registrados en el torneo</h1>
        <select class="form-select mb-3" id="txtIdEquiListJugador">
        </select>
        <div class="row" id="cardJugador">
        </div>
      </div>`
    }

    saveDataPlayer = () =>{
            document.querySelector('#guardarDataJugador').addEventListener('click',(e)=>{
            const idJugador = document.querySelector('#codJugador');
            const frmDataJugador=document.forms['frmJugador'];
            const nombre=frmDataJugador['txtNombreJugador'];
            const fecha=frmDataJugador['txtFechaJugador'];
            const email=frmDataJugador['txtEmailJugador'];
            const ciudad=frmDataJugador['txtCiudadJugador'];
            const año=frmDataJugador['txtAñoJugador'];
            const dorsal=frmDataJugador['txtDorsal'];
            const posicion=frmDataJugador['txtPosicion'];
            const estatura=frmDataJugador['txtEstatura'];
            const peso=frmDataJugador['txtPeso'];
            const tiempoJugado=frmDataJugador['txtTiempo'];
            const faltas=frmDataJugador['txtFaltas'];
            const asistencia=frmDataJugador['txtAsistencia'];
            const puntosAnotados=frmDataJugador['txtPuntos'];
            const valor= frmDataJugador['txtValor'];
            const nivel=frmDataJugador['txtExp'];
            const idEquipo= frmDataJugador['txtIdEquiJugador'];
            const foto= frmDataJugador['txtFoto'];
            let jugador = new Jugador(this.dateToJulian(new Date()),nombre.value, fecha.value, email.value, ciudad.value,año.value,dorsal.value,foto.files[0].name,posicion.value,estatura.value,peso.value,tiempoJugado.value,faltas.value,asistencia.value,puntosAnotados.value,valor.value,nivel.value,idEquipo.value);
            jugadores.push(jugador);
            console.log(jugadores);
            localStorage.setItem("jugadores",JSON.stringify(jugadores))
            idJugador.innerHTML=jugador._id;
        });
    }

    regJugadorEventClick = () =>{
        document.querySelector('#regJugador').addEventListener('click',(e) => {
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

    listJugadorEventClick = () =>{
        document.querySelector('#listJugador').addEventListener('click',(e) => {
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
    

    cargarListaJugadores= ()=>{
        document.querySelector('#txtIdEquiListJugador').addEventListener('change',(e) => {
            this.cargarJugadores();
        })
    }

    cargarJugadores(){
        this.clearDiv();
        let jugadoresHTML = '';
        let equipoVer=document.querySelector('#txtIdEquiListJugador');
        let listJugadores= JSON.parse(localStorage.getItem("jugadores"));
        listJugadores.forEach(element => {
            let idEquipos=element._idEquipo;
            if(idEquipos===equipoVer.value){
                jugadoresHTML += this.jugadoresHTML(element);
                console.log(jugadoresHTML);
                document.getElementById('cardJugador').innerHTML = jugadoresHTML;
                this.deleteJugador();
            }
        });
    }

    jugadoresHTML = (jugador)=>{
            let jugadoresHTML =/*html*/ `
        <div class="col-xxl-3 col-lg-4 col-md-6 mb-4" style="display:flex; justify-content:center;" >
            <div class="card" style="width: 18rem;">
                    <div class="container text-center mt-3" style="height: 10rem; ">
                        <img src="images/logos/${jugador._foto}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${jugador._nombre}</h5>
                        <div class="row">
                        <div class="col-6">
                            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#j${jugador._id}">Mas info</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-danger" id="eliminar" name="${jugador._id}">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>              
        </div>
        <div class="modal fade" id="j${jugador._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" id="infoEquipoModal">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${jugador._nombre}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="container text-center mt-3 mb-3" style="height: 15rem; ">
                                <img src="images/logos/${jugador._foto}" class="card-img-top" id="imgCard" alt="..."  style="max-height: 100%; width: auto;">
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    ID Jugador
                                </div>
                                <div class="col-6">
                                    ${jugador._id}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Fecha
                                </div>
                                <div class="col-6">
                                    ${jugador._fecha}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Email
                                </div>
                                <div class="col-6">
                                    ${jugador._email}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Años
                                </div>
                                <div class="col-6">
                                    ${jugador._year}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Dorsal
                                </div>
                                <div class="col-6">
                                    ${jugador._dorsal}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Posición
                                </div>
                                <div class="col-6">
                                    ${jugador._posicion}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Estatura
                                </div>
                                <div class="col-6">
                                    ${jugador._estatura}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Peso
                                </div>
                                <div class="col-6">
                                    ${jugador._peso}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Tiempo
                                </div>
                                <div class="col-6">
                                    ${jugador._tiempo}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Faltas
                                </div>
                                <div class="col-6">
                                    ${jugador._faltas}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Asistencias
                                </div>
                                <div class="col-6">
                                    ${jugador._asistencia}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Puntos
                                </div>
                                <div class="col-6">
                                    ${jugador._puntos}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Valor
                                </div>
                                <div class="col-6">
                                    ${jugador._valor}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    Nivel de Experiencia
                                </div>
                                <div class="col-6">
                                    ${jugador._nivelExp}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-bold">
                                    ID Equipo
                                </div>
                                <div class="col-6">
                                    ${jugador._idEquipo}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        return jugadoresHTML;
    }

    deleteJugador = () =>{document.querySelectorAll('#eliminar').forEach(element=> {
        element.addEventListener("click",(e)=>{
            let id=element.getAttribute("name");
            console.log(localStorage);
            jugadores.forEach((element,posicion) => {
                if(element._id==id){
                    jugadores.splice(posicion,1);
                    localStorage.setItem("jugadores",JSON.stringify(jugadores))
                    console.log(localStorage.getItem("jugadores"));
                }
            });
            e.stopImmediatePropagation();
            e.preventDefault();
            this.cargarJugadores();
            })  
        });
    }

    dateToJulian =(date) => {
        let utcMillis = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds());
        console.log(utcMillis);
        console.log(parseInt(utcMillis.toString(16),16));
        return utcMillis.toString(16);
    }

    clearDiv(){
        const select=this.querySelector('#cardJugador');
        select.innerHTML='';
    }

}
customElements.define('frm-jugador',FrmJugador);