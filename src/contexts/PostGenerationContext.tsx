'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PostGenerationContextType {
  generatedPosts: any[];
  setGeneratedPosts: (posts: any[]) => void;
  currentBatch: any | null;
  setCurrentBatch: (batch: any) => void;
  clearGeneration: () => void;
  hasActiveGeneration: boolean;
}

const PostGenerationContext = createContext<PostGenerationContextType | undefined>(undefined);

export const usePostGeneration = () => {
  const context = useContext(PostGenerationContext);
  if (context === undefined) {
    throw new Error('usePostGeneration must be used within a PostGenerationProvider');
  }
  return context;
};

export const PostGenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [generatedPosts, setGeneratedPostsState] = useState<any[]>([]);
  const [currentBatch, setCurrentBatchState] = useState<any | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('socialai_generated_posts');
      const savedBatch = localStorage.getItem('socialai_current_batch');
      
      console.log('💾 [Context] Loading from localStorage on mount...');
      if (savedPosts) {
        try {
          const parsed = JSON.parse(savedPosts);
          console.log('✅ [Context] Loaded saved posts:', parsed.length, 'posts');
          setGeneratedPostsState(parsed);
        } catch (e) {
          console.error('❌ [Context] Failed to parse saved posts');
        }
      } else {
        console.log('ℹ️ [Context] No saved posts found in localStorage');
      }
      
      if (savedBatch) {
        try {
          setCurrentBatchState(JSON.parse(savedBatch));
        } catch (e) {
          console.error('Failed to parse saved batch');
        }
      }
    }
  }, []);

  // Track changes to generatedPosts
  useEffect(() => {
    console.log('📊 [Context] generatedPosts changed:', generatedPosts.length, 'posts');
    console.log('🔍 [Context] hasActiveGeneration:', hasActiveGeneration);
  }, [generatedPosts]);

  const setGeneratedPosts = (posts: any[]) => {
    console.log('🔄 [Context] Setting generated posts:', posts.length, 'posts');
    console.log('🔄 [Context] Posts data:', posts);
    setGeneratedPostsState(posts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialai_generated_posts', JSON.stringify(posts));
      console.log('💾 [Context] Saved to localStorage');
    }
  };

  const setCurrentBatch = (batch: any) => {
    setCurrentBatchState(batch);
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialai_current_batch', JSON.stringify(batch));
    }
  };

  const clearGeneration = () => {
    setGeneratedPostsState([]);
    setCurrentBatchState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('socialai_generated_posts');
      localStorage.removeItem('socialai_current_batch');
    }
  };

  const hasActiveGeneration = generatedPosts.length > 0 && 
    generatedPosts.some(post => post.status === 'pending_approval');

  const value: PostGenerationContextType = {
    generatedPosts,
    setGeneratedPosts,
    currentBatch,
    setCurrentBatch,
    clearGeneration,
    hasActiveGeneration,
  };

  return (
    <PostGenerationContext.Provider value={value}>
      {children}
    </PostGenerationContext.Provider>
  );
};




