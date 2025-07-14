# URL Shortener Backend

A simple Node.js + Express + MongoDB backend for shortening URLs and tracking detailed click data.

---

## 🚀 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/goutamdz/12205832
   cd med/backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and update as needed:
   ```
   MONGO_URL=mongodb://localhost:27017/url
   PORT=3000
   ```

4. **Start MongoDB**  
   Make sure MongoDB is running locally.

5. **Run the server**
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

---

## 📚 API Routes

### 1. **POST `/shorturls/`**  
Create a new shortened URL.

#### **Request**
```json
{
  "originalUrl": "https://www.example.com",
  "shortcode": "custom123",      // (optional)
  "validity": 60                 // (optional, in minutes, default: 30)
}
```

#### **Response**
```json
{
  "shortlink": "http://localhost:3000/abcd1234",
  "expiry": "2025-07-14T06:55:33.765Z"
}
```

---

### 2. **GET `/shorturls/:shortId`**  
Get details for a shortened URL and log a click.

#### **Response**
```json
{
  "_id": "6874a2dd568dda06c92a7a30",
  "originalUrl": "https://www.example.com",
  "shortId": "abcd1234",
  "expiresAt": "2025-07-14T06:55:33.765Z",
  "clicks": [
    {
      "timestamp": "2025-07-14T06:33:18.246Z",
      "referrer": "",
      "location": "::1",
      "_id": "6874a4ae31cd7c829163287f"
    }
    // ...more clicks
  ],
  "totalClicks": 3
}
```

---

### 3. **GET `/shorturls/test`**  
Test route to verify the router is working.

#### **Response**
```
Router is working!
```

---

## 📝 Notes

- **Click Data:**  
  Each time a shortened URL is accessed, a click is logged with:
  - `timestamp`: When the click occurred
  - `referrer`: The HTTP referrer (if any)
  - `location`: The IP address of the requester

- **Shortcode:**  
  If you provide a `shortcode`, it must be unique. If omitted, a random code is generated.

- **Validity:**  
  The `validity` field sets how long (in minutes) the short URL is valid.

---

## 🛠️ Project Structure

```
backend/
  controllers/
    url.contoller.js
  models/
    url.model.js
  routes/
    url.route.js
  config/
    connect.js
  index.js
  .env.example
  package.json
```

---

## 🧑‍💻 Example Usage

**Create a short URL:**
```sh
curl -X POST http://localhost:3000/shorturls/ \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.google.com"}'
```

**Get short URL details and log a click:**
```sh
curl http://localhost:3000/shorturls/abcd1234
```



---