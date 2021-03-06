# Real Estate Website 
 Whether you’re buying, selling, or providing Evaluation Services, this website has something for you.
 if you want to sell any Property, you can subscribe to this website and start selling, 
 if you are looking for a home you would love to live in, you can discover Properties and take an appointment to see it, 
 if you are an architect, you can provide an evaluation service and get paid for it.

## Table of Contents
1. [ User Stories. ](#userStor)
2. [ Wireframes. ](#wireframe)
3. [ UML diagrm.](#frontUml)
4. [ Components.](#comp)
6. [ Routes. ](#frontRoutes)
7. [ Installation. ](#installation)
8. [ Dependencies. ](#dep)
9. [ Additional information. ](#slid)



<a name="userStor"></a>
## User Stories
•	View property and search <br/> As an anon, I can display property and search (with price range)

•	Signup  <br/> As an anon, I can sign up and verificate my account so that I can start buying or selling or providing an evaluation service

•	Sign in with google  <br/> As an anon, I can sign in with google and my account will be active immediately

•	Login  <br/> As a user, I can log in to the platform so that I can see my appointment or payment or subscribe  <br/>
(seller > subscribe + appointment) - (buyer > appointment) - (service provider > my payment + appointment)

•   Forget password  <br/>
As a user, I can reset my password by sending a code to my email 

•	Edit User  <br/>  As a user, I can edit my profile

•	Delete User  <br/>  As a user, I can delete my account

•	Logout  <br/>  As a user, I can logout from the platform so no one else can use it

•	Provide an evaluation service <br/> As an architect, I can provide an evaluation service to any property in my city and get paid

•	Take an appointment  <br/> As a buyer user, I can schedule a tour of any house and choose if I want a service provider or not, if I choose a service provider, I should pay before the appointment schedule, otherwise, the appointment will be scheduled immediately. 

•	Rate  <br/> As a buyer user, I can rate the seller and service provider if the appointment done 

•	Subscribe  <br/> As a seller user, I have to subscribe before start selling and I can cancel my subscription any time I want.

•	Sale  <br/> As a seller user, I can post, edit, and delete any houses for sale and arrange tour dates

•	Edit appointment  <br/> As a seller user, I can edit on the appointment if it's done or not 

•	cancle ap
pointment  <br/> As a user, I can cancel the appointment if it doesn't contain payment (Architect)

•	Add to interest list  <br/> As a user, I can add or remove the property to my interested in list

•	Chat   <br/>  As a user, I can contact anyone by direct message.


<a name="wireframe"></a>

## Wireframes
![Untitled Diagram drawio-13](https://user-images.githubusercontent.com/92247950/146522116-f57587f2-db24-46b7-a739-fa5f38c5f0c4.png)
---------
![Untitled Diagram-page2 drawio](https://user-images.githubusercontent.com/92247950/146673328-5edd55ab-b383-49d7-a920-aca52c5a2a32.png)
---------
![Untitled Diagram drawio-15](https://user-images.githubusercontent.com/92247950/146522179-adabc00b-de98-4d27-8004-9bbf470c0d6b.png)
---------
![Untitled Diagram drawio-21](https://user-images.githubusercontent.com/92247950/146522198-99ba3c7d-571a-4680-8b37-f43719a5326f.png)


<a name="frontUml"></a>

## UML diagrm
![Untitled Diagram drawio-27](https://user-images.githubusercontent.com/92247950/146678397-e7f4a24e-40e1-484d-b504-239132bc8d6e.png)


<a name="comp"></a>

## Components
- Home
- oneProperty
- Apponitment
- Providers
- oneProvider
- Profile
- Chat
- Interset list
- Log in 
- Sign up 
- Forget password
- Reset password


<a name="frontRoutes"></a>

## Routes
Component     |     Path               |  Permissions
------------- | ---------------        | ------------
Login         | `/`                    | Guest
SignUp        | `/signup`              | Guest
Forget        | `/forgetPassword`      | Guest
Reset         | `/resetPassword`       | Guest
Home          | `/home`                | Guest 
oneProperty   | `/home/oneProperty/:id`| Guest 
Profile       | `/profile`             | Guest
oneProvider   | `/profile/:id`         | Guest 
Providers     | `/usres`               | Guest
Apponitment   | `/Apponitment`         | User
Chat          | `/profile/:room`       | User
Interset list | `/profile/:room`       | User



<a name="installation"></a>

## Installation
- Clone this folder locally
- Install all packages using `npm install` command
- Run `npm run dev` in your command line

<a name="dep"></a>

## dependencies
- axios
- firebase
- react-dotenv
- react-redux
- socket.io-client
- react-google-login
- react-icons

<a name="slid"></a>


## for more information
- [ Frontend Deployed Link. ](https://perfectview.netlify.app)
- [ Backend Deployed Link. ](https://backend-perfect.herokuapp.com)
- [ Backend Repo ](https://github.com/MP-Project-Dorrah/server)




