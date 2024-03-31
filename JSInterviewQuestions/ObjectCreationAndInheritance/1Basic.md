
Classes, Prototypes-Object Oriented JS
-An enormously popular paradigm for structuring complex code
-Prototype chain- Feature behind the scenes that enables emulation of OOP .


Core of development
1.Save data(eg in a quiz game, the score of user1 and user2)
2.Run code(functions) using that data (eg increase user2's score)
Then why is development hard??
Reasons:
In a quiz game, I need to save lots of users, but also admins, quiz questions, quiz outcomes,
league tables- all have data and associated functionality

In 1000,000 lines of code
-Where is the specific functionality when I need it(eg , you want to update score of 
a user but where is the functionality)
-How to ensure that the functionality is only used on. the right
data(eg you dont want to use the functionality related to updating
images on league tables)

For finding the right functionlaity and making sure it applies to right bits ,we need some organizing structure.

Key feature I want in my code
1.Easy to reason about
2.Easy to add new features (new functions)
3.Efficient and performant
The OOP paradigm aims to let us achieve these goals

Use objects and store ur data and functionality  in one place
