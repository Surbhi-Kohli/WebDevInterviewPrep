How is the internet made available:
Telephone signals would be converted to internet via modem in earlier days.  

<img width="459" alt="Screenshot 2024-01-13 at 2 14 36 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/4c8bc917-e292-464d-9506-bee58d9a9e52">  

Now phone companies provide optical wires which dont need modem.

What happens when you type a URL in the browser and press enter?
https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a

1. You type maps.google.com into the address bar of your browser.
2. The browser checks the cache for a DNS record to find the corresponding IP address of maps.google.com.

DNS(Domain Name System) is a database that maintains the name of the website (URL) and the particular IP address it links to.
<img width="533" alt="Screenshot 2024-01-13 at 2 06 49 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/9c477d93-d735-4d01-9da8-ea281ad3f536">

Every single URL on the internet has a unique IP address assigned to it.
The IP address belongs to the computer which hosts the server of the website we are requesting to access.
For example, www.google.com has an IP address of 209.85.227.104. So if you’d like, you can reach www.google.com by typing http://209.85.227.104 on your browser. 
DNS is a list of URLs, and their IP addresses, like how a phone book is a list of names and their corresponding phone numbers.

The primary purpose of DNS is human-friendly navigation. You can easily access a website by typing the correct IP address for it on your browser,
but imagine having to remember different sets of numbers for all the sites we regularly access? Therefore, it is easier to remember the 
name of the website using a URL and let DNS do the work for us by mapping it to the correct IP.
To find the DNS record, the browser checks four caches in the order: Browser Cache->Operating Systems Cache->Router Cache->ISP Cache.

● First, it checks the browser cache. The browser maintains a repository of DNS records for a fixed duration for websites you have previously visited. So, it is the first place to run a DNS query. It also checks in service worker.Service worker also has a cache.
https://dev.to/pahanperera/service-worker-caching-strategies-1dib

● Second, the browser checks the OS cache. If it is not in the browser cache, the browser will make a system call (i.e., gethostname on Windows) to your underlying computer OS to fetch the record since the OS also maintains a cache of DNS records.  If u update the hostfile(which has mappings)

● Third, it checks the router cache. If it’s not on your computer, the browser will communicate with the router that maintains its’ own cache of DNS records.  

● Fourth, it checks the ISP cache. If all steps fail, the browser will move on to the ISP. Your ISP maintains its’ own DNS server, which includes a cache of DNS records, which the browser would check with the last hope of finding your requested URL.

You may wonder why there are so many caches maintained at so many levels. 
Although our information being cached somewhere doesn’t make us feel very comfortable when it comes to privacy, 
caches are essential for regulating network traffic and improving data transfer times.

3. If the requested URL is not in the cache, ISP’s DNS server initiates a DNS query to find the IP address of
the server that hosts maps.google.com.As mentioned earlier, for my computer to connect with the server that hosts maps.google.com,
I need the IP address of maps.google.com. The purpose of a DNS query is to search multiple DNS servers on the internet until
it finds the correct IP address for the website. **This type of search is called a recursive search since the search 
will repeatedly continue from a DNS server to a DNS server until it either finds the IP address we need or returns an error 
response saying it was unable to find it.**

In this situation, we would call the **ISP’s DNS server a DNS recursor whose responsibility is to find the proper
IP address of the intended domain name by asking other DNS servers on the internet for an answer. 
The other DNS servers are called name servers since they perform a DNS search based on the domain
architecture of the website domain name.**
<img width="474" alt="Screenshot 2024-01-13 at 2 17 15 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/0e3fb36d-4642-45ad-a3e1-25e409c1dabd">  

Domain name description:
<img width="466" alt="Screenshot 2024-01-13 at 2 36 12 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/7f63f388-80b6-4a98-b057-ddc76b531f62">
Each part of domain can help dig deeper in server, on where to go

4. The browser initiates a TCP connection with the server.
Once the browser receives the correct IP address, it will build a connection with the server that matches 
the IP address to transfer information. Browsers use internet protocols to build such connections. There 
are several different internet protocols that can be used, but TCP is the most common protocol
used for many types of HTTP requests.

To transfer data packets between your computer(client) and the server, it is important to have a TCP connection established. 
This connection is established using a process called the TCP/IP three-way handshake. 
This is a three-step process where the client and the server exchange SYN(synchronize) and ACK(acknowledge) messages to establish a connection.

<img width="622" alt="Screenshot 2024-01-19 at 9 58 54 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/215ec0ee-2d7e-484a-afc9-85b7c431d6a5">


1. The client machine sends a SYN packet to the server over the internet, asking if it is open for new connections.
2. If the server has open ports that can accept and initiate new connections, it’ll respond with an ACKnowledgment of the SYN packet using a SYN/ACK packet.
3. The client will receive the SYN/ACK packet from the server and will acknowledge it by sending an ACK packet.
Then a TCP connection is established for data transmission!

4. The browser sends an HTTP request to the webserver.
Once the TCP connection is established, it is time to start transferring data! The browser will send a GET request asking for maps.google.com web page.
If you’re entering credentials or submitting a form, this could be a POST request. This request will also contain additional information such as browser
identification (User-Agent header), types of requests that it will accept (Accept header), and connection headers asking it to keep the TCP connection
alive for additional requests. It will also pass information taken from cookies the browser has in store for this domain
5. The server handles the request and sends back a response.
The server contains a webserver (i.e., Apache, IIS) that receives the request from the browser and passes it to a request handler to read and 
generate a response. The request handler is a program (written in ASP.NET, PHP, Ruby, etc.) that reads the request, its’ headers, and cookies 
to check what is being requested and also update the information on the server if needed. Then it will assemble a response in a particular format (JSON, XML, HTML).
6. The server sends out an HTTP response.
The server response contains the web page you requested as well as the status code, compression type (Content-Encoding), how to cache the page 
(Cache-Control), any cookies to set, privacy information, etc.

7. The browser displays the HTML content (for HTML responses, which is the most common).
The browser displays the HTML content in phases. First, it will render the bare bone HTML skeleton. Then it will check the HTML tags and send out 
GET requests for additional elements on the web page, such as images, CSS stylesheets, JavaScript files, etc. These static files are cached by the 
browser, so it doesn’t have to fetch them again the next time you visit the page. In the end, you’ll see maps.google.com appearing on your browser.
That’s it!

<img width="727" alt="Screenshot 2024-01-19 at 10 03 03 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/65fea09e-2586-4adc-941f-f8bac0e919d4">

For https connections, there is an extra step of SSL handshake that occurs after TCP handshake for certificate handshake.
Here notice in the image, we get data in chunks of 14kb, then 28kb and then  56kb.
The first response should have smaller data , so that it renders quickly and percieved page performance is good.
## SSL 
<img width="667" alt="Screenshot 2024-01-19 at 10 09 36 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/02c3dda4-2b3b-4c73-afc5-8ddbe97d46a9">


Data Centers:Contain multiple servers

ISP details:
<img width="686" alt="Screenshot 2024-01-13 at 3 19 33 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/32e1fdea-188b-42cb-bb3a-0ab91fdd4f86">
Local ISP: Local distributors.They connect neighborhoods.Ie in case request is for a nearby place
Regional ISP: Like jio, airtel.They connect cities in a country
If anything has to be blocked to a region, the regional ISPs can be governed by central authorities.

Global ISP: Global organizations govern these ISP, which decide  how and what kind of info can be transmitted to other Global ISPs or the world.
Fiber optics help to transmit data approximately at the speed of light.
<img width="692" alt="Screenshot 2024-01-13 at 3 29 26 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/9e12213c-fe58-4d71-b94a-fd058466f1ad">

** How does data flow:Data is transmitted in packets **

## Advanced flow
The browser and service wroker maintain a data cache.
The service worker in the browser maintains a cached version of a website.when we reload a website, we might find a request with 304 status , meaning that nothing has changed and so the existing data that the service worker has , can be used.
And hence all the subsequent requests are catered by service worker in very short span of time.
<img width="631" alt="Screenshot 2024-01-19 at 6 04 50 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/412b389d-58e4-4d86-aca9-6d211cd92bc8">
An app can make max 6 to 8 parallel network requests.Any request beyond that is queued.

ISP Functionality :
ISPs are not just internet providers and proxy to get u IP addresss and make request.Some functionalities of ISP
1. Peering(To reduce the number of hops)
   In case of inter-county communication, there are several  hops involved,which may result in loss of data packet or increased transfer time.
<img width="854" alt="Screenshot 2024-01-19 at 6 25 54 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/0c147c31-2d08-4ac4-a96c-8751e6457d79">
Companies like google maintain data-centers so that you dont have to make a cross-country or cross-region request.Now these data centers can bypass the regional isp and directly connect with local ISP and work as a proxy to reach to ur system.

2.Netflix uses Regional ISPs as hosting platform where , it hosts data  and users can stream from there directly.Such optimizations are done by companies by storing data at local ISPs or regional ISPs

Company named ICANN manages IPs and domains.

WHOIS: u can get detailed info about the company who owns the domain name.This also provides privacy wherein some info of domain owner can be saved from being in public



 The whois system contains records that provide information about the ownership of domains and the owners themselves. The Internet Corporation for Assigned Names and Numbers (ICANN) regulates domain name registration and ownership, but the records are held by different companies known as registries.
 A whois record includes contact information for the registrant (owner) and the registrar (organization that registered the domain name), as well as the registration date, last update, and expiration date.

With the Linux whois command, you can perform lookups directly from the command line, which is useful for systems without a graphical user interface or for shell scripts. The command can be installed on Ubuntu, Fedora, and Manjaro using specific commands provided.

https://github.com/Surbhi-Kohli/WebDevInterviewPrep/blob/main/html/Critical-rendering-path.md
