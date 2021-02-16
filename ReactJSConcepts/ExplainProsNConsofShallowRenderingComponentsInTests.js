/*Positives:

It is faster to shallow render a component than to fully render it. When a React project contains a large number of components, this performance
difference can have a significant impact on the total time taken for unit tests to execute.
Shallow rendering prevents testing outside the boundaries of the component being tested—a best practice of unit testing.
Negatives:

Shallow rendering is less similar to real-world usage of a component as part of an application, so it may not catch certain problems. Take the example 
of a <House /> component that renders a <LivingRoom /> component. Within a real application, 
if the <LivingRoom /> component is broken and throws an error,
then <House /> would fail to render. However, if the unit tests of <House /> only use shallow rendering,
then this issue will not be identified unless <LivingRoom /> is also covered with unit tests.
*/
