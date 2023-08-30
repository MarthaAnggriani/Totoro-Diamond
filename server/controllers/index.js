const { OAuth2Client } = require('google-auth-library');
const { Diamond, User, Cart } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { generateAccessToken, verifyAccessToken } = require("../helpers/jwt")
const midtransClient = require('midtrans-client');
const axios = require('axios');
const cart = require("../models/cart");

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await User.create({
                email, password
            })
            res.status(201).json({ id: newUser.id, email: newUser.email })
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "emailFalsy" }
            if (!password) throw { name: "passwordFalsy" }

            const findUser = await User.findOne({ where: { email: email } });
            if (!findUser) throw { name: "userInvalid" }

            const validation = findUser.verifyPassword(password);
            if (!validation) throw { name: "userInvalid" }

            // generate access_token
            const access_token = generateAccessToken(findUser);

            res.status(200).json({ access_token });

        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token = req.headers.google_token;

            const { OAuth2Client } = require('google-auth-library');
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            const user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                user = await User.create({
                    email: payload.email,
                    password: Math.random().toString(),
                    role: "user"
                }, {
                    hooks: false
                })
            }
            const access_token = generateAccessToken(user);
            res.json({ access_token, user });

        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async getDiamonds(req, res, next) {
        try {
            const data = await Diamond.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async paymentGateway(req, res, next) {
        try {
            // create Cart
            const UserId = req.user.id;
            const { DiamondId, AccountId } = req.body;

            const diamond = await Diamond.findByPk(DiamondId);
            if (!diamond) throw { name: "NotFound" }

            const cart = await Cart.create({
                UserId,
                DiamondId: DiamondId,
                AccountId: AccountId,
            })

            // const cartId = req.params.cartId; //id Cart

            const data = await Cart.findOne({
                where: { UserId, isPaid: false },
                include: ["Diamond"]
            });

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + data.id,
                    "gross_amount": data.Diamond.price
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    email: req.user.email
                }
            };
            const midtransToken = await snap.createTransaction(parameter)

            res.status(200).json({ midtransToken, Cart: data });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getUsername(req, res, next) {
        const { accountId, serverId } = req.body;
        const options = {
            method: 'GET',
            url: `https://id-game-checker.p.rapidapi.com/mobile-legends/${accountId}/${serverId}`,
            headers: {
                'X-RapidAPI-Key': '47bdcd1606msh8bbbe22ef878047p19efc5jsn2684bfe50a24',
                'X-RapidAPI-Host': 'id-game-checker.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);


            // data dari 3RD Party API di hardcode
            const data = {
                success: true,
                data: {
                    game: 'Mobile Legends',
                    accountId: response.data.data.userId, //1393323764
                    // accountId: `${accountId}`, //1393323764
                    username: response.data.data.username
                    // username: "Anggi"
                }
            }

            if (!data) throw ({ name: "NotFound" })

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async updateStatusPaid(req, res, next) {
        try {
            const userId = req.user.id;
            const cartId = req.params.cartId

            const cart = await Cart.findByPk(cartId);

            if (!cart) throw ({ name: "NotFound" })
            // cek udah dibayar atau belum
            if (cart.isPaid) throw ({ name: "isPaid" })

            // const updatedPaid = true;
            await Cart.update({ isPaid: true }, { where: { id: cart.id } })

            // history dibuat disini, create (kalau isPaid == true)
            res.status(200).json({ message: "Transaction success" })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getHeroes(req, res, next) {
        try {
            const keyword = req.query.filterBy;
            const currentPage = parseInt(req.query.page) || 1;
            const filter = req.query.filter;
            const itemsPerPage = 16;


            const heroes = {
                method: 'GET',
                url: 'https://unofficial-mobile-legends.p.rapidapi.com/heroes',
                headers: {
                    'X-RapidAPI-Key': '47bdcd1606msh8bbbe22ef878047p19efc5jsn2684bfe50a24',
                    'X-RapidAPI-Host': 'unofficial-mobile-legends.p.rapidapi.com'
                }
            }

            const response = await axios.request(heroes);
            const { data } = response.data;

            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentHeroes = data.slice(startIndex, endIndex);
            res.status(200).json({
                currentPage,
                totalPages,
                totalItems,
                heroes: currentHeroes
            });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getHeroesById(req, res, next) {
        const { id } = req.params;
        const options = {
            method: 'GET',
            url: `https://unofficial-mobile-legends.p.rapidapi.com/heroes/${id}`,
            headers: {
                'X-RapidAPI-Key': '47bdcd1606msh8bbbe22ef878047p19efc5jsn2684bfe50a24',
                'X-RapidAPI-Host': 'unofficial-mobile-legends.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            res.status(200).json(response.data)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getHistories(req, res, next) {
        try {
            const data = await Cart.findAll({
                where: { isPaid: true },
                include: ['Diamond'],
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Controller;