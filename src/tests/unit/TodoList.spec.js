import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import TodoList from '@/components/TodoList.vue'

describe('TodoList.vue', () => {
  it('renders title', () => {
    // mounted
    const { getByText } = render(TodoList)
    const titleNode = getByText('THINGS TODO')
    expect(titleNode).toBeTruthy()
    expect(titleNode.textContent).toContain('THINGS TODO ')
  })

  it('render input text', () => {
    const { getByPlaceholderText, getByRole } = render(TodoList)
    const textNode = getByPlaceholderText('Add Todo')
    const btnNode = getByRole('add-btn')
    expect(textNode).toBeTruthy()
    expect(btnNode).toBeTruthy()
  })

  it('renders checkbox clickable', async () => {
    const { getAllByRole } = render(TodoList)
    const checkboxNode = getAllByRole('checkbox')
    expect(checkboxNode).toBeTruthy()
    expect(checkboxNode[0]).not.toBeChecked()
    expect(checkboxNode[1]).toBeChecked()

    await fireEvent.click(checkboxNode[0])
    await fireEvent.click(checkboxNode[1])

    expect(checkboxNode[0]).toBeChecked()
    expect(checkboxNode[1]).not.toBeChecked()
  })

  it('add todo will alert while have no todo content', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { getByRole } = render(TodoList)
    const btnNode = getByRole('add-btn')
    await fireEvent.click(btnNode)
    expect(window.alert).toBeCalled();
  })

  it('add todo successfully', async () => {
    const { getByText, getByPlaceholderText, getAllByRole } = render(TodoList)
    const textNode = getByPlaceholderText('Add Todo')
    const btnNode = getByText('Add')
    
    expect(textNode).toBeTruthy()
    expect(btnNode).toBeTruthy()

    await fireEvent.update(textNode, 'Todo Jest')
    expect(textNode.value).toBe('Todo Jest')
    
    await fireEvent.click(btnNode)
    expect(textNode.value).toBe('')

    const checkboxNode = getAllByRole('checkbox')
    expect(checkboxNode).toBeTruthy()
    expect(checkboxNode[2]).not.toBeChecked()
  })

  it('delete todo successfully', async () => {
    const { getAllByRole } = render(TodoList)
    const btnNode = getAllByRole('delete-btn')
    await fireEvent.click(btnNode[0])

    const checkboxNode = getAllByRole('checkbox')
    expect(checkboxNode[1]).not.toBeTruthy()
    expect(checkboxNode[0]).toBeChecked()

    const labelNode = getAllByRole('label')
    expect(labelNode[0]).toHaveTextContent('Exercise')
  })
});