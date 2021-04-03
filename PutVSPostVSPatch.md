
## POST:

The POST verb is mostly utilized to create new resources. In particular, it's used to create subordinate resources. 
That is, subordinate to some other (e.g. parent) resource.
On successful creation, return HTTP status 201, returning a Location header with a link to the newly-created resource with the 201 HTTP status.

 ## PUT:

PUT is most-often utilized for update capabilities, PUT-ing to a known resource URI with the request body containing the 
newly-updated representation of the original resource.Although it can also be used for creation of new resource.

## Patch:
Update part of data

##  Put vs Post:

PUT is used to send data to a server to create/update a resource.
The difference between POST and PUT is that PUT requests are idempotent. That is, calling the same PUT request multiple times will always produce the same result. 
In contrast, calling a POST request repeatedly have side effects of creating the same resource multiple times.
