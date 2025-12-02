"use client";
import React from 'react';
import { useAppSelector } from '@/store/hooks/typizedHooks';
import { RootState } from '@/store/store';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay: React.FC = () => {
  const isLoading = useAppSelector((state: RootState) => state.ui.isLoading);
  if (!isLoading) return null;
   return (
    <div className={styles.loading}>
      
      {/*<span style={{ color: "white", marginLeft: "1rem", fontSize: "1.2rem" }}>Učitavanje...</span>*/}
    </div>
  );
};
export default LoadingOverlay;
