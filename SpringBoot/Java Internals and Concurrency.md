⏰ Block 1 — Java Internals (2 hrs)
Study
- HashMap internals 
- ConcurrentHashMap internals
- equals + hashCode contract
- Generics + type erasure
- JVM memory model

Block 2 — Concurrency Core (2 hrs)
Study
- Thread lifecycle
- ExecutorService
- Future vs CompletableFuture
- synchronized vs ReentrantLock
- volatile keyword
- Atomic classes

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
- 
## What were the issues without generics in Java?
- Type safety
- Manual Casting
- No compile time checking
```
int[] arr = new int[5];
ArrayList arr = new Arraylist();
arr.put("hello");
arr.put(1);
String val = (String) arr.get(0); //this does not throw issues at compile time, but exception occurs at runtime, since we are casting incorrectly --> int is getting casted to string
```

This is why without generics, things are not type-safe, also, due to manual casting, it gives errors not at compile time, but at run time.


#### Generics:
- We restrict the type of data that can be stored in the ArrayList or any other data structure for that matter.
- As a result, we make things "TYPE-SAFE". So we add **"Compile-time Type safety"**
- No unexpected runtime exceptions, since we clearly mention what type of data can be stored in the data structure.
```
ArrayList<String> arr = new ArrayList<>();
```

- Now we add strings, and we expect strings out of this array very clearly...no confusion about what it can store. 
- And if we try to store wrong data type, it shows errors at the Compile-time itself.

**👉 Generics = Compile-time safety; 👉 Type Erasure = Runtime simplicity**

**- Generics Behind the scenes:**
- Whatever type we specify in using Generics is used only at compile-time for Type-safety. After compilation, in the byte code, there is nothing like Generics. Genrics get erased, and **simple type casting is visible in the byte code.**

```
ArrayList<String> arr = new ArrayList<>();
```

Becomes: ArrayList arr = new ArrayList();
```
Box <String> box = new Box<>();
String value = box.getBox();
```
#### after compilation, in the byte code, this is how the type caste happens and the generics are all erased:
```
Box box = new Box();
String value = (String) box.getBox(); 
```
## Volatile Vs Atomic in Java
- volatile keyword ensures variable updates are visible across threads and prevents instruction reordering, but it does not provide atomic operations.
- So, if one thread writes to a variable, and the other reads the same, it is very much possible due to caching that the thread t2 maintains its local copy of the variable...and never gets to know the updated value of the variable. Hence, we can make the variable "volatile" to make sure its value is always taken from the main memory rather than from the cached memory.
- But the problem is that this does not ensure atomicity. So, when two threads write to this volatile variable, it does not ensure atomicity...since no locking is being maintained.
