//done
Cookies are sent in headers to servers automatically on api call

Cookies and local storage serve different purposes. Cookies are primarily for 
reading server-side, local storage can only be read by the client-side. 
So the question is, in your app, who needs this data — the client or the server?

If it's your client (your JavaScript), then by all means switch.
You're wasting bandwidth by sending all the data in each HTTP header.

If it's your server, local storage isn't so useful because you'd have to
forward the data along somehow (with Ajax or hidden form fields or something). 
This might be okay if the server only needs a small subset of the total 
data for each request.

You'll want to leave your session cookie as a cookie either way though.

As per the technical difference, and also my understanding:

Apart from being an old way of saving data, 
Cookies give you a limit of 4096 bytes (4095, actually) — it's per cookie.
Local Storage is as big as 5MB per domain — SO Question also mentions it.

localStorage is an implementation of the Storage Interface.
It stores data with no expiration date, and gets cleared only through JavaScript,
or clearing the Browser Cache / Locally Stored Data — unlike cookie expiry.