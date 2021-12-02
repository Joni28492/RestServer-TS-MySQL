import {Request, Response} from 'express';
import Usuario from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response)=>{
    const usuarios = await Usuario.findAll();
    res.json({usuarios});
} 


export const getUsuario =async (req: Request, res: Response)=>{
    const {id} =req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return res.json(usuario)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
} 


export const postUsuario = async(req: Request, res: Response)=>{
    const {body} =req;
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email '+body.email
            })
        }


        // const usuario = new Usuario(body);//error
        //await usuario.save() //create combina ambas
        const usuario = await Usuario.create(body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hable con el administrador'})
    }
} 


export const putUsuario = async(req: Request, res: Response)=>{
    const {id} =req.params;
    const {body} =req;

    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id '+ id
            })
        }
        //faltaria validacion del email
        await usuario.update(body);
        //los campos no existentes son ignorados
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hable con el administrador'})
    }
   
} 

export const deleteUsuario = async(req: Request, res: Response)=>{
    const {id} =req.params;

    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(404).json({
            msg: 'No existe un usuario con el id '+ id
        })
    }

    await usuario.update({estado: false});

    //eliminacion fisica
    // await usuario.destroy();



    res.json(usuario)
} 
