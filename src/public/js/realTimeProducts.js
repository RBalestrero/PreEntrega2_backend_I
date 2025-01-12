const socket = io();

socket.emit("getProducts");

socket.on("productos", (productos) => {
  document.getElementById("productos").innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    const { title, description, price, stock, code, category, id } =
      productos[i];
    document.getElementById("productos").innerHTML += `<div class="card">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">Código: ${code}</p>
                <p class="card-text">${category}</p>
                <p class="card-text">$${price}</p>
                <p class="card-text">${stock} Unidades</p>
                <button id="${id}" class="delete-product" onclick="socket.emit('deleteProduct', '${id}')">Eliminar</button>
            </div>
        </div>`;
  }
});

document.getElementById("addProduct").addEventListener("click", async () => {
  const { value: formValues } = await Swal.fire({
    title: "Añadir producto",
    html: `
      <input id="title" class="swal2-input" placeholder="Titulo" >
      <input id="description" class="swal2-input" placeholder="Descripcion">
      <input id="price" class="swal2-input" placeholder="Precio">
      <input id="stock" class="swal2-input" placeholder="Stock">
      <input id="code" class="swal2-input" placeholder="Codigo">
      <input id="category" class="swal2-input" placeholder="Categoria">
    `,
    confirmButtonText: "Añadir",
    focusConfirm: false,

    preConfirm: () => {
      return {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        code: document.getElementById("code").value,
        category: document.getElementById("category").value,
      };
    },
  });
  Swal.fire({
    title: "Producto añadido",
    icon: "success"
  });

  socket.emit("addProduct", formValues);
});
