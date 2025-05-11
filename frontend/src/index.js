import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const API_BASE_URL = "http://localhost:8000/api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '' });
  const [search, setSearch] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', additional_data: {} });
  const [customFields, setCustomFields] = useState([]);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({ name: '', email: '' });

  // Fetch tasks from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks/`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Fetch personal info from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/personal-info/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setPersonalInfo(data[0]); // Assuming only one personal info record
        }
      })
      .catch((error) => console.error('Error fetching personal info:', error));
  }, []);

  // Add or update a task
  const saveTask = () => {
    const method = isEditingTask ? 'PUT' : 'POST';
    const url = isEditingTask ? `${API_BASE_URL}/tasks/${currentTask.id}/` : `${API_BASE_URL}/tasks/`;

    const updatedTask = {
      ...currentTask,
      additional_data: customFields.reduce((acc, field) => {
        if (field.key && field.value) { // Only add if both key and value exist
          acc[field.key] = field.value;
        }
        return acc;
      }, {}),
    };

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((task) => {
        if (isEditingTask) {
          setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        } else {
          setTasks([...tasks, task]);
        }
        setIsTaskModalOpen(false);
        setCurrentTask({ title: '', description: '', additional_data: {} });
        setCustomFields([]);
      })
      .catch((error) => console.error('Error saving task:', error));
  };

  // Delete a task
  const deleteTask = () => {
    fetch(`${API_BASE_URL}/tasks/${currentTask.id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== currentTask.id));
        setIsTaskModalOpen(false);
        setCurrentTask({ title: '', description: '', additional_data: {} });
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  // Update personal info
  const updatePersonalInfo = () => {
    fetch(`${API_BASE_URL}/personal-info/${personalInfo.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPersonalInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setPersonalInfo(data);
        setIsEditingPersonalInfo(false);
      })
      .catch((error) => console.error('Error updating personal info:', error));
  };

  // Add a new custom field
  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  // Update a custom field
  const updateCustomField = (index, key, value) => {
    const updatedFields = [...customFields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setCustomFields(updatedFields);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-sans">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {/* Left: Profile */}
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-emerald-500 cursor-pointer"
            onClick={() => setIsPersonalInfoModalOpen(true)}
          />
          <div>
            <h2
              className="text-lg font-bold text-gray-800 cursor-pointer"
              onClick={() => setIsPersonalInfoModalOpen(true)}
            >
              {personalInfo.name || 'No Name'}
            </h2>
          </div>
        </div>

        {/* Right: Search + Button */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search tasks"
              className="border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded-xl px-4 py-2 w-full pl-10 transition shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => {
              setIsTaskModalOpen(true);
              setIsEditingTask(false);
              setCurrentTask({ title: '', description: '', additional_data: {} });
              setCustomFields([]);
            }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:from-emerald-600 hover:to-green-700 transition"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Task Count */}
      <div className="mb-4 text-sm text-gray-600">
        {search
          ? `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''} found`
          : `You have ${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
      </div>

      {/* Task Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col gap-2 cursor-pointer"
              onClick={() => {
                setIsTaskModalOpen(true);
                setIsEditingTask(false); // Set to false to open in view mode
                setCurrentTask(task);
                setCustomFields(
                  Object.entries(task.additional_data || {}).map(([key, value]) => ({ key, value }))
                );
              }}
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {task.description}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center col-span-full mt-10">
            No tasks found.
          </div>
        )}
      </div>

      {/* Personal Info Modal */}
      {isPersonalInfoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
            <h2 className="text-xl text-center font-bold mb-4 text-gray-800">Personal Info</h2>
            
            {!isEditingPersonalInfo ? (
              <>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Name</label>
                  <p className="text-gray-800 text-base bg-gray-50 p-3 rounded">
                    {personalInfo.name || 'No Name'}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                  <p className="text-gray-800 text-base bg-gray-50 p-3 rounded">
                    {personalInfo.email || 'No Email'}
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsPersonalInfoModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setIsEditingPersonalInfo(true);
                      setEditedPersonalInfo(personalInfo);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editedPersonalInfo.name}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                  <input
                    type="email"
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editedPersonalInfo.email}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, email: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setIsEditingPersonalInfo(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                    onClick={updatePersonalInfo}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in max-h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {currentTask.id ? (isEditingTask ? 'Edit Task' : 'Task Details') : 'Add Task'}
            </h2>

            <div className="overflow-y-auto flex-1 pr-2"> {/* Add scrolling container */}
              {/* View Mode - Only show when viewing an existing task */}
              {currentTask.id && !isEditingTask ? (
                <>
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Title</label>
                    <p className="text-gray-800 text-base bg-gray-50 p-3 rounded">{currentTask.title || 'No Title'}</p>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
                    <p className="text-gray-800 text-base bg-gray-50 p-3 rounded max-h-40 overflow-y-auto whitespace-pre-wrap break-words">
                      {currentTask.description || 'No Description'}
                    </p>
                  </div>

                  <div className="mb-4">
                      {Object.entries(currentTask.additional_data || {}).map(([key, value], index) => (
                        <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">{key}</label>
                        <p className="text-gray-800 text-base bg-gray-50 p-3 rounded max-h-40 overflow-y-auto whitespace-pre-wrap break-words">
                          {value}
                        </p>
                        </div>
                      ))}
                  </div>

                  {currentTask.createdAt && (
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-gray-700 block mb-1">Created At</label>
                      <p className="text-gray-600">{new Date(currentTask.createdAt).toLocaleString()}</p>
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this task?')) {
                          deleteTask();
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                      onClick={() => setIsTaskModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                      onClick={() => setIsEditingTask(true)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                /* Edit Mode - Show when adding new task or editing existing task */
                <>
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={currentTask.title}
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
                    <textarea
                      placeholder="Enter description"
                      className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-32"
                      value={currentTask.description}
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-3 mt-2">
                      {customFields.map((field, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Field Name"
                              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                              value={field.key}
                              onChange={(e) => updateCustomField(index, 'key', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Field Value"
                              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                              value={field.value}
                              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                            />
                          </div>
                          <button
                            onClick={() => {
                              const updatedFields = [...customFields];
                              updatedFields.splice(index, 1);
                              setCustomFields(updatedFields);
                            }}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addCustomField}
                      className="w-full mt-3 bg-blue-200 hover:bg-blue-400 text-gray-700 px-3 py-2 rounded text-sm font-medium"
                    >
                      + Add New Field
                    </button>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                      onClick={() => {
                        if (currentTask.id) {
                          setIsEditingTask(false);
                        } else {
                          setIsTaskModalOpen(false);
                        }
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                      onClick={saveTask}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
