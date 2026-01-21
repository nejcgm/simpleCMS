import express, { query } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import 'dotenv/config';
const DB_PASSWORD = process.env.DB_PASSWORD ;

const app = express();

app.use(cors());
app.use(express.json());

/*povezava na podatkovno bazo*/
const connection2 = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'nejc_gjura_meke_frizerski_salon',
    port: 3306
});

try {
    await connection2.connect();
    console.log('Connected to database.');
} catch (err) {
    console.error('Database connection failed:', err);
}
    
    const [rows] = await connection2.execute('select * from narocena_stranka');
    
    class Stranka {
        constructor(id, ime, priimek, starost, spol, mail, termin, frizer_id, storitev_id) {
            this.id = id;
            this.ime = ime;
            this.priimek = priimek;
            this.starost = starost;
            this.spol = spol;
            this.mail = mail;
            this.termin = termin;
            this.frizer_id = frizer_id;
            this.storitev_id = storitev_id;
        }

            static async fetch() { 
            const [rows] = await connection2.execute('select * from narocena_stranka');    
            return rows.map(row => new Stranka(
            row.id,
            row.ime,
            row.priimek,
            row.starost,
            row.spol,
            row.mail,
            row.termin,
            row.frizer_id,
            row.storitev_id
        ));}


        //polimorfizem
        static poisci_ime(vnosIme, stranke) {
            
        }
        
       
        static poisci_starost_imena(vnosIme, stranke) {
            const najdena_stranka = stranke.filter((stranka) => stranka.ime === vnosIme);
            const starost =najdena_stranka.map(stranka => stranka.starost);
        return `starost ${vnosIme} je ${starost}`;
        }
    }

    //dedovanje
    class Popust extends Stranka {
        constructor(id, ime, priimek, starost, spol, mail, termin, frizer_id, storitev_id, tocke_zvestobe, popust_cena) {
            super(id, ime, priimek, starost, spol, mail, termin, frizer_id, storitev_id);
            this.tocke_zvestobe = tocke_zvestobe;
            this.popust_cena = popust_cena;
        }
        
        static async fetch() {
            const [rows] = await connection2.execute('select * from narocena_stranka');
            return rows.map(row => new Popust(
            row.id,
            row.ime,
            row.priimek,
            row.starost,
            row.spol,
            row.mail,
            row.termin,
            row.frizer_id,
            row.storitev_id,
            row.tocke_zvestobe,
            row.popust_cena
        ));}


        //polimorfizem
        static poisci_ime(vnosIme, popusti) {
            return popusti.filter((popust) => popust.starost === vnosIme);
        }
        static poisci_ime(vnosIme, stranke){
            return stranke.filter((stranka) => stranka.ime === vnosIme);
        }

        static popust(vnosIme, popusti){
            const najdena_stranka = popusti.filter((popust) => popust.ime === vnosIme);
            const popust = najdena_stranka.map(popusti=> popusti.popust_cena)
            return `cena z popustom ${vnosIme} je ${popust}`;
        }
    }

    (async () => {
        const stranke = await Stranka.fetch();
        const popusti = await Popust.fetch();
    
        console.log(Stranka.poisci_ime('Ana', stranke));
        console.log(Popust.poisci_ime(22, popusti));
        console.log(Stranka.poisci_starost_imena('Ana', stranke));
        console.log(Popust.popust('Tina', popusti));
    })();
    
    
    app.get('/stranka',async(req,res)=>{
    res.json(popusti);
    });

app.listen(8080,()=>{
    console.log("server is running at 8080")
    });