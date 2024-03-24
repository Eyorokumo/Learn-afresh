import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      // Handle response or errors
      return res.json(); // Return response data if needed
    } catch (error) {
      console.error('Error adding job:', error);
      // Handle error
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      // Handle response or errors
      return res.json(); // Return response data if needed
    } catch (error) {
      console.error('Error deleting job:', error);
      // Handle error
    }
  };

  // Update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      // Handle response or errors
      return res.json(); // Return response data if needed
    } catch (error) {
      console.error('Error updating job:', error);
      // Handle error
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/jobs' element={<JobsPage />} />
          <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
          <Route
            path='/edit-job/:id'
            element={<EditJobPage updateJobSubmit={updateJob} />}
          />
          <Route
            path='/jobs/:id'
            element={<JobPage deleteJob={deleteJob} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
