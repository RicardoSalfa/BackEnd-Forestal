import {v4} from 'uuid'
import { getConnection } from '../database.js';

// creo el objeto
export const createTask =  async (req, res)=> {
    const newTask = {
        id: v4(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        direccion:req.body.direccion,
        contacto: req.body.contacto,
        correo: req.body.correo
        
    }
    //console.log(newTask);
    try {
        const db = getConnection()
        db.data.Task.push(newTask)
        await db.write()
        res.json(newTask);   
    } catch (error) {
      return res.status(500).send({message: error.message});  
    }
};

// lee el objeto
export const getTasks = (req, res)=> {
    const db = getConnection()
    res.json(db.data.Task)
};

// obtengo un objeto por id
export const getTask = (req, res)=> {
    //res.send("obteniendo organization");
    const taskFound = getConnection().data.Task.find(Task => Task.id ===req.params.id);
    if (!taskFound) return res.sendStatus(404);
        res.json(taskFound);
    
};

//elemino el objeto
export const deleteTask = async (req, res)=> {
    const db = getConnection()
    const taskFound= db.data.Task.find((t)=> t.id === req.params.id)
    if (!taskFound) return res.sendStatus(404);

    const  newTask = db.data.Task.filter(t=> t.id !== req.params.id)
    db.data.Task = newTask

    await db.write()
    res.json(taskFound)

};


export const updateTask = async (req, res)=> {
    const db = getConnection()
    const taskFound= db.data.Task.find((t)=> t.id === req.params.id)
    if (!taskFound) return res.sendStatus(404);
    taskFound.nombre = req.body.nombre
    taskFound.descripcion = req.body.descripcion
    taskFound.direccion = req.body.direccion
    taskFound.contacto = req.body.contacto
    taskFound.correo = req.body.correo

    db.data.Task.map(t => t.id === req.params.id ? taskFound : t)   
    
    await db.write()
    res.send(taskFound);

};



export const countTask = (req, res)=> {
    const totalTaks = getConnection().data.Task.length
    res.json(totalTaks);
}


