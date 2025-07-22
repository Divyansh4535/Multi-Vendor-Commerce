// | Code     | Name         | Meaning & When to Use |
// | ✅ **200 OK*            | Request succeeded. Used for **GET**, **PUT**, **DELETE**,
// | ✅ **201 Created**      | Used when a new resource is **successfully created** (e.g., user, product).
// | ✅ **204 No Content**   | Success but **no response body**. Often used with **DELETE**.
// | ⚠️ **400 Bad Request**  | Client sent **invalid data** (e.g., missing fields, wrong format).
// | 🔐 **401 Unauthorized** | User is **not authenticated** (no or invalid token).                       |
// | 🚫 **403 Forbidden**    | User is **authenticated** but **not allowed** (wrong role/permission).
// | ❓ **404  Not Found**    | The requested resource **doesn't exist** (e.g., invalid URL or ID).
// | 🔄 **409 Conflict**     | Conflict in request (e.g., email already registered, duplicate entry).
// | 💥 **500 Internal Server Error** | Something went wrong on the **server side** (e.g., DB crash, exception).

console.error("Delete Product Error:", error.message);
return res.status(500).send({
  status: false,
  msg: "Server error",
  error: error.message,
});
