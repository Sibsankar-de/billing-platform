import React from 'react';

export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className='m-5'>
            {children}
        </div>
    )
}
