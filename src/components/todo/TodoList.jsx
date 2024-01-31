import axios from "axios";
import React, { useEffect, useState } from "react";

const url =
	"https://elchocrud.pro/api/v1/11b5cc7007ef79c9c641732fe9754b30/todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState({ title: "", image: "", dese: "" });
	const [editingId, setEditingId] = useState(null);
	const [editingTodo, setEditingTodo] = useState({
		title: "",
		image: "",
		dese: "",
	});

	const handleAdd = async () => {
		const response = await axios.post(url, newTodo);
		setTodos(response.data);
		setNewTodo({ title: "", image: "", dese: "" });
	};

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodos(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setTodos(response.data);
	};

	const startEditing = (id) => {
		setEditingId(id);
		const editingTodo = todos.find((todo) => todo._id === id);
		setEditingTodo({ ...editingTodo });
	};

	const updateTodo = async (id, updatedData) => {
		await axios.put(`${url}/${id}`, updatedData);
		setEditingId(null);
		getTodos();
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<h1>TodoList</h1>
			<input
				type="text"
				placeholder="title"
				value={newTodo.title}
				onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
			/>
			<input
				type="text"
				placeholder="img"
				value={newTodo.image}
				onChange={(e) => setNewTodo({ ...newTodo, image: e.target.value })}
			/>
			<input
				type="text"
				placeholder="title"
				value={newTodo.dese}
				onChange={(e) => setNewTodo({ ...newTodo, dese: e.target.value })}
			/>

			<button onClick={handleAdd}>Add</button>

			{todos.map((item) => (
				<div key={item._id}>
					{editingId === item._id ? (
						<div>
							<input
								type="text"
								value={editingTodo.title}
								onChange={(e) =>
									setEditingTodo({ ...editingTodo, title: e.target.value })
								}
							/>
							<input
								type="text"
								value={editingTodo.image}
								onChange={(e) =>
									setEditingTodo({ ...editingTodo, image: e.target.value })
								}
							/>
							<input
								type="text"
								value={editingTodo.dese}
								onChange={(e) =>
									setEditingTodo({ ...editingTodo, dese: e.target.value })
								}
							/>
							<button onClick={() => updateTodo(item._id, editingTodo)}>
								Update
							</button>
						</div>
					) : (
						<div>
							<h1>{item.title}</h1>
							<img src={item.image} alt={item.title} />
							<p>{item.dese}</p>
							<button onClick={() => startEditing(item._id)}>Edit</button>
							<button onClick={() => deleteTodo(item._id)}>Delete</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoList;
