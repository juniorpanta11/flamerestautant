const carrito = document.getElementById("carrito");
const listaPlatosEntradas = document.getElementById("listaPlatosEntradas");
const listaPlatosFondo=document.getElementById("listaPlatosFondo");
const listaPlatosMar=document.getElementById("listaPlatosMar");

const listaPlatosBebidas=document.getElementById("listaPlatosBebidas");
const listaPlatosPostres=document.getElementById("listaPlatosPostres");

const contenedorCarrito = document.querySelector('.Car1 .lista_de_Platos ');
const btnVaciarCarrito = document.querySelector('#vaciarCarrito');

let platosCarritos = [];

registrar();

function registrar() {
    listaPlatosEntradas.addEventListener('click', agregarPlato);
    listaPlatosFondo.addEventListener('click', agregarPlato);
    listaPlatosMar.addEventListener('click', agregarPlato);
    listaPlatosBebidas.addEventListener('click', agregarPlato);
    listaPlatosPostres.addEventListener('click', agregarPlato);
    
    carrito.addEventListener('click', eliminarPlato);

    document.addEventListener("DOMContentLoaded", ()=>{ 
        platosCarritos=JSON.parse(localStorage.getItem("CARRITO")) || [];
        carritoHTML()
    })

    btnVaciarCarrito.addEventListener('click', e => {
        platosCarritos = [];
        limpiarHTML()
    })


}


function agregarPlato(e) {
    if (e.target.classList.contains("agregarPlato")) {
        const platoElegidos = e.target.parentElement.parentElement;
        console.log(platoElegidos);
        leerInfo(platoElegidos);
    }
}

function eliminarPlato(e) {
    if(e.target.classList.contains("borrarPlato")){
        const platoId = e.target.getAttribute('data-id');
        
        //Eliminar del arreglo del platosCarritos por el data-id
        platosCarritos = platosCarritos.filter(plato => plato.id !== platoId)

        carritoHTML()

    }
}

function leerInfo(plato) {
    const infoPlatos = {
        imagen: plato.querySelector('img').src,
        titulo: plato.querySelector('h3').textContent,
        precio: plato.querySelector('.precio').textContent,
        id: plato.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = platosCarritos.some(plato => plato.id === infoPlatos.id)
    if (existe) {
        const plato = platosCarritos.map(plato => {
            if (plato.id === infoPlatos.id) {
                plato.cantidad++;
                return plato 
            } else {
                return plato;
            }
        });
        [...platosCarritos, infoPlatos]
    } else {
        //Agregamos elementos al carrito de compras
        platosCarritos = [...platosCarritos, infoPlatos]
    }
    carritoHTML()
}


function carritoHTML() {
    limpiarHTML()
    platosCarritos.forEach(plato => {
        const fila = document.createElement('div');
        fila.innerHTML =  `
        <img src="${plato.imagen}"></img>
        <p>${plato.titulo}</p>
        <p>${plato.precio}</p>
        <p>${plato.cantidad}</p>
        <p><span class="borrarPlato" data-id="${plato.id}">X</span></p>
    `;

    contenedorCarrito.appendChild(fila)
    });

    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem("CARRITO", JSON.stringify(platosCarritos))
}

function limpiarHTML(){
    console.log(contenedorCarrito.firstChild)
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    sincronizarStorage()
}