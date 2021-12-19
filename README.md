# Real Estate Websites 
 Whether you’re buying, selling, or providing Evaluation Services, this website has something for you.
 if you want to sell any Property, you can subscribe to this website and start selling, 
 if you are looking for a home you would love to live in, you can discover Properties and take an appointment to see it, 
 if you are an architect, you can provide an evaluation service and get paid for it.

## Table of Contents
1. [ User Stories. ](#userStor)
2. [ Wireframes. ](#wireframe)
3. [ UML diagrm.](#frontUml)
4. [ Routes. ](#frontRoutes)

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

•	cancle appointment  <br/> As a user, I can cancel the appointment if it doesn't contain payment (Architect)

•	Add to interest list  <br/> As a user, I can add or remove the property to my interested in list

•	Chat   <br/>  As a user, I can contact anyone by direct message.


<a name="wireframe"></a>

## Wireframes
![Untitled Diagram drawio-13](https://user-images.githubusercontent.com/92247950/146522116-f57587f2-db24-46b7-a739-fa5f38c5f0c4.png)
---------
![Untitled Diagram drawio-14](https://user-images.githubusercontent.com/92247950/146522164-7b67576e-cf5c-4a87-ac9b-4c56fba73a55.png)
---------
![Untitled Diagram drawio-15](https://user-images.githubusercontent.com/92247950/146522179-adabc00b-de98-4d27-8004-9bbf470c0d6b.png)
---------
![Untitled Diagram drawio-21](https://user-images.githubusercontent.com/92247950/146522198-99ba3c7d-571a-4680-8b37-f43719a5326f.png)


<a name="frontUml"></a>

## UML diagrm
![Untitled Diagram drawio-22](https://user-images.githubusercontent.com/92247950/146522087-e67475d6-79ea-466d-b381-7e7f667fe023.png)




<a name="frontRoutes"></a>

## Routes
HTTP Method   | authorize     |    Path                                |  Request Body         
------------- | -----------   | ---------------------------            |---------------------- 
POST          | everyone      |`/user/create`                          |{email, username, name, password, phoneNumber, img, nationalId, role}
POST          | everyone      |`/user/log`                             |{email or username, password}     
GET           | everyone      |`/user/`                                |                       
GET           | everyone      |`/user/confirmation/:email/:token`      |                       
PUT           | everyone      |`/user/forgetPassword`                  |{email}     
PUT           | everyone      |`/user/resetPassword`                   |{resetLink, newPassword}  
GET           | everyone      |`/user/:_id"`                           |                       
POST          | everyone      |`/user/googlelogin`                     |{idToken} 
DELETE        | user          |`/user/`                                |
POST          | user          |`/user/newRate`                         |{user , rate} 
PUT           | user          |`/propety/`                             |{by, onPost}
GET           | user          |`/propety/:onPropety`                   |
POST          | user          |`/Property/create`                      |{title, by, onPost}
DELETE        | user          |`/Property/delete/:_id`                 |
GET           | user          |`/posts/userProperty/:postedBy`         |
POST          | user          |`/interested`                           |{id , userId}
GET           | user          |`/interested/:_id`                      |
DELETE        | user          |`/SUBSCRIBE/:_id`                       |
POST          | user          |`/SUBSCRIBE/update`                     |{userId}
POST          | user          |`/appointment`                          |{onProperty ، client ، serviceProvider ، type }
DELETE        | user          |`/appointment/:_id`                     |
GET           | user          |`/appointment/:id`                      |
POST          | user          |`/room`                                 |{ user, sendToUser }
POST          | user          |`/message`                              | {content , user , room}
GET           | user          |`/message/:id`                          |


