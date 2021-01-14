const express = require("express");
const server = express();
const cors = require("cors");
const myPublicFiles = express.static("./public");
const multer = require("multer");
const fetch = require("node-fetch");
const dotenv = require ("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {spawn} = require("child_process");	
const Port = 8080;

const Facebook = require("./lib/OauthFacebook.js");
const facebook = new Facebook();
const fs = require("fs");

const upload = multer();
const JWT = require("./lib/JWT.js");
const {CredentialsValidator, EmailValidator, PasswordValidator} = require("./lib/validator.js");
const {getGoogleAuthURL, getGoogleUser} = require("./lib/OauthGoogle.js");
const {PromiseConnectionDB} = require("./lib/ConnectionDB.js");
const validator = require("./lib/validator.js");
const optionsJWT = {
	"maxAge": 1000 * 60 * 15 * 4 * 24 * 15, // would expire after 15 days		////// OPTIONS DE JWT//////
	"httpOnly": true, // The cookie only accessible by the web server
	"signed": true // Indicates if the cookie should be signed
};


//Middlewares
server.use(bodyParser.urlencoded({"extended":false}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(myPublicFiles);
server.use(cors({origin: process.env.FRONT_URL, credentials: true}));
// server.use(express.static(__dirname + "/public"));
// server.use(bodyParser.urlencoded({extended: true}));


////////////////////// GET //////////////////////////////

server.get("/logout", (req, res) =>{
    res.clearCookie(JWT);
    res.redirect("http://localhost:8080");
});

server.get("/google-redirect", (req, res) => {
	res.redirect(getGoogleAuthURL());
});

server.get("/google-login", async (req, res) => {

    const {code} = req.query;
    
	if (code) {
        const userData = await getGoogleUser(code);

        if(userData){
            // res.send(userData);
            const {id, email, name} = userData;
            const Validated = EmailValidator(email);

            if(Validated){
                PromiseConnectionDB()
                .then((DBconnection) => {
                    //Select siempre devuelve un array, y cuidado con el like, si hay un correo que lo contiene te entran
                    const sql = "SELECT * FROM users U INNER JOIN UsersGoogle UG ON UG.ext_usrid = U.usrid WHERE email = ? OR idGoogle = ?";
                    DBconnection.query(sql, [email,id], (err, result) => {

                        if (err){
                            // res.send({"res" : "-2", "msg" : err})
                            res.redirect(`${process.env.FRONT_URL}/error/-2`)
                            //poner en todos los que se haga la peticion desde el navegador y no desde un fetch
                        } else if (result.length){

                            //Generate JWT
                            const Payload = {
                                "usrid" : result[0].usrid,
                                "name" : result[0].name,
                                "email" : result[0].email,
                                "iat" : new Date()
                            };

                            const jwt = JWT.generateJWT(Payload);
                            const jwtVerified = JWT.verifyJWT(jwt);

                            if(jwtVerified){

                                //Access as administrator
                                res.cookie("JWT", jwt, {"httpOnly" : true})
                                res.send({"res" : "1", "msg" : `${result[0].name} has been found in DB and logged in with google`});
                                // res.redirect(`${process.env.FRONT_URL}/login-successful`)

                            } else {
                                res.send({"res" : "-1", "msg" : "JWT not verified"})
                                // res.redirect(`${process.env.FRONT_URL}/error/-1`)
                            }
                                
                        } else {

                            // res.send({"res" : "2", "msg" : "User Google to fill form", userData})
							const sql = `INSERT INTO Users (name, email) VALUES (?, ?)`;
                            DBconnection.query(sql, [name, email], (err, result) => {
								if (err)
									throw err;
								else {

									const idUser = result.insertId; ///este sería el id del ultimo usuario creado
									const sql = `INSERT INTO UsersGoogle (ext_usrId,idGoogle) VALUES (?, ?)`;
									DBconnection.query(sql, [idUser, id], (err, result) => {
										if (err)
											throw err;
										else {

											const Payload = {
												"idUser": idUser,
												"Name": name,
												"Email": email,
												"iat" : new Date()
												// "ip": req.ip
											};
											res.cookie("jwt", JWT.generateJWT(Payload), {httpOnly: true})
											res.redirect( "http://localhost:3000/Mask-list" );

										}
									});
								}
								DBconnection.end();
							});
						}
                    });
                })
                .catch(err => res.send({"res" : "-3", "msg" : err}))
                // .catch(() => res.redirect(`${process.env.FRONT_URL}/error/-3`))
            }

        } else {
            res.send({"res" : "-4", "msg" : "No userData"});
            // res.redirect(`${process.env.FRONT_URL}/error/-4`)
        }

	} else {
        res.send({"res" : "-5", "msg" : "No code"})
        // res.redirect(`${process.env.FRONT_URL}/error/-5`)
    }
});

server.get("/facebook-redirect", (req, res) => {
	res.redirect(facebook.getRedirectUrl());
});

server.get("/facebook-login", async (req, res) => {

    const Token = await (facebook.getOauthToken(req.query.code, req.query.state));
    const data = await facebook.getUserInfo(Token, ["name", "email"])
    
    const {id, name, email} = data;

    console.log(data);

    if(id && name && email){

        let Validated = validator.EmailValidator(email);

        if(Validated){
            PromiseConnectionDB()
            .then((DBconnection) => {
                const sql = "SELECT * FROM users U INNER JOIN UsersFacebook UF ON UF.ext_usrid = U.usrid WHERE email = ? OR idFacebook = ?"; 
                DBconnection.query(sql, [email, id], (err, result) => {

                    if (err){
                        res.redirect(`${process.env.FRONT_URL}/error/-2`)
                    } else if (result.length){

                            //Generate JWT
                            const Payload = {
                                "usrid" : result[0].usrid,
                                "name" : result[0].name,
                                "email" : result[0].email,
                                "iat" : new Date()
                            };

                            //COMPLETAR con resto de datos pedidos

                            const jwt = JWT.generateJWT(Payload);
                            const jwtVerified = JWT.verifyJWT(jwt);

                            if(jwtVerified){

                                //Access as administrator
                            res.cookie("JWT", jwt, {"httpOnly" : true})
                            res.redirect(`${process.env.FRONT_URL}/login-successful`)

                            } else {
                                res.redirect(`${process.env.FRONT_URL}/error/-1`)
                            }
                            
                    } else {

                        const Payload = {
                            "usrid" : id,
                            "name" : name,
                            "email" : email,
                            "provider" : "facebook"
                        };

                        const jwt = JWT.generateJWT(Payload);

                        res.cookie("Oauth", jwt, {"httpOnly" : true});
                        // res.send({"res" : "2", "msg" : "User facebook to fill form", data});
                        res.redirect( "http://localhost:3000/Mask-list" );
                    }
                    DBconnection.end();
                });
            })
            .catch(() => res.redirect(`${process.env.FRONT_URL}/error/-3`))
            
        } else {
            res.redirect(`${process.env.FRONT_URL}/error/-4`)
        }
    } else {
        res.redirect(`${process.env.FRONT_URL}/error/-5`)
    }
});

server.get("/get-mask-dashboard", (req, res) => {

	PromiseConnectionDB()
	.then(DBconnection => {

		const sql = `SELECT * FROM maskdata`;
		DBconnection.query(sql, (err, result) => {
			if(err)
				res.send({"res" : "-1", "msg" : err});

			else {
				res.send({"res" : "1", "msg" : "data found", result});
			}
			DBconnection.end();	
		})
	})
	.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));
});

//COMPROBAR CON MA

server.get("/get-mask-by-filters", (req, res) => {

	const {respiratory, children, sport} = req.query;

	if(respiratory && children && sport ){

		PromiseConnectionDB()
		.then(DBconnection =>{

			const sql = `SELECT MD.* 
							FROM maskdata AS MD 
							WHERE MD.respiratory = ?
								AND MD.children = ? 
								AND MD.sport = ? ;`;

			DBconnection.query(sql,[respiratory, children, sport], (err, result) =>{
				if(err)
					res.send({"res" : "-1", "msg" : err});
				else {
					res.send({"res" : "1", "msg" : "data found", result});
				}
				DBconnection.end();	
			})
		})
		.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));

	} else {
		res.send({"res" : "-3", "msg" : "no req.query"})	
	}			
});

// no req.query


server.get("/get-mask-detail", (req, res) => {

	const {idMask} = req.query;
	if(idMask){

		PromiseConnectionDB()
		.then(DBconnection => {

			const sql = "SELECT MD.* FROM maskdata AS MD WHERE MD.id = ?";
			DBconnection.query(sql, [idMask], (err, result) => {
				if(err)
					res.send({"res" : "-1", "msg" : err});
				else {
					res.send({"res" : "1", "msg" : "detail of mask found", result});
				}
				DBconnection.end();
			})
		})
		.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));
	} else {
		res.send({"res" : "-3", "msg" : "no req.query"})
	}
});

server.get("/get-user-profile", (req, res) => {

	const { usrid } = JWT.getJWTInfo(req.cookies.jwt);

	if(usrid){
		PromiseConnectionDB()
		.then(DBconnection => {
			const sql = "SELECT U.name, U.usrid FROM users AS U where U.usrid = ?";
			DBconnection.query(sql, [usrid], (err, result) => {
				if(err)
					res.send({"res" : "-1", "msg" : err});
				else {
					res.send({"res" : "1", "msg" : "user found", result});
				}
				DBconnection.end();
			})
		})
		.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));

	} else {
		res.send({"res" : "-3", "msg" : "no usrid or error in JWT"})
	}
});

server.get("/get-user-mask", (req, res) => {

	const {usrid} = JWT.getJWTInfo(req.cookies.jwt);
	if(usrid){

		PromiseConnectionDB()
		.then(DBconnection =>{
			const sql = `SELECT ref_idMaskData, MD.name, MD.type, MD.type2
								FROM users AS U JOIN UserMasks AS UM 
													ON UM.ext_usrid = U.usrid 
												JOIN maskdata AS MD 
													ON MD.id = ref_idMaskData 
												WHERE U.usrid = ?;`;

			DBconnection.query(sql, [usrid], (err, result) => {
				if(err)
					res.send({"res" : "-1", "msg" : err});
				else {
					res.send({"res" : "1", "msg" : "masks from personal list found", result});
				}
			})
		})
		.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));

	} else {
		res.send({"res" : "-3", "msg" : "no usrid or error in JWT"})
	}
})

////////////////////// POST ///////////////////////
server.post("/register", (req, res) => {

	const {name, email, psw} = req.body;

    if(name && email && psw){
		const validated = CredentialsValidator(email, psw);

		if(validated){
			PromiseConnectionDB()
            .then((DBconnection) => {

                const sql = "SELECT U.* FROM users U INNER JOIN PersonalUsers PU ON PU.ext_usrid = U.usrid WHERE email = ?";
                DBconnection.query(sql, [email], (err, result) => {
                    if (err){
                        res.send({"res" : "-1", "msg" : err})

                    } else if (result.length){
						res.send({"res" : "0", "msg" : "user already registered"});
						//tendras que redireccionar en front a login con algun settimeout despues de mostrarle un mensaje de que ya esta registrado
                    } else {
						const sql = "INSERT INTO users (email,name) VALUES (?, ?)";
						DBconnection.query(sql, [email, name], (err, result) => {
							if(err)
								res.send({"res" : "-2", "msg" : err});
							else {
								const idResultInsert = result.insertId;
								const {password, salt} = JWT.encryptPassword(psw)

								const sql = "INSERT INTO PersonalUsers (ext_usrid, psw, salt) VALUES (?, ?, ?)";
                        		DBconnection.query(sql, [idResultInsert, password, salt], err => {
									if(err)
										res.send({"res" : "-3", "msg" : err})
									else {

										const Payload = {
											"usrid" : idResultInsert,
											"name" : name,
											"email": email,
											"iat": new Date(),
											// "role": "User",
											// "ip":req.ip
										};

										const jwt = JWT.generateJWT(Payload);
										const jwtVerified = JWT.verifyJWT(jwt);

										if(jwtVerified){
											res.cookie("jwt", jwt , {optionsJWT})
											res.send({"res" : "1", "msg": "Logged¡"});
											//redireccionas en front a dashboard

										} else {
											res.send({"res" : "-4", "msg" : "JWT not verified"})
										}
									}
								})
							}
							DBconnection.end();
						})
                    }
                });
            })
            .catch(e => res.send({"res" : "-5", "msg" : "error in database", "e" : console.error(e)}))    
		}else{
			res.send({"res" : "-6", "msg" : "Error in credentials"})
		}	
	}else{
		res.send({"res" : "-7", "msg" : "no req.body"})	
	}
});

server.post("/login", (req, res) => {
	 
	let {email, password} = req.body;

	if(email && password){

		// const validated = CredentialsValidator(email, psw);
		const validated = EmailValidator(email);

		if(validated){

			// const {encryptedPsw, salt} = JWT.verifyPassword(psw, realPassword);

			PromiseConnectionDB()
			.then(DBconnection => {

				const sql = `SELECT PU.psw, PU.salt FROM PersonalUsers AS PU JOIN users AS U ON PU.ext_usrid = U.usrid WHERE U.email = ?`;
				DBconnection.query(sql, [email], (err, result) => {
					if(err){
						res.send({"res" : "-1", "msg" : err})
					} else if(result.length){

						const realPassword = {password : result[0].psw, salt: result[0].salt};
						const myRealPassword = JWT.verifyPassword(password, realPassword);
						console.log(myRealPassword);

					if(myRealPassword) {const sql = `SELECT U.* FROM users AS U JOIN PersonalUsers AS PU ON U.usrid = PU.ext_usrid WHERE U.email = ?`;
						DBconnection.query(sql, [email,], (err, result) => {

						const Payload = {
							"usrid" : result[0].usrid,
							"name" : result[0].name,
							"email": result[0].email,
							"iat": new Date(),
							// "role": "User",
							// "ip":req.ip
						};

						res.cookie("jwt", JWT.generateJWT(Payload), {httpOnly: true})
						res.send({"res" : "1", "msg": "Logged¡", result});

					})}
					else (res.send({"msg" : "Contraseña incorrecta"}))
						

					} else {
						res.send({"res" : "-2", "msg" : "user not registered yet"})
					}
					DBconnection.end();
				});
			})
			.catch(e => res.send({"res" : "-3", "msg" : "error in database", "e" : console.error(e)}))

		} else {
			res.send({"res" : "-4", "msg" : "Error in credentials"})
		}

	} else {
		res.send({"res" : "-5", "msg" : "no req.body"})
	}
});

function getDate() {
	return "mask";
}

server.post("/save-photo", upload.none(), (req, res) => {

	const {img} = req.body;
	
	let base64Data = img.replace(/^data:image\/png;base64,/, "");
	let imgPath = `public/imgs/${getDate()}.png`;
    fs.writeFile(imgPath, base64Data, "base64", err => {
		if(err)
			res.send({"res" : "-1", "msg" : "writefile failed"});
		else {
			/*
				Ejecutar el script de python y el resultado mandarlo a front
			*/
			getMaskData(__dirname + "/" + imgPath).then(data => {
				res.send({"res": "1", data});
				/*Enviarselos a front */
			}).catch(e => {
				console.log(e);
				res.send({"res": "-2", "msg": "Can not read mask data"});
				/* Enviar a fornt que hay un error */
			});
		}
	});
});


server.post("/add-personal-mask", (req, res) => {

	const {usrid} = JWT.getJWTInfo(req.cookies.jwt);
	
	if(usrid){

		const {id, name, shop, type, type2, reusable, price, certificate, effectiveness, expiration, respiratory, children, sport} = req.body;
		
		if(id && usrid){

			PromiseConnectionDB()
			.then(DBconnection => {
				const sql = "INSERT INTO maskdata (id) VALUES (?);";
				DBconnection.query(sql,[id], (err, result) => {
					if(err)
						res.send({"res" : "-1", "msg" : err});
					else {

						const resultId = result.insertId;
						const sql = "INSERT INTO UserMasks (ext_usrid, ref_idMaskData) VALUES (?, ?);";
						DBconnection.query(sql, [usrid, resultId], err => {
							if(err)
								res.send({"res" : "-2", "msg" : err});
							else {
								res.send({"res" : "1", "msg" : "mask added to personal list"});
							}
							DBconnection.end();
						})
					}
				})
			})
			.catch(e => res.send({"res" : "-3", "msg" : "error in database", e}));
		} else {
			res.send({"res" : "-4", "msg" : "no id of mask"})
		}
	} else {
		res.send({"res" : "-5", "msg" : "no usrid from JWT"})
	}
});

//////////------ PUT ---------/////////////////////
server.put("/change-user-name", (req, res) => {

	const {usrid, name, newName} = req.body;

	if(usrid && name && newName){

		PromiseConnectionDB()
		.then(DBconnection => {
			const sql = `UPDATE users SET name = ? WHERE usrid = ? AND name = ?;`;
			DBconnection.query(sql, [newName, usrid, name], err => {
				if(err)
					res.send({"res" : "-1", "msg" : err});
				else {
					res.send({"res" : "1", "msg" : `Updated ${name} with ${newName}`})
				}
				DBconnection.end();
			})
		})
		.catch(e => res.send({"res" : "-2", "msg" : "error in database", e}));

	} else {
		res.send({"res" : "-3", "msg" : "no usrid or name or newName"})
	}
});

///////// PYTHON ////////////

// const {spawn} = require("child_process");

function getMaskData(url) {
    return new Promise((resolve, reject) => {

        const python = spawn('python', [__dirname + "/python/main.py", url]);
        
        python.stdout.on("data", (data) => {
            resolve(JSON.parse(data.toString()))
        });
        
        python.stderr.on("data", (data) => {
            console.error("ERROR", data.toString());
            reject({error: "There is an error"});
        });
    });
}

// 





////////LISTENING PORT/////////

server.listen(Port,() => {
    console.log(`Server Listening on port ${Port}`);
})