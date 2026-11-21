
// Lista de tareas
let tasks = [
    { id: 1, description: "Estudiar JavaScript", completed: false },
    { id: 2, description: "Hacer los ejercicios de HTML", completed: false },
    { id: 3, description: "Organizar mi escritorio", completed: false },
    { id: 4, description: "Entregar el proyecto", completed: true },
    { id: 5, description: "Leer un capítulo de un libro", completed: true }
];

// Elementos del DOM
const formulario = document.getElementById('formulario');
const entradaTarea = document.getElementById('entradaTarea');
const listaTareas = document.getElementById('listaTareas');

// Mostrar tareas
function renderTasks() {
    listaTareas.innerHTML = '';

    // Pendientes primero y completadas al final
    const pendientes = tasks.filter(t => !t.completed);
    const completadas = tasks.filter(t => t.completed);

    const ordenadas = [...pendientes, ...completadas];

    ordenadas.forEach((tarea) => {
        const item = document.createElement('li');
        item.classList.add('tarea');

        if (tarea.completed) {
            item.classList.add('completada');
        }

        // Checkbox
        const casilla = document.createElement('input');
        casilla.type = 'checkbox';
        casilla.checked = tarea.completed; 

        casilla.addEventListener('change', () => {
            tarea.completed = casilla.checked;
            renderTasks();
        });

        // Descripción
        const texto = document.createElement('span');
        texto.textContent = tarea.description;

        // Botón eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.textContent = '🗑';

        botonEliminar.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== tarea.id);
            renderTasks();
        });

        item.append(casilla, texto, botonEliminar);
        listaTareas.appendChild(item);
    });
}

// Agregar tarea
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const descripcion = entradaTarea.value.trim();

    if (descripcion === '') return;

    tasks.push({
        id: Date.now(),
        description: descripcion,
        completed: false
    });

    entradaTarea.value = '';

    renderTasks();
});

// Mostrar al iniciar
renderTasks();
