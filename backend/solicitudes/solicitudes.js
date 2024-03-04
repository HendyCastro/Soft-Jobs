const pool = require('../config/basededatos');
const bcrypt = require('bcryptjs')

const recuperarEntradas = async (email) => {
    const {rows} = await pool.query("select * from usuarios where email = $1", [email])
    return rows
}

const crearEntrada = async (email,password,rol,lenguage) => {
    const passwordEncrypt =  bcrypt.hashSync(password)
    const clave = passwordEncrypt
    const {rows} = await pool.query("insert into usuarios(email,password,rol,lenguage) values ($1,$2,$3,$4)",
    [email,clave,rol,lenguage])
    return rows
}

module.exports = {
    recuperarEntradas,
    crearEntrada
}