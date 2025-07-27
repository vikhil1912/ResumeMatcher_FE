import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import * as jobApi from "../api/jobApi";
import * as candidateApi from "../api/candidateApi";

import { Header } from "../components/Header";
import { TabNavigation } from "../components/TabNavigation";
import { FilterPanel } from "../components/FilterPanel";
import { CandidateCard } from "../components/CandidateCard";
import { JobCard } from "../components/JobCard";
import { BookmarkCard } from "../components/BookmarkCard";

export const RecruiterDashboard = () => {
  const { user, logoutContext } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("candidates");
  const [filter, setFilter] = useState({
    minScore: 0,
    jobId: "",
    experience: "",
    status: "all",
  });
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    jobApi.fetchJobs().then(setJobs);
    candidateApi.fetchCandidates().then((data) => {
      setCandidates(data);
      setBookmarks(data.filter((c) => c.bookmarked));
    });
  }, []);

  useEffect(() => {
    document.title = "Dashboard|Resume Matcher";
  }, []);

  const handleLogout = () => {
    logoutContext();
    navigate("/");
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newJob = {
      title: form.title.value,
      description: form.description.value,
    };
    // const created = await jobApi.createJob(newJob);
    const created = await jobApi.createJob(newJob);
    setJobs([...jobs, created]);
    form.reset();
  };

  const handleDeleteJob = async (id) => {
    // await jobApi.deleteJobApi(id);
    await jobApi.deleteJobApi(id);
    setJobs(jobs.filter((j) => j.id !== id));
    setCandidates(candidates.filter((c) => c.jobId !== id));
    setBookmarks(bookmarks.filter((b) => b.jobId !== id));
  };

  const handleToggleBookmark = async (candidate) => {
    // Toggle via API
    const apiResult = await candidateApi.updateCandidate(candidate.id, {
      bookmarked: !candidate.bookmarked,
    });

    // Build the full updated candidate object
    const updatedCandidate = {
      ...candidate,
      bookmarked: apiResult.bookmarked,
    };

    // Update the candidates list
    setCandidates(
      candidates.map((c) =>
        c.id === updatedCandidate.id ? updatedCandidate : c
      )
    );

    // Recompute bookmarks with full objects
    setBookmarks((prev) => {
      if (updatedCandidate.bookmarked) {
        // Add (after removing any stale instance)
        return [
          ...prev.filter((b) => b.id !== updatedCandidate.id),
          updatedCandidate,
        ];
      } else {
        // Remove
        return prev.filter((b) => b.id !== updatedCandidate.id);
      }
    });
  };

  const filtered = candidates.filter((c) => {
    const exp = +c.experience;
    return (
      c.score >= filter.minScore &&
      (!filter.jobId || c.jobId === +filter.jobId) &&
      (!filter.experience || exp >= +filter.experience) &&
      (filter.status === "all" || c.status === filter.status)
    );
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-teal-500 to-indigo-600"
      } text-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header user={user} darkMode={darkMode} />
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
        />

        {activeTab === "candidates" && (
          <>
            <FilterPanel
              filter={filter}
              setFilter={setFilter}
              jobDescriptions={jobs}
              darkMode={darkMode}
            />
            <div>
              {filtered.map((c) => (
                <CandidateCard
                  key={c.id}
                  c={c}
                  jobTitle={jobs.find((j) => j.id === c.jobId)?.title}
                  onView={() => alert(`View ${c.name}`)}
                  onToggle={handleToggleBookmark}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "jds" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Job Descriptions
            </h2>
            <form
              onSubmit={handleAddJob}
              className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <input
                name="title"
                placeholder="Title"
                className="px-3 py-2 rounded-lg border bg-white/80 text-black"
                required
              />
              <input
                name="description"
                placeholder="Description"
                className="px-3 py-2 rounded-lg border bg-white/80 text-black"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
              >
                Add JD
              </button>
            </form>
            <div>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={handleDeleteJob}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "bookmarks" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Bookmarks
            </h2>
            <div>
              {bookmarks.map((b) => (
                <BookmarkCard
                  key={b.id}
                  b={b}
                  jobTitle={jobs.find((j) => j.id === b.jobId)?.title}
                  onRemove={handleToggleBookmark}
                  onView={() => alert(`View ${b.name}`)} // or trigger actual modal/view
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
