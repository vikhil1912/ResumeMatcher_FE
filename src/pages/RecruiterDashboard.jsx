import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { TabNavigation } from "../components/TabNavigation";
import { JDCard } from "../components/JDCard";
import { HistoryCard } from "../components/HistoryCard";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";

export const RecruiterDashboard = () => {

  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("jd");
  const [jobDescription, setJobDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Load history from API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        // Replace with your actual API endpoint
        const response = await axiosInstance.get('/api/analysis/history');
        setHistory(response.data);
      } catch (error) {
        toast.error("Failed to load history");
        console.error("History load error:", error);
        
        // Fallback mock data if API fails (remove in production)
        setHistory([
          { 
            id: 1, 
            jdText: "Senior Frontend Developer with 5+ years React experience", 
            date: new Date().toISOString(),
            topResumes: [
              { id: 101, name: "John_Doe_Resume.pdf", score: 92 },
              { id: 102, name: "Jane_Smith_Resume.pdf", score: 88 }
            ]
          }
        ]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleFetchTopResumes = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/analyze', { 
        jdText: jobDescription 
      });
      
      const newEntry = {
        id: response.data.analysisId,
        jdText: jobDescription,
        date: new Date().toISOString(),
        topResumes: response.data.topResumes
      };
      
      setHistory([newEntry, ...history]);
      navigate(`/recruiter/results/${newEntry.id}`);
      
    } catch (error) {
      toast.error("Analysis failed");
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    navigate(`/recruiter/results/${item.id}`);
  };

  return (
    <div className={`min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-teal-500 to-indigo-600"
    } text-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header user={user} darkMode={darkMode} />
        
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          tabs={[
            { id: "jd", label: "Job Description" },
            { id: "history", label: "Analysis History" }
          ]}
        />

        {activeTab === "jd" ? (
          <JDCard
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            history={history}
            loading={loading}
            darkMode={darkMode}
            onFetchTopResumes={handleFetchTopResumes}
          />
        ) : (
          <HistoryCard
            history={history}
            loading={historyLoading}
            darkMode={darkMode}
            onViewResumes={handleHistoryItemClick}
          />
        )}
      </div>
    </div>
  );
};