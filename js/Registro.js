class Paciente {
    constructor(nombre, fechaNacimiento, direccion, departamento, municipio, tipoDocumento, numeroDocumento, telefono, motivoConsulta) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.departamento = departamento;
        this.municipio = municipio;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.telefono = telefono;
        this.motivoConsulta = motivoConsulta;
    }
}

const departamentosMunicipios = {
    "Ahuachapán": ["Ahuachapán", "Atiquizaya", "Jujutla"],
    "Santa Ana": ["Santa Ana", "Chalchuapa", "Metapán"],
    "Sonsonate": ["Sonsonate", "Acajutla", "Nahuizalco"],
    "Chalatenango": ["Chalatenango", "Dulce Nombre de María", "El Paraíso"],
    "La Libertad": ["Santa Tecla", "Antiguo Cuscatlán", "Quezaltepeque"],
    "San Salvador": ["San Salvador", "Mejicanos", "Soyapango"],
    "Cuscatlán": ["Cojutepeque", "Suchitoto", "San Pedro Perulapán"],
    "La Paz": ["Zacatecoluca", "San Pedro Masahuat", "Olocuilta"],
    "Cabañas": ["Sensuntepeque", "Ilobasco", "Victoria"],
    "San Vicente": ["San Vicente", "Tecoluca", "Guadalupe"],
    "Usulután": ["Usulután", "Jiquilisco", "Berlin"],
    "San Miguel": ["San Miguel", "Chapeltique", "Chinameca"],
    "Morazán": ["San Francisco Gotera", "Osicala", "Cacaopera"],
    "La Unión": ["La Unión", "Santa Rosa de Lima", "El Sauce"]
};

function actualizarMunicipios() {
    const departamentoSeleccionado = document.getElementById('departamento').value;
    const municipios = departamentosMunicipios[departamentoSeleccionado];
    const selectMunicipio = document.getElementById('Municipio');

    selectMunicipio.innerHTML = '';

    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio;
        option.textContent = municipio;
        selectMunicipio.appendChild(option);
    });
}

window.onload = actualizarMunicipios;

function Validacion() {
    const nombrePaciente = document.getElementById('NombrePaciente').value;
    const direccion = document.getElementById('Direccion').value;
    const motivoConsulta = document.getElementById('Motivo').value;
    const FechaNac = document.getElementById('FechaNac').value;
    const Telefono = document.getElementById('Telefono').value;
    const NumDocumento = document.getElementById('NumDocumento').value;
    const TipoDocumento = document.getElementById('TipoDocumento').value;

    if (!isNaN(nombrePaciente) || nombrePaciente.trim() === "") {
        alert("Debe ingresar un nombre válido para el paciente");
        return false;
    }

    if (direccion.trim() === "") {
        alert("Ingrese una dirección válida")
        return false;
    }

    if (TipoDocumento === "DUI") {
        const duiRegex = /^\d{8}-\d{1}$/;
        if (!duiRegex.test(NumDocumento)) {
            alert('Por favor, ingrese un DUI válido con el formato 12345678-9.');
            return false;
        }
    } else {
        const PasaporteRegex = /^\d{9}$/;
        if (!PasaporteRegex.test(NumDocumento)) {
            alert('Por favor, ingrese un número de pasaporte válido de 9 dígitos.');
            return false;
        }
    }

    const TelefonoRegex = /^\d{8}$/;
    if (!TelefonoRegex.test(Telefono)) {
        alert('Por favor, ingrese un número de teléfono válido de 8 dígitos.');
        return false;
    }

    if (motivoConsulta.trim() === "") {
        alert("Ingrese algun motivo")
        return false;
    }

    return true;
}

function GuardarPaciente() {
    if (Validacion()) {
        const paciente = new Paciente(
            document.getElementById('NombrePaciente').value,
            document.getElementById('FechaNac').value,
            document.getElementById('Direccion').value,
            document.getElementById('departamento').value,
            document.getElementById('Municipio').value,
            document.getElementById('TipoDocumento').value,
            document.getElementById('NumDocumento').value,
            document.getElementById('Telefono').value,
            document.getElementById('Motivo').value
        );


        localStorage.setItem(paciente.numeroDocumento, JSON.stringify(paciente));

        alert('Paciente registrado exitosamente!');
        document.Pacientes.reset();

        window.location.href = "./Listado.html";
    }
}

window.onload = function () {
    actualizarMunicipios();
}
