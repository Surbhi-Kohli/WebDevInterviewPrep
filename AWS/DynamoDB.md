## What is AWS DynamoDB?
- Amazon DynamoDB is a serverless, NoSQL, fully managed database with single-digit millisecond performance at any scale.
- NO joins used here like relational DB
- Has 0 maintenance downtime.
- DynamoDB supports both key-value and document data models.

## Serverless:
  - With DynamoDB, you don't need to provision any servers, or patch, manage, install, maintain, or operate any software. 
- A table has a set of items. Each item is a set of attruibutes. Each item must be uniquely identifiable.
- DynamoDB supports two different kinds of primary keys:
  1. Partition key – A simple primary key, composed of one attribute known as the partition key.
  2. Partition key and sort key – Referred to as a Composite primary key, this type of key is composed of two attributes. The first attribute is the partition key(hash attribute), and the second attribute is the sort key(range attribute).
    - In a table that has a partition key and a sort key, it's possible for multiple items to have the same partition key value. However, those items must have different sort key values.
## Benefits:
- NoSQL:
  - DynamoDB supports both key-value and document data models.
  - Unlike relational databases, DynamoDB doesn't support a JOIN operator
    
- DynamoDB was purpose-built to improve upon the performance and scalability of relational databases to deliver single-digit millisecond performance at any scale.

## Secondary Indexes in DynamoDB:
- You can create one or more secondary indexes on a table. A secondary index lets you query the data in the table using an alternate key, in addition to queries against the primary key
