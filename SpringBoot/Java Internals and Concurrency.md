
## Explain null key and null value insertion in HashMap.
- HashMap allows one null key because keys must be unique, but allows multiple null values because values can be duplicated. 
- Null key is stored in bucket 0 using special handling to avoid hashCode() calls.Internal Working (Simplified)

Normally HashMap does:
```
hash = key.hashCode()
index = hash % bucket_size
```
But for null key:
```
if (key == null)
    store in bucket[0]
```
Why?
- Calling null.hashCode() → ❌ NullPointerException
- So HashMap skips hashing and stores it in a fixed bucket.

#### One Null Key Only
```
map.put(null, "First Null Key Value");
map.put(null, "Second Null Key Value");
```

- Second insert replaces the first.
- Because HashMap treats null as a single unique key.

#### Multiple Null Values Allowed
```
map.put("A", null);
map.put("B", null);
```

- Different keys can map to null values.
- No restriction.

#### HashMap allows one null key and multiple null values, whereas Hashtable allows neither.Why?
- Hashtable disallows nulls to avoid ambiguity during concurrent access and to maintain thread safety guarantees. HashTable is thread safe HashMap. No synchronizaftion needed.

#### What if there was already a non-null key value at 0th bucket, and then I try inserting a null key?
- If bucket 0 already has entries (from hash collisions), inserting a null key will not overwrite them.
- Instead, HashMap will add the null-key entry in the same bucket using chaining (linked list / tree).

## Why Hashtable Does NOT Allow Nulls (Important Interview Logic)

- Hashtable is synchronized (thread-safe by default).
- If null values were allowed, this would become ambiguous:
```
if (table.get("A") == null) {
   // Is key absent?
   // OR key exists but value is null?
}
```
#### In multi-threading:
- Another thread might remove key. So it is hard to differentiate states safely
- So designers completely disallowed nulls.

## What happens when we do a put() in ConcurrentHashMap?
- Calculates hash, finds the bucket in which the element is to be inserted, tries lock-free insert using CAS. If collision, then locks the bucket, since we need to deal with a LinkedList.
- Insert/Update the node --> Handle Tree conversion if linked list goes too long. Also handle resizing and

- PseudoCode:
```
put(key, value):

 if key or value null → exception

 hash = spread(hashCode)

 loop:
   if table not initialized → init via CAS

   bucket = table[index]

   if bucket empty:
        try CAS insert
        if success → break
        else retry

   else if resizing in progress:
        help resize

   else:
        synchronize bucket
           if key exists → update value
           else → insert node
        break

 update count
 check resize
```
#### Extremely Important Interview Insight:
ConcurrentHashMap is NOT fully lock-free.
It is:
👉 Lock-free for reads
👉 Partially lock-free for writes
👉 Fine-grained locked for collisions

## Why Must We Override Both equals() and hasCode()?

- If you override only equals():
- Default Object.hashCode() may give different values
- Equal objects go to different buckets
- HashMap / HashSet behaves incorrectly
