[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11436707&assignment_repo_type=AssignmentRepo)
# p2-cms-integration-server
CMS Integration - Server

# Totoro Diamond API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `POST /account`

- `GET /diamonds`
- `GET /histories`
- `GET /heroes`
- `GET /heroes/:id`
- `GET /generate-midtrans-token`
- `PATCH /carts/:cartId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "user1@gmail.com",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
    "id": 1,
    "email": "user1@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "user1@gmail.com",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
```
OR
```json
{
    "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /google-login

Login via social media google

Request:

- headers:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 4. POST /account

Get username Mobile Legends from 3rd Party API

Request:

- body:

```json
{
  "accountId": 1393323764,
  "serverId" : 15748
}
```

_Response (200 - OK)_

```json
{
    "success": true,
    "data": {
        "game": "Mobile Legends",
        "accountId": "1393323764",
        "username": "kenshin07"
    }
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 5. GET /diamonds

Description:
- Get all diamonds data from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "amount": 100,
        "description": "1x Weekly Diamond Pass",
        "price": 25000,
        "createdAt": "2023-08-01T05:42:24.795Z",
        "updatedAt": "2023-08-01T05:42:24.795Z"
    },
    {
        "id": 2,
        "amount": 200,
        "description": "2x Weekly Diamond Pass",
        "price": 50000,
        "createdAt": "2023-08-01T05:42:24.795Z",
        "updatedAt": "2023-08-01T05:42:24.795Z"
    },
  ...,
]
```

&nbsp;

## 6. GET /histories

Description:
- Get list of histories diamond's transaction 

Request:

- headers: 

```json
{
 "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 3,
        "UserId": 1,
        "DiamondId": 1,
        "AccountId": 1393323764,
        "isPaid": true,
        "createdAt": "2023-08-02T08:36:04.611Z",
        "updatedAt": "2023-08-02T09:27:48.743Z",
        "Diamond": {
            "id": 1,
            "amount": 100,
            "description": "1x Weekly Diamond Pass",
            "price": 25000,
            "createdAt": "2023-08-02T04:19:13.736Z",
            "updatedAt": "2023-08-02T04:19:13.736Z"
        }
    },
    ...
]

```

&nbsp;

## 7. GET /heroes/:id

Description:
- Get heroes by id from 3rd Party API

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "code": 2000,
    "message": "SUCCESS",
    "data": {
        "cover_picture": "https://img.mobilelegends.com/group1/M00/00/06/rB_-LVpAyOqAcoYgAAHhFjl5Ba05533979",
        "gallery_picture": "https://img.mobilelegends.com/group1/M00/00/06/rB_-LVpAzNKAIOFfAABh6JUjhZQ7610008",
        "junling": "",
        "cost": "",
        "des": "",
        "mag": "40",
        "phy": "70",
        "alive": "10",
        "diff": "10",
        "name": "Miya",
        "type": "Marksman",
        "skill": {
            "skill": [
                {
                    "name": "Moon Arrow",
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/ccb18467ff1de61a9e9e7f37e7598ea7.png",
                    "des": "Miya shoots two extra arrows with each Basic Attack, dealing 10<font color='#D58E1F'>( +100% Total Physical Attack)</font> <font color='#C53535'>(Physical Damage)</font> to the target enemy and 30% damage to nearby targets. This effect lasts 4s. Each extra arrow inherits a portion of Attack Effects.",
                    "tips": "This is Miya’s core late-game damage skill. After using it, Miya’s basic attacks will deal damage to three targets. This skill can help Miya to deal heavy AoE damage in team fights. This skill benefits greatly from physical attack obtained through items, so you should only upgrade it to level 1 in the early game, until you get some gear."
                },
                {
                    "name": "Arrow of Eclipse",
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/cef8ef47912cced083381c9cf86f35cb.png",
                    "des": "Miya launches an empowered arrow on the target area, dealing 90<font color='#D58E1F'>( +45% Total Physical Attack)</font> <font color='#C53535'>(Physical Damage)</font> to enemies within and immobilizing them for 1.2s. The arrow then splits into 8 scattering minor arrows, each dealing 30<font color='#D58E1F'>( +15% Total Physical Attack)</font> <font color='#C53535'>(Physical Damage)</font> to the first enemy hit and slowing them by 30% for 2s.",
                    "tips": "This circular slowing skill has a large range, and after hitting an enemy four times, the target will be frozen. Combine this with other teammates’ control skills to leave your enemy feeling hopeless. This is Miya’s main damage and wave-clearing skill in the early game, and is therefore a priority when upgrading skills."
                },
                {
                    "name": "Hidden Moonlight",
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/3b4a7ec8531606b4a8cad697dae6f338.png",
                    "des": "Miya removes all debuffs on her and conceals herself, gaining 35% extra Movement Speed. This state lasts 2s or until she launches an attack.\nMiya gains full stacks of <font color='#404495'>(Moon Blessing)</font> upon leaving the state.",
                    "tips": "This displacement skill removes all control effects from Miya and puts her into stealth, significantly enhancing her survivability in team fights. When the enemy team suddenly launches an attack in the late game, Miya can retreat and find a safer position to attack from."
                },
                {
                    "name": "Moon Blessing",
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/2281b4a99686dbb2f3076a76517d4429.png",
                    "des": "Each time Miya hits a target with her Basic Attack, she gains 5% Attack Speed for 4s. Stacks up to 5 times.\nAfter reaching full stacks, Miya summons a <font color='#404495'>(Moonlight Shadow)</font> with each Basic Attack that deals 30<font color='#D58E1F'>( +30% Total Physical Attack)</font> <font color='#C53535'>(Physical Damage)</font> and inherits a portion of Attack Effects.",
                    "tips": "Miya’s basic attacks increase her attack speed, so her damage will increase the longer she stays in combat. Before engaging a hero, try to build up and maintain your passive attack speed boost by continually attacking minions."
                }
            ],
            "item": {
                "main": {
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/cef8ef47912cced083381c9cf86f35cb.png"
                },
                "secondary": {
                    "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/skill/ccb18467ff1de61a9e9e7f37e7598ea7.png"
                },
                "battle_first": {
                    "icon": "https://img.mobilelegends.com/group1/M00/00/06/rB_-LVo8_haATKt0AABH0pUQqEg1474122"
                },
                "battle_second": {
                    "icon": "https://img.mobilelegends.com/group1/M00/00/05/rB_-LVo8_dGAFBn4AABQ7mzW4KI9082406"
                },
                "tips": "Prioritize her second skill, then first, and upgrade her ultimate whenever you can.<br>Miya’s second skill can help her to effectively push the lane and trade with enemy laners."
            }
        },
        "gear": {
            "out_pack": [
                {
                    "equipment_id": 2008,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/83ecda0156293f06380866251ca52c32.png",
                        "name": "Corrosion Scythe",
                        "des": [
                            "Unique Passive - Corrosion: Basic Attacks gain 80 extra Physical Damage and slow the target by 8% (halved for ranged Basic Attacks) for 1.5s. Stacks up to 5 times."
                        ]
                    }
                },
                {
                    "equipment_id": 2305,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/7687c04512d5640eb1f66000ba50e7bc.png",
                        "name": "Swift Boots",
                        "des": [
                            ""
                        ]
                    }
                },
                {
                    "equipment_id": 2006,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/4adc2b796ec60846e0af2405e1deea41.png",
                        "name": "Demon Hunter Sword",
                        "des": [
                            "Unique Passive - Devour: Basic Attacks deal 8% of the target's current HP as extra Physical Damage (capped at 60 against minions)."
                        ]
                    }
                },
                {
                    "equipment_id": 2009,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/675098b263e972d28ec23e8d04828f36.png",
                        "name": "Golden Staff",
                        "des": [
                            "Unique Passive - Swift: Every 1% extra Crit Chance gained is converted into 1% extra Attack Speed."
                        ]
                    }
                },
                {
                    "equipment_id": 3002,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/04ad01172bbceaf396c83f07187b7849.png",
                        "name": "Haas' Claws",
                        "des": [
                            "Unique Passive - Insanity: Gains 15% Lifesteal when below 50% HP."
                        ]
                    }
                },
                {
                    "equipment_id": 3001,
                    "equip": {
                        "icon": "//akmwebstatic.yuanzhanapp.com/web/mlweb/image/res/miya/equip/1a757f3a370c309b9ef1441521237b5c.png",
                        "name": "Malefic Roar",
                        "des": [
                            "Unique Passive - Armor Buster: When attacking an enemy, gains 0.125% extra Physical Penetration for each point of the enemy's Physical Defense, capped at 40%."
                        ]
                    }
                }
            ],
            "out_pack_tips": "Miya’s skills grant her a lot of attack speed, so Swift Boots are not really needed. Choosing Rapid Boots can help Miya to achieve better positioning in team fights.",
            "verysix": []
        },
        "counters": {
            "best": {
                "heroid": "20",
                "best_mate_tips": "Miya is very fragile and requires the protection of her teammates to reach her full damage potential. Lolita can help her to achieve this.",
                "name": "Lolita",
                "icon": "//akmwebstatic.yuanzhanapp.com/web/madmin/image_007ce553513122fdab39684dbbe215e3.png"
            },
            "counters": {
                "heroid": "49",
                "restrain_hero_tips": "Miya’s damage is very high, so tanks who lack high damage will find it difficult to deal with her in the late game. ",
                "name": "Hylos",
                "icon": "//akmwebstatic.yuanzhanapp.com/web/madmin/image_f3ddb1088279d711417234034024223d.png"
            },
            "countered": {
                "heroid": "21",
                "by_restrain_tips": "Miya is very squishy, and without the aid of support heroes, is susceptible to assassins.",
                "name": "Hayabusa",
                "icon": "//akmweb.youngjoygame.com/web/madmin/image/3de2f55e701a340a02f1828e79cdb9fa.png?w=150-150-1f1820"
            }
        }
    }
}
```

&nbsp;


## 8. GET /generate-midtrans-token

Description:
- Get ...

Request:

- body:

```json
{
  "DiamondId": 2,
  "AccountId": 1812716121,
}
```

_Response (200 - OK)_

```json
{
    "midtransToken": {
        "token": "e69cca24-1e69-4aa4-9110-486d6559546f",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/e69cca24-1e69-4aa4-9110-486d6559546f"
    },
    "Cart": {
        "id": 26,
        "UserId": 1,
        "DiamondId": 2,
        "AccountId": 1812716121,
        "isPaid": false,
        "createdAt": "2023-08-03T01:50:10.575Z",
        "updatedAt": "2023-08-03T01:50:10.575Z",
        "Diamond": {
            "id": 2,
            "amount": 200,
            "description": "2x Weekly Diamond Pass",
            "price": 50000,
            "createdAt": "2023-08-02T04:19:13.736Z",
            "updatedAt": "2023-08-02T04:19:13.736Z"
        }
    }
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```
&nbsp;


## 9. PATCH /carts/:cartId

Description:
- Update transaction from unpaid to paid

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Transaction success"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "TUnauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```