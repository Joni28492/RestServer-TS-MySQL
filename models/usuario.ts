import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario',{
    nombre:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },//es tynint pero lo convierte a 1 y 0
    estado:{
        type:DataTypes.BOOLEAN
    },
});


export default Usuario;



