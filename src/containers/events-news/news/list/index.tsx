'use client';

import { useState } from 'react';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { News } from '@/lib/news.service';
import { PaginatedResult } from '@/lib/paginator';
import queryKeys from '@/lib/query-keys';

import { Media } from '@/containers/media';

import DiscoverMoreButton from '@/components/discover-more-button';
import { Paginator } from '@/components/paginator';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import formatDate from '@/utils/date';

function NewsItem({ name, date, description, categories }: News) {
  return (
    <div className="flex flex-col border-t border-t-white/30 py-8 text-white lg:grid lg:grid-cols-12 lg:py-16">
      <span className="col-span-3 uppercase">{formatDate(date)}</span>
      <div className="col-span-6 mt-4 space-y-4 lg:mt-0">
        <h5 className="text-lg lg:text-xl">{name}</h5>
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <span key={category} className="text-sm">
                <Badge className="pointer-events-none">{category}</Badge>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-3 mt-4 flex items-start justify-end lg:mt-0">
        <Dialog>
          <DialogTrigger asChild>
            <DiscoverMoreButton />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>
                <div
                  className="space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

export default function NewsList() {
  const [page, setPage] = useState(0);

  const { data } = useQuery<PaginatedResult<News>>({
    queryKey: queryKeys.news.paginated({ page: page + 1 }).queryKey,
    queryFn: async () => {
      try {
        const response = await fetch(`/news?page=${page + 1}&pageSize=${PAGE_SIZE}`);

        if (!response.ok) {
          throw new Error('Error fetching news');
        }
        return await response.json();
      } catch (err) {
        throw new Error('Error fetching news');
      }
    },
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <ul>
        {data?.data?.map((news) => (
          <li key={news.name}>
            <NewsItem {...news} />
          </li>
        ))}
      </ul>
      {(data?.total || 0) > 5 && (
        <Media greaterThanOrEqual="md">
          {(className, renderChildren) => {
            return (
              <Paginator
                pageIndex={page}
                pageCount={Math.ceil(
                  (data?.total as NonNullable<PaginatedResult<News>['total']>) / PAGE_SIZE,
                )}
                totalPagesToDisplay={renderChildren ? 6 : 2}
                onPagePrevious={() => {
                  setPage(page - 1);
                }}
                onPageNext={() => {
                  setPage(page + 1);
                }}
                onPageIndex={(p) => {
                  setPage(p);
                }}
              />
            );
          }}
        </Media>
      )}
    </>
  );
}
