"use client";

import React, { useEffect, useState } from 'react'
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

const SHOW_LIMIT = 5;

export const Pagination = ({ totalPage, currentPage = 1, onPageChange }: PaginationProps) => {
  const viewport_num = SHOW_LIMIT > totalPage ? totalPage - 1 : SHOW_LIMIT - 1;

  const [activePage, setActivePage] = useState(1);
  const [pageMapNumber, setPageMapNumber] = useState({ start: 1, end: viewport_num });

  function resetPosition(pageNo: number) {
    const contains = pageNo + viewport_num - 1;
    const range = pageNo - contains;
    setPageMapNumber({
      start: pageNo,
      end: contains
    })
  }

  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
      resetPosition(currentPage);
    };
  }, [currentPage]);


  const handlePageChange = (page: number) => {
    if (page <= totalPage && page > 0) {
      setActivePage(page);
      onPageChange?.(page);
      resetPosition(page)
    }
  }

  return (
    <div className='flex items-center justify-center w-full gap-2'>
      <Button variant='outline' className='px-2 py-2 disabled:bg-gray-100 disabled:brightness-100' disabled={activePage === 1}><ChevronLeft size={19} /></Button>

      <div className='flex items-center gap-0.5'>
        {
          Array.from(
            { length: pageMapNumber.end - pageMapNumber.start + 1 },
            (_, i) => pageMapNumber.start + i).map((page) => {
              const pageNumber = page;
              return (
                <Button
                  key={page}
                  variant={activePage === pageNumber ? 'primary' : 'outline'}
                  className='px-3 py-2'
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })
        }
        {activePage < totalPage - viewport_num && <div className='self-end mx-3'>....</div>}
        <Button
          variant={activePage === totalPage ? 'primary' : 'outline'}
          className='px-3 py-2'
          onClick={() => handlePageChange(totalPage)}
        >{totalPage}</Button>
      </div>

      <Button variant='outline' className='px-2 py-2 disabled:bg-gray-100 disabled:brightness-100' disabled={currentPage === totalPage}><ChevronRight size={19} /></Button>
    </div>
  )
}
