export const fetchCandidates = async () => {
    // try {
      // const res = await fetch(`${API_BASE}/candidates`);
      // return await res.json();
      return [
        { id: 1, jobId: 1, name: 'Alex Johnson', score: 92, experience: '5', status: 'New', appliedDate: '2024-01-22', bookmarked: false },
        { id: 2, jobId: 2, name: 'Taylor Smith', score: 87, experience: '4', status: 'Reviewed', appliedDate: '2024-01-18', bookmarked: true },
        { id: 3, jobId: 1, name: 'Jordan Williams', score: 78, experience: '3', status: 'Interview', appliedDate: '2024-01-10', bookmarked: false }
      ];
    // } catch (e) {
    //   console.error(e);
    //   return [];
    // }
  };
  
  export const updateCandidate = async (id, patch) => {
    try {
      // const res = await fetch(`${API_BASE}/candidates/${id}`, {
      //   method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(patch)
      // });
      // return await res.json();
      return { id, ...patch };
    } catch (e) {
      console.error(e);
      return null;
    }
  };