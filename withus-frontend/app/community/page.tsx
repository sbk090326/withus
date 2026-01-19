'use client';

import React, { useState } from 'react';
import { palette, theme } from '@/app/components/design-system/constants';
import { CommunityHero } from './components/CommunityHero';
import { CommunityTabs } from './components/CommunityTabs';
import { PostList } from './components/PostList';
import { CommunitySidebar } from './components/CommunitySidebar';

import { CreatePostModal } from './components/CreatePostModal';
import { PostDetailModal } from './components/PostDetailModal';

export default function CommunityPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [selectedPost, setSelectedPost] = useState<any>(null);

    // Mock Current User ID
    const currentUserId = 1;

    const handleEdit = (post: any) => {
        setEditingPost(post);
        setIsCreateModalOpen(true);
        setIsDetailModalOpen(false); // Close detail if editing
    };

    const handleDelete = (postId: number) => {
        if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
            console.log(`Deleting post ${postId}`);
            setIsDetailModalOpen(false);
            alert('게시글이 삭제되었습니다.');
        }
    };

    const handleSelectPost = (post: any) => {
        setSelectedPost(post);
        setIsDetailModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setEditingPost(null);
    };

    return (
        <main className="min-h-screen" style={{ backgroundColor: palette.cream.base }}>
            <CommunityHero onAddPost={() => setIsCreateModalOpen(true)} />

            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column: Content */}
                    <div className="flex-1 space-y-8">
                        <CommunityTabs
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                        <PostList
                            category={activeCategory}
                            currentUserId={currentUserId}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSelect={handleSelectPost}
                        />
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:w-80 space-y-8">
                        <CommunitySidebar />
                    </aside>
                </div>
            </div>

            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                initialData={editingPost ? {
                    title: editingPost.title,
                    content: editingPost.excerpt,
                    category: editingPost.category,
                    images: editingPost.thumbnail ? [editingPost.thumbnail] : []
                } : undefined}
                isEdit={!!editingPost}
            />

            <PostDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                post={selectedPost}
                isAuthor={selectedPost?.authorId === currentUserId}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </main>
    );
}
