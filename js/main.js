// PRODUCTOS
const productos = [
    // Teclados
    {
        id: "teclado-01",
        titulo: "Teclado Redragon Yama",
        imagen: "./img/teclados/teclado-yama.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 17500
    },
    {
        id: "teclado-02",
        titulo: "Teclado Redragon Kumara",
        imagen: "./img/teclados/teclado-kumara.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 9000
    },
    {
        id: "teclado-03",
        titulo: "Teclado Redragon Deimos",
        imagen: "./img/teclados/teclado-deimos.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 9700
    },
    {
        id: "teclado-04",
        titulo: "Teclado Redragon Fizz Pro",
        imagen: "./img/teclados/teclado-fizzPro.jpg",
        categoria: {
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 11300
    },
    // Switchs
    {
        id: "switch-01",
        titulo: "Switch Blue",
        imagen: "./img/switchs/switch-blue.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 3500
    },
    {
        id: "switch-02",
        titulo: "Switch Red",
        imagen: "./img/switchs/switch-red.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 3500
    },
    {
        id: "switch-03",
        titulo: "Switch Brown",
        imagen: "./img/switchs/switch-brown.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 4000
    },
    {
        id: "switch-04",
        titulo: "Switch Purple",
        imagen: "./img/switchs/switch-purple.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 3800
    },
    {
        id: "switch-05",
        titulo: "Switch Black",
        imagen: "./img/switchs/switch-black.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 5000
    },
    {
        id: "switch-06",
        titulo: "Switch Yellow",
        imagen: "./img/switchs/switch-yellow.jpeg",
        categoria: {
            nombre: "Switchs",
            id: "switchs"
        },
        precio: 5800
    },
    // Keycaps
    {
        id: "keycap-01",
        titulo: "Set Keycaps vintage",
        imagen: "./img/keycaps/keycaps-vintage.jpeg",
        categoria: {
            nombre: "Keycaps",
            id: "keycaps"
        },
        precio: 1000
    },
    {
        id: "keycap-02",
        titulo: "Set keycaps rainbow",
        imagen: "./img/keycaps/keycaps-rainbow.jpg",
        categoria: {
            nombre: "Keycaps",
            id: "keycaps"
        },
        precio: 1000
    },
    {
        id: "keycap-03",
        titulo: "Keycaps 3D personalizables",
        imagen: "./img/keycaps/keycaps-3dPersonalizados.jpg",
        categoria: {
            nombre: "Keycaps",
            id: "keycaps"
        },
        precio: 1000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}