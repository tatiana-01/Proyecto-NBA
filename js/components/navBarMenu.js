class NavBarMenu extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.navMenuPage();
    }

    render(){
        this.innerHTML=/*html*/`
        <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="images/logo.png" alt="" width="80px"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-verocultar='["#grpEquipo",["#jugadores","#cuerpoApoyo"]]'>Equipos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["#jugadores",["#grpEquipo","#cuerpoApoyo"]]'>Jugadores</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["#cuerpoApoyo",["#grpEquipo","#jugadores"]]'>Cuerpo de apoyo</a>
            </li>
        </div>
        </div>
        </nav>`
    }
    navMenuPage = () =>{document.querySelectorAll(".nav-link").forEach((val, id) => {
            val.addEventListener("click",(e)=>{
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = document.querySelector(data[0]);
                cardVer.style.display = "block";
                data[1].forEach(card=>{
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = "none";
                });
                e.stopImmediatePropagation();
                e.preventDefault();
                this.fillEquiposSelect(['#txtIdEquiJugador','#txtIdEquiListJugador','#txtIdEquiCuerpo']);
            })    
         });
    }

    fillEquiposSelect(selectEquipos){
        selectEquipos.forEach(element => {
            this.clearSelect(element);
            const selectData = document.querySelector(element);
            const itemStart= document.createElement('option');
            itemStart.innerHTML='Selecione un item';
            itemStart.selected;
            selectData.appendChild(itemStart);

            let infoEquipos=JSON.parse(localStorage.getItem("equipos"));
            infoEquipos.forEach(data => {
                const item = document.createElement('option');
                item.value = data._id;
                item.innerHTML = data._nombre;
                selectData.appendChild(item);
                console.log(data._nombre);                    
            });
        });
        
    } 

    clearSelect(v_select) {
        const selectData = document.querySelector(v_select);
        const options= selectData.querySelectorAll('option');
        options.forEach(element => {
            selectData.removeChild(element);
        });
    }
}
customElements.define('nav-bar-menu',NavBarMenu);