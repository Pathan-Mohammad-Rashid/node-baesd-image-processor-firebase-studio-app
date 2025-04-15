"use client";

import { useState, useCallback, useRef } from "react";
import { NodeCanvas } from "@/components/NodeCanvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { File } from "lucide-react";
import { Toast, /* Toaster */ } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Define the structure for a node
interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]); // Array to hold all nodes
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNode(nodeId);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadImage = () => {
    fileInputRef.current?.click();
  };

  const handleSaveImage = () => {
    if (!imageSrc) {
      toast({
        title: "No image to save",
        description: "Please load an image first.",
      });
      return;
    }

    // Create a temporary canvas element to draw the image on
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL('image/png'); // You can change the format if needed

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'processed_image.png'; // Set the desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast({
          variant: 'destructive',
          title: "Can't save image",
          description: "Could not get canvas context.",
        });
      }
    };

    img.onerror = () => {
       toast({
          variant: 'destructive',
          title: "Can't save image",
          description: "Could not load image.",
        });
    }

    img.src = imageSrc;
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: String(Math.random()), // Generate a unique ID
      type: type,
      position: { x: 100, y: 100 }, // Initial position
      data: {}, // Initial data
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <SidebarProvider>
      <Toaster />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLoadImage}>
                    Load Image
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleSaveImage}>
                    Save Image
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('brightnessContrast')}>
                    Add Brightness/Contrast Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('blur')}>
                    Add Blur Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('threshold')}>
                    Add Threshold Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('edgeDetection')}>
                    Add Edge Detection Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('blend')}>
                    Add Blend Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('noiseGeneration')}>
                    Add Noise Generation Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('convolutionFilter')}>
                    Add Convolution Filter Node
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => addNode('colorChannelSplitter')}>
                    Add Color Channel Splitter
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <NodeCanvas
          onNodeSelect={handleNodeSelect}
          imageSrc={imageSrc}
          nodes={nodes}
          setNodes={setNodes}
        />
        <PropertiesPanel selectedNode={selectedNode} />
      </div>
    </SidebarProvider>
  );
}
