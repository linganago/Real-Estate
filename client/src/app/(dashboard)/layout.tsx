"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();

  return (
    <div
      className="transition-all duration-300"
      style={{
        marginLeft: open ? 240 : 80, // match sidebar widths
        paddingTop: NAVBAR_HEIGHT + 16, // adds 16px spacing below the Navbar
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {children}
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <Navbar />
        <Sidebar userType={authUser.userRole.toLowerCase()} />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
