import '../components/navBarMenu.js';
import '../components/frmEquipos.js';
import '../components/frmJugador.js';
import '../components/frmCuerpoApoyo.js';

function convertirUtcAGmt(fechaUtc) {
    // Convierte la fecha UTC a objeto Date
    let fecha = new Date(fechaUtc);
  
    // Obtiene la hora en milisegundos
    let horaUtc = fecha.getTime();
  
    // Obtiene la zona horaria actual de la fecha UTC en minutos
    let zonaHoraria = fecha.getTimezoneOffset();
  
    // Convierte la zona horaria de minutos a milisegundos
    let zonaHorariaMs = zonaHoraria * 60 * 1000;
  
    // Resta la zona horaria a la hora UTC para obtener la hora GMT
    let horaGmt = horaUtc;
  
    // Crea una nueva fecha a partir de la hora GMT y establece la zona horaria a UTC+0
    let fechaGmt = new Date(horaGmt);
    fechaGmt.setTime(fechaGmt.getTime() + (fechaGmt.getTimezoneOffset() * 60 * 1000));
    //fechaGmt.setTimezoneOffset(0);
    let fechaFull = new Date(fechaGmt.toISOString());
    // Devuelve la fecha en formato ISO
    return fechaFull;
    //return `${fechaFull.toLocaleDateString('es-CO')} ${fechaFull.toLocaleTimeString('es-CO')}`;
  }
  function getHoraCreacion(codId){
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAGmt(fechaUtc);
    return fecha.toLocaleTimeString('es-CO');
  }
  function getFechaCreacion(codId){
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAGmt(fechaUtc);
    return fecha.toLocaleDateString('es-CO');
  }
  function getFechayHoraCreacion(codId){
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAGmt(fechaUtc);
    return `${fecha.toLocaleDateString('es-CO')} ${fecha.toLocaleTimeString('es-CO')}` ;
  }





