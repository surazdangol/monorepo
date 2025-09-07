# ----------------------------
# 🔑 User Authentication
# ----------------------------

# Register User
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Suraz Dangol",
    "email": "suraz@example.com",
    "password": "password123"
  }'

# Login User
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "suraz@example.com",
    "password": "password123"
  }'
# Copy token from response and replace <TOKEN> below


# ----------------------------
# 📦 Products
# ----------------------------

# Create Product (Admin only)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 1499,
    "brand": "Apple",
    "category": "Smartphones",
    "countInStock": 10,
    "description": "Latest Apple flagship phone"
  }'

# Get All Products
curl -X GET http://localhost:5000/api/products

# Get Single Product
curl -X GET http://localhost:5000/api/products/<PRODUCT_ID>

# Update Product (Admin only)
curl -X PUT http://localhost:5000/api/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "price": 1399,
    "countInStock": 15
  }'

# Delete Product (Admin only)
curl -X DELETE http://localhost:5000/api/products/<PRODUCT_ID> \
  -H "Authorization: Bearer <TOKEN>"


# ----------------------------
# 🛒 Cart
# ----------------------------

# Add to Cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "productId": "<PRODUCT_ID>",
    "qty": 2
  }'

# Get User Cart
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer <TOKEN>"

# Update Cart Item Quantity
curl -X PUT http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "productId": "<PRODUCT_ID>",
    "qty": 3
  }'

# Remove Item from Cart
curl -X DELETE http://localhost:5000/api/cart/<PRODUCT_ID> \
  -H "Authorization: Bearer <TOKEN>"


# ----------------------------
# 📦 Orders
# ----------------------------

# Create Order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "orderItems": [
      {
        "product": "<PRODUCT_ID>",
        "qty": 2,
        "price": 1499
      }
    ],
    "shippingAddress": {
      "address": "123 Main Street",
      "city": "Kathmandu",
      "postalCode": "44600",
      "country": "Nepal"
    },
    "paymentMethod": "PayPal",
    "itemsPrice": 2998,
    "shippingPrice": 50,
    "totalPrice": 3048
  }'

# Get Logged-in User Orders
curl -X GET http://localhost:5000/api/orders/myorders \
  -H "Authorization: Bearer <TOKEN>"

# Get Order by ID
curl -X GET http://localhost:5000/api/orders/<ORDER_ID> \
  -H "Authorization: Bearer <TOKEN>"

# Update Order to Paid
curl -X PUT http://localhost:5000/api/orders/<ORDER_ID>/pay \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "PAYMENT123",
    "status": "COMPLETED",
    "update_time": "2025-08-29T12:00:00Z",
    "email_address": "buyer@example.com"
  }'

# Update Order to Delivered (Admin only)
curl -X PUT http://localhost:5000/api/orders/<ORDER_ID>/deliver \
  -H "Authorization: Bearer <TOKEN>"