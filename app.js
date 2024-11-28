const express = require('express')

const bodyParser = require('body-parser')

const mysql = require('mysql2');

const path = require('path');



const usuarios = [{
    id: '0',
    nome: "Fernanda Alves",
    email: "fernanda@gmail.com",
    idade: "23"
    
}]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, 'public')));



const conexao =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senai",
    database: "projeto1"
})

conexao.connect (function(erro){
    if (erro) throw erro;
    console.log("Conexão efetuada com sucesso!");
});



app.get("/", function (req, res) {
    res.render("home", {
    data: usuarios   
})
})

app.get("/json", (req, res) => {
    res.status(200).json(usuarios);
  });

app.get("/atualizar", function (req, res) {
    res.render("Atualizar", {
        data: usuarios
    })
})

app.get("/adicionar", function (req, res) {
    res.render("Adicionar", {
        data: usuarios
    })
})

//ROTAS POST

app.post("/", (req, res) => {
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
  
    usuarios.push({
        nome: nome,
        email: email,
        senha: senha,
        
    })


   let sql = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;
        
   
   conexao.query(sql, function(erro, retorno){
    if(erro) throw erro;
       console.log(retorno);
   });


   

    res.render("home", {
        data: usuarios
    })



app.post('/delete', (req, res) => {
    var requestedid = req.body.id;
    var j = 0;
    usuarios.forEach(user => {
        j = j + 1;
        if (user.id === requestedid) {
            usuarios.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: usuarios
    })
})
})

app.post('/update', (req, res) => {
    const inputid = req.body.id
    const inputnome = req.body.nome
    const inputemail = req.body.email
    const inputsenha = req.body.senha
    

    var j = 0;
    usuarios.forEach(user => {
        j = j + 1;
        if (user.id === inputid) {
            user.nome = inputnome
            user.email = inputemail
            user.senha = inputsenha
        }
    })
    res.render("home", {
        data: usuarios
    })
})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando na porta 3000")
})



