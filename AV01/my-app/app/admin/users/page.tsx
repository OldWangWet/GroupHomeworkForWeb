'use client'

import { useState, useEffect } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from '../../api/mockApi'
import { User } from '@/types'

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers()
      setUsers(usersData)
    }
    fetchUsers()
  }, [])

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    const createdUser = await createUser(newUser)
    setUsers([...users, createdUser])
  }

  const handleUpdateUser = async (updatedUser: User) => {
    const result = await updateUser(updatedUser)
    setUsers(users.map(user => user.id === result.id ? result : user))
    setSelectedUser(null)
    setIsEditing(false)
  }

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
    setUsers(users.filter(user => user.id !== id))
    setSelectedUser(null)
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">User List</h2>
          <ul className="bg-white shadow-md rounded-lg divide-y">
            {users.map(user => (
              <li 
                key={user.id} 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user)
                  setIsEditing(false)
                }}
              >
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? 'Edit User' : (selectedUser ? 'User Details' : 'Create New User')}
          </h2>
          {selectedUser && !isEditing ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <p><strong>Last Login:</strong> {new Date(selectedUser.lastLogin).toLocaleString()}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault()
              if (isEditing && selectedUser) {
                handleUpdateUser(selectedUser)
              } else {
                handleCreateUser({
                  username: '',
                  email: '',
                  role: 'publisher',
                  status: 'active',
                  createdAt: new Date().toISOString(),
                  lastLogin: new Date().toISOString(),
                })
              }
            }} className="bg-white shadow-md rounded-lg p-6">
              {/* Form fields for creating/editing users */}
              {/* You would add input fields for username, email, role, etc. here */}
              <div className="mt-4 space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {isEditing ? 'Update User' : 'Create User'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setSelectedUser(null)
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

