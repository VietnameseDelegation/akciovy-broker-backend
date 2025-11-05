## Project setup
```bash
$ npm install
```

## Compile and run the project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
## Swagger Docs
```http://localhost:3000/api```
## API Endpoints Documentation
---

###  Login

#### `GET /login`
**Description:** Get all users  
**Response:**  
Returns a list of all registered users.

---

#### `POST /login`
**Description:** Create a new user  
**Query parameters:**
- `username` — *string*, required  
- `password` — *string*, required  

**Response:**  
Returns the created user object.

---

#### `DELETE /login/deleteUser`
**Description:** Delete a user  
**Query parameters:**
- `username` — *string*, required  

**Response:**  
Returns confirmation that the user has been deleted.

---

###  Money

#### `POST /money`
**Description:** Get current balance of a user  
**Query parameters:**
- `username` — *string*, required  

**Response:**  
Returns the current balance of the specified user.  

---

#### `POST /money/add`
**Description:** Add money to a user account  
**Query parameters:**
- `username` — *string*, required  
- `amount` — *number*, required  

**Response:**  
Returns updated balance after adding money.  

---

#### `POST /money/remove`
**Description:** Remove money from a user account  
**Query parameters:**
- `username` — *string*, required  
- `amount` — *number*, required  

**Response:**  
Returns updated balance after removing money.  

---

### Stocks

#### `POST /stocks/buy`
**Description:** Buy stocks for a user  
**Query parameters:**
- `username` — *string*, required  
- `symbol` — *string*, required (e.g. `AAPL`, `TSLA`, `GOOGL`)  
- `quantity` — *number*, required  
- `price` — *number*, required  

**Response:**  
Returns updated portfolio and balance after purchase.  

---

#### `POST /stocks/sell`
**Description:** Sell stocks for a user  
**Query parameters:**
- `username` — *string*, required  
- `symbol` — *string*, required  
- `quantity` — *number*, required  
- `price` — *number*, required  

**Response:**  
Returns updated portfolio and balance after sale.  

---

#### `GET /stocks/portfolio`
**Description:** Get user portfolio with stock values  
**Query parameters:**
- `username` — *string*, required  

**Note:**  
For now, stock prices are hardcoded as follows:
- `AAPL = 180`  
- `TSLA = 900`  
- `GOOGL = 130`

**Response:**  
Returns:
```json
{
  "username": "john",
  "money": 1200,
  "portfolio": [
    { "symbol": "AAPL", "quantity": 10, "currentPrice": 180, "totalValue": 1800 },
    { "symbol": "TSLA", "quantity": 5, "currentPrice": 900, "totalValue": 4500 }
  ]
}


