# My Tech Test Phorest

## Table of Contents
1. [**Problem description**](#problem-description)
2. [**Acceptance Criteria**](#acceptance-criteria)
  - [**For step 1**](#for-step-1)
  - [**For step 2**](#for-step-2)
  - [**Bonus Points**](#bonus-points)
3. [**Connecting to our API**](#connecting-to-our-api)

## Problem Description
Phorest has a platform for our customers to build their own applications on.

You are tasked with building an interface to our platform. UI (web or app) or CLI application.

The test is split into two parts. First is search for clients and the second is creating vouchers. Do
your best and see how far you get without stressing yourself too much.

Our API documentation can be found [here](https://api-gateway-dev.phorest.com/third-party-api-server/swagger-ui.html) . It’s a REST API and uses JSON. Please get in touch if
you have troubles making requests to the API.
here

We are looking for a web application, native app or command line interface - to our API.


## Acceptance Criteria

### For Step 1
You should be able to handle when there are many of the same clients returned (with the same
number or email). So if there are two clients returned for the same phone number, display both.

### For Step 2
The UI should let you input the amount you want to create the voucher for, and then display the
voucher has been created successfully.

This is about solving the problem, we have seen people use Vanilla javascript, React, iOS, Android,
Vue and others. You should look to use libraries and frameworks to do the heavy lifting if you are
comfortable with them, but use the tools you best know and can work with.

### Bonus Points
- Automated tests
- Nice UI
- Clean code
- Deploy code / give instructions on how to set up environments
