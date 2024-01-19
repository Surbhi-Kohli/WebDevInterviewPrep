<img width="834" alt="Screenshot 2024-01-19 at 11 44 22 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/eac5ca79-8a93-46d8-a48a-8e9c67872c00">
HTTP:A protocol(set of rules for communication over web)
For every new request, a new TCP connection is formed in HTTP.

<img width="758" alt="Screenshot 2024-01-19 at 11 49 40 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/93cca9b7-c699-411f-9858-011e5214f0cc">
TCP: 3 handshakes
1. SYN
2.SYN + ACK( server gives a number)
3.ACK
TCP ensures that packets are not lost during transmission from client to server.TCP sends data in packets and wants to ensure that if a packet is not received , then it resends it.

UDP:Fastest transmission , packet transmission is not guaranteed.They may get lost on the way
HTTP3: used by google, uses UDP
It establishes a UDP connection .It does header compression.It has better network congestion handling.

HTTPS:Other than TCP handshake , it also does SSL/TLS connection

Websocket: Live chat
Uses HTTP Upgrade: 1st it establises an HTTP connection.Then upgrade that to websocket.

SMTP:for emails
FTP: for file transfer
