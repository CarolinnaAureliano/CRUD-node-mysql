var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display produtos 
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM produtos',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('produtos',{data:''});   
        } else {
            res.render('produtos',{data:rows});
        }
    });
});

// display add produtos 
router.get('/add', function(req, res, next) {    
    res.render('produtos/add', {
        nome_produto: '',
        status_produto: '',
        preco_produto: ''        
    })
})

// add produto
router.post('/add', function(req, res, next) {    

    let nome_produto = req.body.nome_produto;
    let status_produto = req.body.status_produto;
    let preco_produto = req.body.preco_produto;
    let errors = false;

    if(status_produto.length === 0 || preco_produto.length === 0) {
        errors = true;

        req.flash('error', "Digite os Campos");
        res.render('produtos/add', {
            nome_produto: nome_produto,
            status_produto: status_produto,
            preco_produto: preco_produto
        })
    }

    // verificar linha 58>
    if(!errors) {
        var form_data = {
            nome_produto: nome_produto,
            status_produto: status_produto,
            preco_produto: preco_produto
        }
        dbConn.query('INSERT INTO produtos SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
        
                res.render('produtos/add', {
                    nome_produto: form_data.nome_produto,
                    status_produto: form_data.status_produto,                    
                    preco_produto: form_data.preco_produto
                })
            } else {                
                req.flash('success', 'Produto Adicionado com Sucesso');
                res.redirect('/produtos');
            }
        })
    }
})

// display edit produtos
router.get('/edit/(:id_produtos)', function(req, res, next) {

    let id_produtos = req.params.id_produtos;
   
    dbConn.query('SELECT * FROM produtos WHERE id_produtos = ' + id_produtos, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Produto não encontrado:  ' + id_produtos)
            res.redirect('/produtos')
        }
        else {
            res.render('produtos/edit', {
                title: 'Editar produto', 
                id_produtos: rows[0].id_produtos,
                nome_produto: rows[0].nome_produto,
                status_produto: rows[0].status_produto,
                preco_produto: rows[0].preco_produto
            })
        }
    })
})

// update ----------------------------------------
router.post('/update/(:id_produtos)', function(req, res, next) {

    let id_produtos = req.params.id_produtos;
    let nome_produto = req.body.nome_produto;
    let status_produto = req.body.status_produto;
    let preco_produto = req.body.preco_produto;
    let errors = false;

    if(nome_produto.length === 0) {
        errors = true;
        
        req.flash('error', "Digite o nome do Produto");
        res.render('produtos/edit', {
            id_produtos: req.params.id_produtos,
            nome_produto: nome_produto,
            status_produto: status_produto,
            preco_produto: preco_produto
        })
    }

    if( !errors ) {   
 
        var form_data = {
            nome_produto: nome_produto,
            status_produto: status_produto,
            preco_produto: preco_produto
        }
        dbConn.query('UPDATE produtos SET ? WHERE id_produtos = ' + id_produtos, form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('produtos/edit', {
                    id_produtos: req.params.id_produtos,
                    nome_produto: nome_produto,
                    status_produto: status_produto,
                    preco_produto: preco_produto
                })
            } else {
                req.flash('success', 'Produto Atualizado com sucesso');
                res.redirect('/produtos');
            }
        })
    }
})
   
// delete produto
router.get('/delete/(:id_produtos)', function(req, res, next) {

    let id = req.params.id_produtos;
     
    dbConn.query('DELETE FROM produtos WHERE id_produtos = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/produtos')
        } else {
            req.flash('success', 'Produto deletado com Sucesso!')
            res.redirect('/produtos')
        }
    })
})

module.exports = router;