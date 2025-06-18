"use client";
// components/LoadingOverlay.tsx
import React from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { useSelector } from "react-redux";
const LoadingOverlay: React.FC = () => {
  const isLoading = useAppSelector(state => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loading">
      <div className="spinner" />
      <span style={{ color: "white", marginLeft: "1rem", fontSize: "1.2rem" }}>Učitavanje...</span>
    </div>
  );
};

export default LoadingOverlay;
