const fs = require('fs');
const ruta = './productos.txt';


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
        this.productos = [];
    }

    async save(producto) {
        try {
            let idReset = 1;
            const data = fs.readFileSync(this.archivo, 'utf-8');
            
            if (data.toString() != '') {
                this.productos = JSON.parse(data);
                idReset = this.productos[this.productos.length - 1].id + 1;
            }

            producto.id = idReset;
            this.productos.push(producto)

            fs.writeFileSync(this.archivo, JSON.stringify(this.productos, null, 2))
            
            console.log(idReset);

        } catch(err) {
            console.log(`Hubo un error finalizando metodo save() ${err.message}`)
        }
    }


    async getById(numeroId) {
        try {
        const data = await fs.promises.readFile(this.archivo);

        if(data.toString()){
            this.productos = JSON.parse(data)
        }

        const objId = this.productos.filter(obj => obj.id == numeroId)

        console.log(objId)

        } catch(err) {
            console.log(`Hubo un error finalizando el metodo getById: ${err.message}`)
        }
    }

    async getAll()  {
        try {
            const data = await fs.promises.readFile(this.archivo);

            if(data.toString() != ''){
                this.productos = JSON.parse(data)
            }

            console.log(this.productos);

        } catch(err) {
            console.log(`Hubo un error finalizando el metodo getAll: ${err.message}`)
        } 
    }

    async deleteById(deleteNum) {
        try {
            const data = await fs.promises.readFile(this.archivo);
            if(data.toString()){
                this.productos = JSON.parse(data)
            }

            this.productos.splice((deleteNum - 1), 1);

            await fs.promises.writeFile(this.archivo, this.productos);
            } catch(err) {
                console.log(`Hubo un error finalizando el metodo deleteById: ${err.message}`)
            }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, '')
        } catch(err) {
            console.log(`Hubo un error finalizando el metodo deleteAll ${err.message}`)
        }
    }
}

const obj1 = {
    title: 'Funda Iphone',
    price: 1200
}
const obj2 = {
    title:"Funda Samsung",
    price: 1200
}
const obj3 = {
    title: "Funda iPad",
    price: 1200
}


const p = new Contenedor(ruta);

p.save(obj1)
p.save(obj2)
p.save(obj3)
p.getById(2)
p.getAll();

//p.deleteById(3);
//p.deleteAll()


