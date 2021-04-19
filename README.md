

* How long you spent on the assignment.
I spent ~18hrs on this project
  6hrs Saturday
    -set up environment
    -mostly doing research
    -made basic skeleton of the MVVM architecture
  8hrs Sunday
    -fleshed out the read-only version of the timeline
  4hrs Monday
    -added inline editing of name
    -documented 

* What you like about your implementation.
  I like how flexible the implementation handles various window sizes. That way you can plug in the <TimelineViewModel> object into various sizes of containers. It should render fine in landscape or portrait mode. 
  The code follows a standard MVVM architecture with the ViewModels controlling the logic and the Views acting as pure functions to render the the elements. I like how each of the timeline items have affordances for the user to interact with the timeline item. Every item element is dual purpose in that it presents information to the user, while inviting the user to make changes by interacting with each element. 

* What you would change if you were going to do it again.
  I would just use the standard Date object instead of trying to implement my own. I wanted to get to dates before 1970, but it was probably outside the scope of this project. I would have normally would have asked someone about the scope, but I was working on this over the weekend and didn't want to bother anyone. 
  I would have also used various libraries that would have done the job for me. 

  There are loads of things that I wanted to get accomplished, but I ran out of time to do:
  -make a minimum window size so that the elements don't get bunched up when the window is too small
  -show the date when the user hovers over the handle
  -the ability to drag the handles the change the values
  -scaling the axis when the values when the values get too large or small
  

* How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
  Timeline inspiration:
  Joseph Priestley, Specimen of a New Chart of Biography (1765)
  https://morphocode.com/the-representation-of-time-in-information-design/
  I flipped through this page and setted on the new chart of biography to model my implementation.

  I was trying to take the paper timeline and add design elements that allow the user to interact with the components that make up the timeline element. e.g. the start and end bars and the text are all elements that the user can interact with. I didn't end up finishing,

* How you would test this if you had more time.
  I would write test cases for the ViewModel componenets to test their logic. Just making sure that the greedySorting algorithm, leap year shenanigans, grid calculations works as expected. 
  Testing out visual presentation of elements in a variety of windows. There can be weird behavior when the window sizes get too small
  I would test the presentation on a variety of browsers and devices to ensure consistency across platforms. 
