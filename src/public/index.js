const socket = io();

socket.emit("getProducts");

socket.on("productos", (productos) => {
    
    document.getElementById("productos").innerHTML = "";
    for(let i = 0; i < productos.length; i++) {
        const {title, description, price, stock} = productos[i];
        document.getElementById("productos").innerHTML += `<div class="card">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">${code}</p>
                <p class="card-text">${category}</p>
                <p class="card-text">${price}</p>
                <p class="card-text">${stock}</p>
            </div>
        </div>`;
    }
});

