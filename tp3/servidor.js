const http = require('http');
const fs = require('fs');
const ruta = './productos.txt';

const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', err => console.log(`Error en servidor ${err}`));


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
        this.productos = [];
    }
    async getAll()  {
        try {
            let data = await fs.promises.readFile(this.archivo);

            this.productos = JSON.parse(data);

            
            return `<h3>${Object.values(this.productos)}</h3>`

        } catch(err) {
            console.log(`Hubo un error en el metodo getAll: ${err.message}`)
        } 
    }
    async getRandom() {
        try {
            const data = await fs.promises.readFile(this.archivo);

            if(data.toString()){
                this.productos = JSON.parse(data)
            }

            let random = Math.floor(Math.random()*this.productos.length);

            return `<h3>${Object.values(this.productos[random])}</h3>`
        } catch(err) {
            console.log(`Hubo un error en el metodo getRandom: ${err.message}`)
        }
    }
}


const p = new Contenedor(ruta);


app.get('/productos', async (req, res) => {
    const contenedorProductos = await p.getAll();
    res.send(contenedorProductos)
}) 


app.get('/productoRandom', async (req, res) => {
    const contenedorRandom = await p.getRandom();
    res.send(contenedorRandom)
})




