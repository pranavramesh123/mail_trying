# Gogol-Mail
The task was to create an online mail-sevice that allows users to create their own mailbox and correspond with each other.
This project should have been realized at AngularJs and NodeJs + connected to MySQL database, all frontend and backend parts of site
i wrote by myself. I started to develop this project from design and animation of modal windows that contains authorization, 
registration and mail forms of users. Next step was to choose the way mail-function worked at. I chose NodeFS because it is simple and 
fast method of recording and reading information of users letters. Disadvantage of the method was on low level of information security 
and impossibility of mailing to other mail-service. Next step was creating database that contains information of users, 
accession to it and also creating sms-verification of registration new user. Sms verification based on Twilio module for NodeJs, 
that allows to generate and send sms to phone numbers. At present time all functions of my mail service are ready for usage, now
im working at design improvment, adaptivity and security of user mails and personal information.

2.11.17 Added practile animations to main window via Practile.js. Animations are stable(40-60fps).
7.11.17 Created CSS3 preloader and added to a site
30.11.17 Updated CSS3: added vendor prefixes that allows to normally use it in Opera/FireFox/Safari
