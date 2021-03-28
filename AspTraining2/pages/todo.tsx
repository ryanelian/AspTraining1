import React from "react";
import { Layout } from './shared/Layout';

interface TodoListItem {
    name: string;
    checked: boolean;
}

/**
 * Function Component
 * @param props 
 * @returns 
 */
const TodoItem: React.FunctionComponent<{
    item: TodoListItem;
    onRemoveButtonClick?: (item: TodoListItem) => void;
}> = (props) => {
    const onClick = () => {
        if (props.onRemoveButtonClick) {
            props.onRemoveButtonClick(props.item);
        }
    };

    return (
        <div>
            <button type="button" onClick={onClick}>Remove</button>
            {props.item.name}
        </div>
    )
};

const TodoList: React.FunctionComponent<{
    list: TodoListItem[];
    onChange?: (newList: TodoListItem[]) => void;
}> = (props) => {
    const onRemoveButtonClicked = (item: TodoListItem) => {
        const index = props.list.findIndex(Q => Q === item);
        props.list.splice(index, 1);
        if (props.onChange) {
            props.onChange(props.list);
        }
    };
    const listItems = props.list.map(Q => <TodoItem item={Q} onRemoveButtonClick={onRemoveButtonClicked}></TodoItem>);
    return <div>{listItems}</div>;
}

interface TodoState {
    inputText: string;
    todoList: TodoListItem[];
};

/**
 * Class Component
 */
class Todo extends React.Component<{}, TodoState>{
    onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputText: e.target.value
        });
    };

    onAddButtonClicked = () => {
        const todoList = this.state.todoList;
        todoList.push({
            name: this.state.inputText,
            checked: false
        });
        this.setState({
            inputText: '',
            todoList: todoList
        });
    };

    onListChanged = (newList: TodoListItem[]) => {
        this.setState({
            todoList: newList
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            inputText: '',
            todoList: []
        };
    }

    render() {
        return (
            <div>
                <div>
                    <input value={this.state.inputText} onChange={this.onInputChanged}></input>
                    <button type="button" onClick={this.onAddButtonClicked}>Add</button>
                </div>
                <TodoList list={this.state.todoList} onChange={this.onListChanged}></TodoList>
            </div>
        );
    }
}

export default function TodoPage() {
    return (
        <Layout title="To-Do List">
            <Todo></Todo>
        </Layout>
    );
}
