1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
    Ans: getElementById selects one element by id, getElementByClassName selects multiple live 
         elements by class name, and querySelector / querySelectorAll select the first or all 
         elements using CSS selectors.

2. How do you create and insert a new element into the DOM?
    Ans: To create and insert a new element, I use document.createElement() to make and then
         insert it into the DOM with append() or appendChild().

3. What is Event Bubbling? And how does it work?
    Ans: Event Bubbling is a process where an event starts from the target element and then moves
         upward through its parent elements.

4. What is Event Delegation in JavaScript? Why is it useful?
    Ans: Event Delegation means adding a single event listener to a parent element to handle events 
         for its child elements, which improves performance and works with dynamic elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
    Ans: preventDefault() stop the browser's default action, while stopPropagation() stop the event 
         from bubbling up to parent elements.