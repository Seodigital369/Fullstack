"use client";
import React, { useState } from 'react';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    salary: '',
    hireDate: '',
    userId: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Prepare data
    const requestData = {
      name: formData.name,
      age: parseInt(formData.age),
      position: formData.position,
      salary: parseFloat(formData.salary),
      ...(formData.hireDate && { hireDate: formData.hireDate }),
      ...(formData.userId && { userId: formData.userId })
    };

    console.log('📤 Sending request to backend...');
    console.log('Data:', requestData);

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      console.log('📥 Response status:', response.status);
      
      const resultText = await response.text();
      console.log('📥 Raw response:', resultText);

      let resultData;
      try {
        resultData = JSON.parse(resultText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        setResult({ 
          error: true, 
          message: `Invalid JSON response from server: ${resultText}` 
        });
        return;
      }

      if (!response.ok) {
        throw new Error(resultData.message || `Server error: ${response.status}`);
      }

      // Success
      setResult({ 
        success: true, 
        message: 'Employee created successfully!',
        data: resultData.data 
      });
      
      // Reset form
      setFormData({ 
        name: '', 
        age: '', 
        position: '', 
        salary: '', 
        hireDate: '', 
        userId: '' 
      });

    } catch (error) {
      console.error('❌ Request failed:', error);
      setResult({ 
        error: true, 
        message: error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      
      alert(`✅ Backend is running!\n\n${data.message}\n\nAvailable endpoints:\n- ${data.endpoints.createEmployee}\n- ${data.endpoints.getEmployees}`);
    } catch (error) {
      alert(`❌ Cannot connect to backend!\n\nError: ${error.message}\n\nMake sure:\n1. Backend server is running on port 5000\n2. No other applications using port 5000`);
    }
  };

  const clearResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Create New Employee</h1>
          <p className="text-blue-100">Add employee details to the database</p>
        </div>

        {/* Test Connection Button */}
        <div className="p-4 border-b">
          <button 
            onClick={testBackend}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Test Backend Connection
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age * (Minimum: 18)
            </label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              min="18"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position *
            </label>
            <input 
              type="text" 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job position"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary * (USD)
            </label>
            <input 
              type="number" 
              name="salary" 
              value={formData.salary} 
              onChange={handleChange} 
              min="0"
              step="0.01"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salary"
            />
          </div>

          {/* Hire Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hire Date
            </label>
            <input 
              type="date" 
              name="hireDate" 
              value={formData.hireDate} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID (Optional)
            </label>
            <input 
              type="text" 
              name="userId" 
              value={formData.userId} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID if available"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md font-semibold text-white transition duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Employee...
              </span>
            ) : (
              'Create Employee'
            )}
          </button>
        </form>

        {/* Result Display */}
        {result && (
          <div className={`p-4 m-4 rounded-md ${
            result.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className={`font-medium ${
                result.error ? 'text-red-800' : 'text-green-800'
              }`}>
                {result.error ? '❌ Error' : '✅ Success'}
              </h3>
              <button 
                onClick={clearResult}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className={`mt-1 text-sm ${
              result.error ? 'text-red-600' : 'text-green-600'
            }`}>
              {result.message}
            </p>
            {result.data && (
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEmployee;