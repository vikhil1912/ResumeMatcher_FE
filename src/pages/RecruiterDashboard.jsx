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
import { useMutation, useQuery } from "@tanstack/react-query";

export const RecruiterDashboard = () => {

  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("jd");
  const [jobDescription, setJobDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);

  const {
    data: matchResult,
    mutate: HrAnalyse,
    isPending: HrAnalysisLoading
  } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/hr/upload", {
        description: jobDescription
      });
      setAnalysisResult(response?.data?.data);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Uploaded");
      navigate(`/recruiter/results/${data?.data?.data?._id}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  })

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["HrHistory"],
    queryFn: async () => {
      const response = await axiosInstance.get("/hr/history");
      return response;
    }
  });

  const JDhistory = historyData?.data;
  JDhistory?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/user/logout");
    },
    onSuccess: () => {
      toast.success("Logged Out");
      localStorage.removeItem("user");
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleHistoryItemClick = (item) => {
    navigate(`/recruiter/results/${item._id}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-teal-500 to-indigo-600"
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
            history={JDhistory}
            loading={HrAnalysisLoading}
            darkMode={darkMode}
            onFetchTopResumes={HrAnalyse}
          />
        ) : (
          <HistoryCard
            history={JDhistory}
            loading={isHistoryLoading}
            darkMode={darkMode}
            onViewResumes={handleHistoryItemClick}
          />
        )}
      </div>
    </div>
  );
};