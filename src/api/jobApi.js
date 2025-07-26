const API_BASE = 'https://mockapi.example.com';

export const fetchJobs = async () => {
  try {
    // const res = await fetch(`${API_BASE}/jobs`);
    // const jobs = await res.json();
    const jobs = [
      { id: 1, title: 'Senior Frontend Developer', description: 'Looking for React experts...', date: '2024-01-15' },
      { id: 2, title: 'UX/UI Designer', description: 'Need talented designers...', date: '2024-01-20' }
    ];
    return jobs;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createJob = async (jobData) => {
  try {
    // const res = await fetch(`${API_BASE}/jobs`, {
    //   method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(jobData)
    // });
    // return await res.json();
    return { ...jobData, id: Math.floor(Math.random()*1000), date: new Date().toISOString().split('T')[0] };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteJobApi = async (id) => {
    console.log(id); // just to make mock code run.
  //try {
    // await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
    return true;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
};