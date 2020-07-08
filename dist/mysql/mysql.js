"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
// USO DE MYSQL EN NODE https://github.com/mysqljs/mysql // npm i @types/mysql // npm i mysql 
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('clase iniciada');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'user_node',
            password: '123456',
            database: 'node_db',
            port: 3307
        });
        this.conectarBD();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.conn.query(query, (err, results, fields) => {
            if (err) {
                console.log('ERROR EN LA QUERY');
                console.log(err);
                callback(err);
                return;
            }
            if (results.length === 0) {
                callback('el registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarBD() {
        this.conn.connect((err) => {
            if (err) {
                console.error(err.message);
                return;
            }
            this.conectado = true;
            console.log(this.conectado);
            console.log('BASE DE DATOS ON!');
        });
    }
}
exports.default = MySQL;
