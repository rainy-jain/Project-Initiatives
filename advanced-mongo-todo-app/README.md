# Advanced MongoDB Todo App



Tech Stack:
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Features Covered

This project demonstrates:

- CRUD operations
- Schema design
- Embedded documents
- Compound indexes
- Unique indexes
- Sparse indexes
- Partial indexes
- TTL indexes
- Text indexes
- Aggregation pipelines
- Filtering
- Query optimization
- Repository pattern
- Service layer
- MVC architecture
- MongoDB relationships concepts
- Boolean indexing concepts
- Sorting and querying
- MongoDB explain concepts

---

# Project Structure

controllers/
services/
repositories/
models/
routes/

This separation follows SOLID principles.

- Controllers -> request/response
- Services -> business logic
- Repositories -> DB layer
- Models -> schema

---

# How To Run

## 1. Install MongoDB

Download MongoDB Community Edition.

Start MongoDB locally.

MongoDB should run on:

mongodb://127.0.0.1:27017

---

## 2. Install Dependencies

npm install

---

## 3. Start Server

npm run dev

---

## 4. Seed Sample Data

npm run seed

---

# API Endpoints

## Create Todo

POST /api/todos

Body:

{
  "title": "Learn MongoDB",
  "description": "Indexes and aggregation",
  "priority": "high",
  "completed": false,
  "archived": false,
  "tags": ["mongodb"],
  "userId": "6630f3f2f2f2f2f2f2f2f2f2"
}

---

## Get Todos

GET /api/todos

Query params:

?completed=true
?priority=high

---

## Update Todo

PUT /api/todos/:id

---

## Delete Todo

DELETE /api/todos/:id

---

## Aggregation Stats

GET /api/todos/stats

Groups todos by priority.

---

# MongoDB Concepts Explained

# 1. Compound Index

In Todo.js:

todoSchema.index({
  userId: 1,
  completed: 1,
  dueDate: -1
});

Meaning:
- First indexed by userId
- Then completed
- Then dueDate descending

Best for queries like:

{
  userId,
  completed
}

and sorting by dueDate.

MongoDB uses LEFT PREFIX rule.

Efficient:
(userId)
(userId, completed)
(userId, completed, dueDate)

Not efficient:
(completed)
(dueDate)

---

# 2. Boolean Indexing

completed is boolean.

Boolean fields have LOW cardinality.

So putting them first is usually bad:

BAD:
{
  completed: 1,
  userId: 1
}

GOOD:
{
  userId: 1,
  completed: 1
}

Because userId is more selective.

---

# 3. Unique Compound Index

todoSchema.index(
  {
    title: 1,
    userId: 1
  },
  {
    unique: true
  }
);

This means:
Same user cannot create duplicate titles.

But another user can.

---

# 4. Text Index

todoSchema.index({
  title: "text",
  description: "text"
});

Enables:

db.todos.find({
  $text: {
    $search: "mongodb"
  }
})

---

# 5. Sparse Index

todoSchema.index(
  {
    dueDate: 1
  },
  {
    sparse: true
  }
);

Only documents containing dueDate are indexed.

Useful when many docs miss the field.

---

# 6. TTL Index

todoSchema.index(
  {
    createdAt: 1
  },
  {
    expireAfterSeconds: 2592000
  }
);

Documents auto-delete after 30 days.

Great for:
- sessions
- logs
- OTPs
- temporary tasks

---

# 7. Partial Index

todoSchema.index(
  {
    archived: 1
  },
  {
    partialFilterExpression: {
      archived: true
    }
  }
);

Only indexes archived documents.

Smaller and faster.

---

# 8. Embedded Documents

subTasks are embedded:

subTasks: [
  {
    title,
    completed
  }
]

Good when:
- data belongs tightly together
- fetched together often

---

# 9. Aggregation Pipeline

In repository:

Todo.aggregate([
  {
    $group: {
      _id: "$priority",
      total: { $sum: 1 }
    }
  }
])

Equivalent SQL idea:
GROUP BY priority.

---

# 10. Repository Pattern

Repository layer isolates MongoDB logic.

Benefits:
- cleaner architecture
- testability
- easy DB replacement

---

# 11. Explain Query

In Mongo shell:

db.todos.find({
  userId: ObjectId("...")
}).explain("executionStats")

Shows:
- index usage
- scanned docs
- performance

Very important in interviews.

---

# Important MongoDB Interview Topics

- Difference between SQL and NoSQL
- Embedding vs referencing
- Sharding
- Replication
- CAP theorem
- Write concern
- Read concern
- Transactions
- Aggregation pipeline
- Compound indexes
- TTL indexes
- Partial indexes
- Sparse indexes
- Covered queries
- Index cardinality

---

# Suggested Practice

Try implementing:
- pagination
- transactions
- soft delete
- cursor pagination
- lookup aggregation
- redis caching
- optimistic locking
- sharding concepts

---

# Local Testing

Use:
- Postman
- MongoDB Compass
- Mongo shell

---

# Install Helpful Tools

MongoDB Compass:
GUI for MongoDB.

Postman:
API testing.

---

# Example Mongo Queries

Find completed todos:

db.todos.find({
  completed: true
})

Text search:

db.todos.find({
  $text: {
    $search: "aggregation"
  }
})

Sort:

db.todos.find().sort({
  dueDate: -1
})

Aggregation:

db.todos.aggregate([
  {
    $match: {
      completed: true
    }
  },
  {
    $group: {
      _id: "$priority",
      total: {
        $sum: 1
      }
    }
  }
])