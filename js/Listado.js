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
            <div class="card-header">${paciente.nombre}</div>
            <div class="card-body">
                <p><strong>Fecha de nacimiento:</strong> ${paciente.fechaNacimiento}</p>
                <p><strong>Dirección:</strong> ${paciente.direccion}, ${paciente.departamento}, ${paciente.municipio}</p>
                <p><strong>Tipo de documento:</strong> ${paciente.tipoDocumento}</p>
                <p><strong>Número de documento:</strong> ${paciente.numeroDocumento}</p>
                <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
                <p><strong>Motivo de consulta:</strong> ${paciente.motivoConsulta}</p>
                <button class="btn btn-danger" onclick="eliminarPaciente('${clave}')">Eliminar</button>
            </div>
        `;

        listado.appendChild(divPaciente);
    }
}

function eliminarPaciente(clave) {
    localStorage.removeItem(clave);
    mostrarListado();
    alert('Paciente eliminado exitosamente!');
}