'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { newsData, NewsItem } from '@/data/clubData';
import { ClubService } from '@/services/clubService';
import { supabase } from '@/lib/supabase';
import { CalendarDays, ArrowRight } from 'lucide-react';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(newsData);

  const loadNews = async () => {
    const data = await ClubService.getNews();
    if (data && data.length > 0) {
      setNews(data);
    }
  };

  useEffect(() => {
    loadNews();

    const client = supabase;
    if (client) {
      const channel = client
        .channel('realtime_news')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'news' },
          () => {
            loadNews();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, []);

  return (
    <section className="py-20 bg-white" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-heading font-extrabold text-xs uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full mb-3">
            Latest Happenings
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase tracking-tight mb-4">
            Club News & Upcoming Events
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Stay informed about tryouts, weekend leagues, community charity runs, and new arena upgrades.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-primary text-white font-heading font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-3">
                  <CalendarDays className="w-3.5 h-3.5 text-accent" />
                  {item.date}
                </div>

                <h3 className="font-heading font-bold text-base text-secondary group-hover:text-primary transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                  {item.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    Read Details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
