import type { Metadata } from "next";
import { PageContainer } from '@/components/sections/PageContainer'
import React from 'react'

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review your store overview, recent billing activity, and key business metrics in the EaseInv dashboard.",
}

export default function DashboardPage() {
  return (
    <PageContainer>
      page
    </PageContainer>
  )
}
