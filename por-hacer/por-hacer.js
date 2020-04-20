
const fs = require('fs')

let listadoPorHacer = []

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer)
    grabarDB()
    return porHacer
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
        return;
        
    }
}

const grabarDB = () => {
    return new Promise((resolve, reject) => {
    
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile(`db/data.json`,data,{encoding: 'utf-8'}, (err)=>{
        if (err) reject(err);
        else
            resolve(`Fichero guardado: db/data.json`)
    })

})
}

const getListado = () => {
    cargarDB()
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })
    if (index >= 0){
        listadoPorHacer[index].completado = completado;
        grabarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })
    if (nuevoListado.length !== listadoPorHacer.length){
        listadoPorHacer = nuevoListado;
        grabarDB();
        return true;
    } else {
        return false;
    }

}


module.exports = {
    crear,
    grabarDB,
    cargarDB,
    getListado,
    actualizar,
    borrar
}