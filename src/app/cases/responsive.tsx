'use client';

import { useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';

import CaseStudies from '@/containers/cases';
import FiltersContent from '@/containers/cases/header/filters/filters-dropdown/content';
import MobileFiltersDropdown from '@/containers/cases/header/filters/filters-dropdown/mobile';
import CasesMap from '@/containers/cases/map';
import Sidebar from '@/containers/cases/sidebar';
import CaseStudiesTotal from '@/containers/cases/total';
import { Media } from '@/containers/media';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function ResponsiveCasesPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleOpenFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  const closeFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <>
      <Media lessThan="md">
        <motion.div
          className="fixed top-0 z-20 w-full justify-between border-b border-b-grey-800/20 bg-white duration-75 ease-in-out"
          variants={{
            initial: { opacity: 0, y: '-100%', display: 'none' },
            show: { opacity: 1, y: '0', display: 'flex' },
          }}
          initial="initial"
          animate={inView ? 'initial' : 'show'}
        >
          <CaseStudiesTotal className="flex w-full items-center justify-between gap-4 px-4 text-lg">
            <MobileFiltersDropdown onClickSearch={() => {}} onClickFilters={handleOpenFilters} />
          </CaseStudiesTotal>
        </motion.div>
        <div className="px-4 md:p-[50px]" ref={ref}>
          <CaseStudiesTotal className="flex items-baseline justify-between gap-4 text-xl">
            <MobileFiltersDropdown onClickSearch={() => {}} onClickFilters={handleOpenFilters} />
          </CaseStudiesTotal>
        </div>
        <ScrollArea className="pb-8">
          <div className="px-4 md:p-[50px]">
            <CaseStudies />
          </div>
        </ScrollArea>
        <motion.div
          className="fixed h-[calc(100%-128px)] rounded-t-3xl bg-grey-800 px-10 py-4"
          variants={{
            initial: { opacity: 0, display: 'none', bottom: '-100%' },
            show: { opacity: 1, display: 'flex', bottom: 0 },
          }}
          initial="initial"
          animate={isFiltersOpen ? 'show' : 'initial'}
        >
          <FiltersContent onSetFiltersDone={closeFilters} onClearFiltersDone={closeFilters} />
        </motion.div>
      </Media>
      <Media greaterThanOrEqual="md" className="relative flex flex-1">
        <>
          <Sidebar>
            <div className="px-[60px]">
              <CaseStudiesTotal className="text-xl" />
            </div>
            <ScrollArea className="pb-8">
              <div className="px-[60px]">
                <CaseStudies />
              </div>
            </ScrollArea>
          </Sidebar>
          <CasesMap />
        </>
      </Media>
    </>
  );
}