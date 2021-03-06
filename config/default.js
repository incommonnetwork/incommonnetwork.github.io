module.exports = {
    "host": "localhost",
    "protocol": "http",
    "port": 3030,
    "public": "../public/",
    "paginate": {
        "default": 10,
        "max": 50
    },
    "authentication": {
        "secret": "1d927e52532008496abb385a9a396d4120dbd1f7f8280b155de213a255c7b13de3e84585a945e707e355cd43945071b3f7986afd727d1fc807750a813638a472548a086c474311274f81fe2e27916c4e99a94cc5f03cb72795189b7628d568dab9926572fa620150356153369dc400b38bbecb826ad9447412494b68b9fa91b152e4b70f76a40294d1c76b22959cd590004da17a945703845f43a7353ccfa95ddde857b29298b363f95a5b4a48fadb1f3169d455fca50e33935fe4146de2f010c11eeeee940fc0c8a666a429698f2567f76d5d4f4eab7630ffe12eed6afb5e65e74dfba654c252e8050ad695e471a7652b01b559f85f85322594a29efe55fbed",
        "strategies": [
            "jwt",
            "local"
        ],
        "path": "/authentication",
        "service": "users",
        "jwt": {
            "header": {
                "typ": "access"
            },
            "audience": "https://yourdomain.com",
            "subject": "anonymous",
            "issuer": "feathers",
            "algorithm": "HS256",
            "expiresIn": "1d"
        },
        "local": {
            "entity": "user",
            "usernameField": "email",
            "passwordField": "password"
        },
        "google": {
            "clientID": "your google client id",
            "clientSecret": "your google client secret",
            "successRedirect": "/",
            "scope": [
                "profile openid email"
            ]
        },
        "facebook": {
            "clientID": "your facebook client id",
            "clientSecret": "your facebook client secret",
            "successRedirect": "/",
            "scope": [
                "public_profile",
                "email"
            ],
            "profileFields": [
                "id",
                "displayName",
                "first_name",
                "last_name",
                "email",
                "gender",
                "profileUrl",
                "birthday",
                "picture",
                "permissions"
            ]
        },
        "github": {
            "clientID": "your github client id",
            "clientSecret": "your github client secret",
            "successRedirect": "/"
        },
        "cookie": {
            "enabled": true,
            "name": "feathers-jwt",
            "httpOnly": false,
            "secure": false
        }
    },
    "postgres": "postgres://incommon:incommon@localhost:5432/incommon"
}
