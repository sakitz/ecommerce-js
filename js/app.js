// variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso)

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); //eliminamos todo el html
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursosSeleccionados = e.target.parentElement.parentElement
        leerDatosCursos(cursosSeleccionados)
    }
}

//eliminar curso
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        //elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML(); //iterar sobre el carrito
    }
}

function leerDatosCursos(curso) {
    //extraer info
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

     //revisa si ya hay cursos comprados
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
     if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso //retorna el objeto actualizado
            } else {
                return curso //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos]
     } else {
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
     }



    carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML() {

    //limpiar el html

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src="${imagen}" width='200'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}' > X </>
            </td>

        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//elimina los cursos del tbody

function limpiarHTML() {
    
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}