'use client';
import React from 'react';
import { Maximize2, Share2 } from 'lucide-react';

interface DetailGalleryProps {
    images: string[];
    onImageClick: (image: string) => void;
}

export const DetailGallery = ({ images, onImageClick }: DetailGalleryProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[420px] mb-8">
            {/* Main Image (Large) */}
            <div
                className="md:col-span-2 relative h-[300px] md:h-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-lg border border-white cursor-pointer group"
                onClick={() => onImageClick(images[0])}
            >
                <img
                    src={images[0]}
                    alt="Main"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white drop-shadow-lg" size={40} />
                </div>
                <div className="absolute top-6 right-6 flex gap-2">
                    <button className="p-3 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white transition-all shadow-sm">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Side Stack (Two Small) */}
            <div className="grid grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-4 h-[120px] md:h-full">
                {images.slice(1, 3).map((img, i) => (
                    <div
                        key={i}
                        className="relative rounded-[24px] md:rounded-[32px] overflow-hidden border border-white shadow-sm hover:ring-2 hover:ring-orange-500 transition-all cursor-pointer group"
                        onClick={() => onImageClick(img)}
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {i === 1 && images.length > 3 && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                                <span className="text-xl font-bold">+{images.length - 3}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Photos</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
