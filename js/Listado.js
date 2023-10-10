function mostrarListado() {
    const listado = document.getElementById('listado');
    listado.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        const valorAlmacenado = localStorage.getItem(clave);

        console.log("Valor almacenado para la clave", clave, ":", valorAlmacenado);

        let paciente;
        try {
            paciente = JSON.parse(valorAlmacenado);
        } catch (error) {
            console.warn(`El valor para la clave "${clave}" no es un JSON válido: ${valorAlmacenado}`);
            continue;
        }

        const divPaciente = document.createElement('div');
        divPaciente.className = 'card mb-3';
        divPaciente.innerHTML = `
                <li class="list-group-item list-group-item-action">
                <h5>${paciente.nombre}</h5>
                <p>Fecha de nacimiento:</p>
                <p>${paciente.FechaNacimientoPacienteimiento}</p>
                <p>Direccion de paciente:</p>
                <p>${paciente.DireccionPaciente}, ${paciente.departamento}, ${paciente.municipio}</p>
                <p>Documento:</p>
                <p>${paciente.tipoDocumento}</p>
                <p>numero de Documento:</p>
                <p>${paciente.numeroDocumento}</p>
                <p>Telefono:</p>
                <p>${paciente.TelefonoPaciente}</p>
                <p>Motivo Consulta:</p>
                <p>${paciente.MotivoConsultaConsulta}</p>
                <button class="btn btn-danger" onclick="eliminarPaciente('${clave}')">Eliminar</button>
                </li>
            
        `;

        listado.appendChild(divPaciente);
    }
}

function eliminarPaciente(clave) {
    localStorage.removeItem(clave);
    mostrarListado();
    alert('Paciente eliminado exitosamente!');
}