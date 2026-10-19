# Quiet Fisher

> **==MDX YEAR 2 CST2120 - COURSEWORK 1 - GAME WEBSITE==**

Welcome to Quiet Fisher, a simple web game, that I am making for my university coursework project.

***State - [VERY EARLY DEVELOPMENT]***

**The website on github and codeberg won't be loading due to the current base urls set**
**Will be fixed later**

## Features

### User Account

Uses:
- HTML LocalStorage to store "*PSEUDO-DATABASE*"
- HTML SessionStorage to store current session's user
- JSON Object

Implements:
- RegEx validation for
    - E-Mail
    - Username
    - Phone -> Number
    - Password
- Silly message(that will not be seen in signup screen) when age is inserted
- Confirm Password validation

#### Object format

##### JSON
```json
{
    "username-data" : {
        "email" : "email-data",
        "age" : "age-data",
        "address" : "address-data",
        "phone" : {
            "code" : "country-code-data",
            "number" : "number-data"
        },
        "password" : "password-data",
        "leaderboard" : {
            "level_1" : {
                "score" : "score-data",
                "message" : "message-data"
            }, "level_2" : {
                "score" : "score-data",
                "message" : "message-data"
            }, "level_3" : {
                "score" : "score-data",
                "message" : "message-data"
            }, "level_4" : {
                "score" : "score-data",
                "message" : "message-data"
            }, "level_5" : {
                "score" : "score-data",
                "message" : "message-data"
            }, "endless" : {
                "score" : "score-data",
                "message" : "message-data"
            }
        }
    }
}
```

##### Table
<table>
    <tr>
        <th rowspan="3">Username</th>
        <th rowspan="3">Password</th>
        <th rowspan="3">E-Mail</th>
        <th rowspan="3">Age</th>
        <th rowspan="3">Address</th>
        <th colspan="2">Phone</th>
        <th colspan="12">Leaderboard</th>
    </tr>
    <tr>
        <th rowspan="2">Code</th>
        <th rowspan="2">Number</th>
        <th colspan="2">Level 1</th>
        <th colspan="2">Level 2</th>
        <th colspan="2">Level 3</th>
        <th colspan="2">Level 4</th>
        <th colspan="2">Level 5</th>
        <th colspan="2">Endless</th>
    </tr>
    <tr>
        <td>Score</td>
        <td>Message</td>
        <td>Score</td>
        <td>Message</td>
        <td>Score</td>
        <td>Message</td>
        <td>Score</td>
        <td>Message</td>
        <td>Score</td>
        <td>Message</td>
        <td>Score</td>
        <td>Message</td>
    </tr>
    <tr>
        <td>guest</td>
        <td>0</td>
        <td></td><td></td><td></td>
        <td></td><td></td><td></td>
        <td></td><td></td><td></td>
        <td></td><td></td><td></td>
        <td></td><td></td><td></td>
        <td></td><td></td>
    </tr>
</table>


## Checklist

### General

#### Website

- [ ] Homepage `/pages/website/index.html`
- [X] Login Page `/pages/website/login.html`
- [X] Signup Page `/pages/website/signup.html`
- [ ] Gallery Page `/pages/website/gallery.html`
- [ ] Attributions Page `/pages/website/attributions.html`
- [ ] About `/pages/website/about.html`

#### Game

- [ ] Menu Page `/pages/game/menu.html`
- [ ] Levels
- [ ] Endless mode

#### Leaderboard

- [ ] Leaderboard page `/pages/leaderboard.html`

### Other

#### `HTML`

**html**
- `<html lang="en">`

**head**
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<meta name="author" content="nojjia">`
- [ ] `<meta name="description" content="">`
- [ ] `<title></title>`
- [ ] `<link rel="icon" type="image/x-icon" href="/assets/image/favicon.ico">`
- [ ] `<link rel="stylesheet" href="">`
- [ ] `<script src=""></script>`
- [ ] `<script src="" defer></script>`

**body**

---

## Personal Notes

***JavaScript loading***
- If some js needs to be executed after page load, add defer
    `<script src="" defer></script>`

***HTML***
- Don't forget
    - `<!DOCTYPE html>`
    - `<html lang="en">`
    - ``

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
`<meta name="author" content="page author's name">`
`<meta name="description" content="Some description of page">`
