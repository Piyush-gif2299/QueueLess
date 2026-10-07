# QueueLess

## Smart Crowd and Waiting-Time Management

QueueLess is a digital queue management system
that reduces physical waiting and crowding.

## Main Features

1. Digital Token
2. Waiting-Time Estimation
3. Crowd Status
4. Alerts
5. Virtual Queue
6. Admin Dashboard
7. Next Customer
8. Queue Management

## Solutions

### Hospital

Patient registration and doctor consultation queues.

### Banks

Customer service, cash counter and account service queues.

### Government Offices

Certificate, application and document service queues.

### Businesses

Customer support, repair centres and service counters.

## Technologies

HTML
CSS
JavaScript
LocalStorage

## Token System

Tokens are automatically generated:

#1
#2
#3
#4
#5

Every new customer receives the next available token number.

## Waiting Time

The prototype uses an average service time
of 5 minutes per waiting customer.

Example:

5 waiting customers × 5 minutes
= 25 minutes estimated waiting time.

## Crowd Status

0-4 = Low

5-9 = Medium

10+ = High

## How To Run

1. Open the QueueLess folder in VS Code.
2. Install Live Server.
3. Open index.html.
4. Click Go Live.
5. Click Get Token.
6. Enter name.
7. Select service.
8. Click Get Digital Token.
9. Open Admin Dashboard.
10. Click Next Customer.

## Project Structure

QueueLess/
|
|-- index.html
|-- login.html
|-- user.html
|-- admin.html
|-- style.css
|-- script.js
|-- admin.js
|-- database.js
|-- README.md