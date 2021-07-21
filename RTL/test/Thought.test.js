import React from 'react';
import { Thought } from '../Thought.js';
import {AddThoughtForm} from '../AddThoughtForm.js';
import {App} from '../App.js';
import { render, screen, waitFor, } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('Should have header text Passing Thoughts',() => {
  render(<App/>);
  const header = screen.getByText("Passing Thoughts")
expect(header).toHaveTextContent("Passing Thoughts")

});

test('Should have button enabled' , () => {
  render(<Thought 
  thought={{text:'Hello'}}
  removeThought={()=>{}}/>)
  const button = screen.getByRole("button")
expect(button).toBeEnabled();

});

test('"Oreos are delicious" should not appear' , () => {
    render(<App/>);
    const emptyThought  = screen.queryByText('Oreos are delicious');
    expect(emptyThought).toBeNull()
  });
  
  test('Should show new thought to be present' , async () => {
    render(<App/>);
  
    // The code below mimics a user posting a thought with text 'Oreos are delicious'
    const addThoughtInput = screen.getByRole('input');
    const addButton = screen.getByRole('submit')
    userEvent.type(addThoughtInput, 'Oreos are delicious');
    userEvent.click(addButton)
    const thought = await screen.findByText('Oreos are delicious');
    expect(thought).toBeInTheDocument();
  
  });


  test('Clicking the x button should remove a thought' , async () => {
    render(<App/>);
  
    // Since there are multiple '×' buttons, we are using the .getAllByText() method which returns an array. We are then extracting the first button from the array which belongs to the Thought with text 'This is a place for your passing thoughts.'
    const button = screen.getAllByText('×')[0]
    
   userEvent.click(button)
  
   // We grab the thought again. It should be null after we clicked the '×' button using userEvent.
    const removedThought = screen.queryByText('This is a place for your passing thoughts.')
    expect(removedThought).toBeNull()
  });
  
  test('Should add a new thought' , () => {
    render(<App/>);
    // Grab the text box and the submit button.
    const input = screen.getByRole('textbox');
    const submit = screen.getByText('Add');
    
    userEvent.type(input, 'Did I forget my keys?')
    userEvent.click(submit)
    // Assert that the thought appears
    const thought = screen.getByText('Did I forget my keys?');
    expect(thought).toBeInTheDocument();
  });

  
test('Should show Thought to be removed' , async () => {
    render(<App/>);
    const input = screen.getByRole('input');
    const submit = screen.getByRole('submit')
    userEvent.type(input, 'I have to call my mom.');
    userEvent.click(submit)
  
    await waitFor(
      ()=>{
    const thought = screen.queryByText('I have to call my mom.');
    expect(thought).toBeNull();
      }
    )
  });