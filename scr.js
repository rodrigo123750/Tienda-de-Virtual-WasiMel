function agregarProductoPersonalizado() {
    const nombre = document.getElementById('producto-nombre').value;
    const precio = parseFloat(document.getElementById('producto-precio').value);

    if(!nombre || isNaN(precio) || precio <=0){
        alert('Por favor ingresa un nombre y un precio válido.');
    return;
    }


agregarAlCarrito(nombre, precio);
document.getElementById('producto-nombre').value = "";
document.getElementById('producto-precio').value = "";
}