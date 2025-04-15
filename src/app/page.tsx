"use client";

import { useState } from "react";
import { NodeCanvas } from "@/components/NodeCanvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    File
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Edit
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    View
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <NodeCanvas onNodeSelect={setSelectedNode} />
        <PropertiesPanel selectedNode={selectedNode} />
      </div>
    </SidebarProvider>
  );
}
