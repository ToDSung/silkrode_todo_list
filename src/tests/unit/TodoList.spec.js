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
    const checkboxNodes = getAllByRole('checkbox')
    expect(checkboxNodes).toBeTruthy()
    expect(checkboxNodes[0]).not.toBeChecked()
    expect(checkboxNodes[1]).toBeChecked()

    await fireEvent.click(checkboxNodes[0])
    await fireEvent.click(checkboxNodes[1])

    expect(checkboxNodes[0]).toBeChecked()
    expect(checkboxNodes[1]).not.toBeChecked()
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
    const addBtnNode = getByText('Add')
    
    expect(textNode).toBeTruthy()
    expect(addBtnNode).toBeTruthy()

    await fireEvent.update(textNode, 'Todo test')
    expect(textNode.value).toBe('Todo test')
    
    await fireEvent.click(addBtnNode)
    expect(textNode.value).toBe('')

    const checkboxNodes = getAllByRole('checkbox')
    expect(checkboxNodes).toBeTruthy()
    expect(checkboxNodes[2]).not.toBeChecked()
  })

  it('delete todo successfully', async () => {
    const { getAllByRole } = render(TodoList)
    const deleteBtnNodes = getAllByRole('delete-btn')
    await fireEvent.click(deleteBtnNodes[0])

    const checkboxNodes = getAllByRole('checkbox')
    expect(checkboxNodes[1]).toBeFalsy()
    expect(checkboxNodes[0]).toBeChecked()

    const labelNode = getAllByRole('label')
    expect(labelNode[0]).toHaveTextContent('Exercise')
  })

  it('edit todo successfully', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(TodoList)
    const editBtnNodes = getAllByRole('toggle-edit-btn')
    await fireEvent.click(editBtnNodes[0])

    const textNode = getByRole('text-field')
    expect(textNode.value).toBe('Work')

    let modifyBtnNode = getByRole('modify-btn')
    let cancelBtnNode = getByRole('cancel-btn')
    let addBtnNode = queryByRole('add-btn')

    expect(modifyBtnNode).toBeTruthy()
    expect(cancelBtnNode).toBeTruthy()
    expect(addBtnNode).toBeFalsy()

    await fireEvent.update(textNode, 'Todo test')
    expect(textNode.value).toBe('Todo test')
    
    await fireEvent.click(modifyBtnNode)
    expect(textNode.value).toBe('')

    modifyBtnNode = queryByRole('modify-btn')
    cancelBtnNode = queryByRole('cancel-btn')
    addBtnNode = getByRole('add-btn')

    expect(modifyBtnNode).toBeFalsy()
    expect(cancelBtnNode).toBeFalsy()
    expect(addBtnNode).toBeTruthy()

    const labelNode = getAllByRole('label')
    expect(labelNode[0]).toHaveTextContent('Todo test')
  })
});