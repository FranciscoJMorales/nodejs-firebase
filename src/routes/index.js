const admin = require('firebase-admin')

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://lab2ac2-default-rtdb.firebaseio.com/'
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('actual').once('value', (snapshot) => {
        data = snapshot.val();
        db.ref('valor').once('value', (snapshot) => {
            data2 = snapshot.val();
            data3 = [{
                numero: data,
                valor: data2
            }]
            res.render('index', {datos: data3})
         });
        //res.render('index', {datos: data})
     });
    /*db.ref('lab9').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {datos: data})
    });*/
})

router.get('/actual', (req, res) => {
    db.ref('actual').once('value', (snapshot) => {
       data = snapshot.val();
       res.send(data)
    });
})

router.get('/enviarPic/:id', (req, res) => {
    db.ref('lab9/' + req.params.id).once('value', (snapshot) => {
        data = snapshot.val();
        db.ref('PicActual').set(data);
        res.redirect('/');
    });
});

router.get('/enviarRasp/:id', (req, res) => {
    db.ref('lab9/' + req.params.id).once('value', (snapshot) => {
        data = snapshot.val();
        db.ref('RaspActual').set(data);
        res.redirect('/');
    });
});

router.get('/delete/:id', (req, res) => {
    db.ref('lab9/' + req.params.id).remove();
    res.redirect('/');
});

router.get('/hoy', (req, res) => {
    /*const nuevo = {
        numero: req.body.numero,
        valor: "El contador está activo"
    }*/
    //db.ref('lab9/0').set(nuevo);
    db.ref('actual').set(5);
    db.ref('valor').set("El contador esta activo");
    //db.ref('actual').set(req.body.numero);
    res.send();
});

router.post('/nuevo', (req, res) => {
    /*const nuevo = {
        numero: req.body.numero,
        valor: "El contador está activo"
    }*/
    //db.ref('lab9/0').set(nuevo);
    db.ref('actual').set(5);
    db.ref('valor').set("El contador esta activo");
    //db.ref('actual').set(req.body.numero);
    res.redirect('/');
});



module.exports = router;