//var constats = require('../constants/constants.js')

class DatosPaciente {
    constructor(nombre, FechaNacimientoPacienteimiento, DireccionPaciente, departamento, municipio, tipoDocumento, numeroDocumento, TelefonoPaciente, MotivoConsultaConsulta) {
        this.nombre = nombre;
        this.FechaNacimientoPacienteimiento = FechaNacimientoPacienteimiento;
        this.DireccionPaciente = DireccionPaciente;
        this.departamento = departamento;
        this.municipio = municipio;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.TelefonoPaciente = TelefonoPaciente;
        this.MotivoConsultaConsulta = MotivoConsultaConsulta;
    }
}

function mostrarMunicipios() {
    console.log(window.DEPARTAMENTO_MUNICIPIOS)
    const departamentoSeleccionado = document.getElementById('departamento').value;
    const municipios = window.DEPARTAMENTO_MUNICIPIOS[departamentoSeleccionado];
    const selectMunicipio = document.getElementById('Municipio');

    selectMunicipio.innerHTML = '';

    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio;
        option.textContent = municipio;
        selectMunicipio.appendChild(option);
    });
}

window.onload = mostrarMunicipios;

function ValidarDatos() {
    const nombrePaciente = document.getElementById('NombrePaciente').value;
    const DireccionPaciente = document.getElementById('DireccionPaciente').value;
    const MotivoConsultaConsulta = document.getElementById('MotivoConsulta').value;
    const FechaNacimientoPaciente = document.getElementById('FechaNacimientoPaciente').value;
    const fechaNacObj = new Date(FechaNacimientoPaciente);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const TelefonoPaciente = document.getElementById('TelefonoPaciente').value;
    const DocumentoPaciente = document.getElementById('DocumentoPaciente').value;
    const TipoDocumento = document.getElementById('TipoDocumento').value;

    if (fechaNacObj > fechaActual) {
        alert('La fecha de nacimiento no puede ser mayor a la fecha actual.');
        return;
    }

    if (!isNaN(nombrePaciente) || nombrePaciente.trim() === "") {
        alert('El nombre, no permite numeros, tampoco puede quedar vacio.');
        return;
    }

    if (DireccionPaciente.trim() === "") {
        alert('Ingrese otra direccion, porfavor.')
        return;
    }

    if (TipoDocumento === "DUI") {
        const duiRegex = /^\d{8}-\d{1}$/;
        if (!duiRegex.test(DocumentoPaciente)) {
            alert('Ingrese un DUI Valido (12345678-9).');
            return;
        }
    } else {
        const PasaporteRegex = /^[a-zA-Z0-9]{9}$/;
        if (!PasaporteRegex.test(DocumentoPaciente)) {
            alert('Ingrese un pasaporte valido.');
            return;
        }
    }

    const TelefonoPacienteRegex = /^\d{8}$/;
    if (!TelefonoPacienteRegex.test(TelefonoPaciente)) {
        alert('Ingrese un numero de telefono valido.');
        return;
    }

    if (MotivoConsultaConsulta.trim() === "") {
        alert('No puede dejar campos vacios.')
        return;
    }
    GuardarRegistro();
    return true;
}

function GuardarRegistro() {

    const datos = new DatosPaciente(
        document.getElementById('NombrePaciente').value,
        document.getElementById('FechaNacimientoPaciente').value,
        document.getElementById('DireccionPaciente').value,
        document.getElementById('departamento').value,
        document.getElementById('Municipio').value,
        document.getElementById('TipoDocumento').value,
        document.getElementById('DocumentoPaciente').value,
        document.getElementById('TelefonoPaciente').value,
        document.getElementById('MotivoConsulta').value
    );


    localStorage.setItem(datos.numeroDocumento, JSON.stringify(datos));

    alert('Paciente registrado exitosamente!');
    document.Pacientes.reset();
}

window.onload = function () {
    mostrarMunicipios();
}
